import { QuadWorkerDataMessage, Pixel, Color, QuadWorkerMessage } from './schema';
import { QuadTree, createQuadTree, BoundingBox } from 'simplequad';
import { createPixels, getAverageColor, fillPixelInImageData } from './util';

const processedMessage: QuadWorkerMessage = {
    type: 'processed',
};

function buildQuadTreeFromPixels(imageData: ImageData, bounds: BoundingBox, capacity: number): QuadTree<Pixel> {
    const pixels: Pixel[] = createPixels(imageData);
    const quadTree: QuadTree<Pixel> = createQuadTree(bounds, capacity);

    // Build quadtree with this capacity from pixels
    pixels.forEach(pixel => quadTree.add(pixel));

    return quadTree;
}

function fillImageDataFromQuadTree(imageData: ImageData, quadTree: QuadTree<Pixel>): ImageData {    
    if (quadTree.quadrants.length) {
        quadTree.quadrants
            .forEach(quadrant =>
                fillImageDataFromQuadTree(imageData, quadrant));
    } else {
        const pixels: Pixel[] = quadTree.getData();
        const averageColor: Color = getAverageColor(pixels);
        pixels.forEach(pixel => fillPixelInImageData(imageData, {
            x: pixel.x,
            y: pixel.y,
            r: averageColor.r,
            g: averageColor.g,
            b: averageColor.b,
            a: averageColor.a,
        }));
    }

    return imageData;
}

function requestDraw(imageData: ImageData, capacity: number): void {
    const generatedImage: ImageData = createImage(imageData, capacity);
    requestDrawGenerated(generatedImage);
}

function requestDrawGenerated(imageData: ImageData) {
    const message: QuadWorkerDataMessage = {
        type: 'draw',
        data: imageData,
    };
    postMessage(message);
}

function processImage(imageData: ImageData): void {
    let capacity: number = imageData.width * imageData.height;

    while (capacity > 1) {
        requestDraw(imageData, capacity);
        capacity /= 2;
    }

    requestDrawGenerated(imageData);
    postMessage(processedMessage);
}

function createImage(imageData: ImageData, capacity: number): ImageData {
    const newImageData: ImageData = new ImageData(imageData.width, imageData.height);
    const quadTree: QuadTree<Pixel> = buildQuadTreeFromPixels(imageData, {
        x: 0,
        y: 0,
        width: imageData.width,
        height: imageData.height,
    }, capacity);
    fillImageDataFromQuadTree(newImageData, quadTree);
    return newImageData;
}

// Setting up the worker
const worker: Worker = self as any;
worker.addEventListener('message', (event) => {
    const message: QuadWorkerDataMessage = event.data;
    const imageData: ImageData = message.data;

    switch (message.type) {
        case 'new-image':
            if (imageData) {
                processImage(imageData);
            }
            break;
        default:
            console.error(`Unknown message type: ${message}`);
            return;
    }
});