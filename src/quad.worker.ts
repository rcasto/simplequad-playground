import { QuadWorkerDataMessage, Pixel, Color } from './schema';
import { QuadTree, createQuadTree, BoundingBox } from 'simplequad';
import { createPixels, getAverageColor, fillPixelInImageData } from './util';

let currentImageData: ImageData | null = null;

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
            ...pixel,
            ...averageColor,
        }));
    }

    return imageData;
}

function processImage(imageData: ImageData): void {
    const bounds: BoundingBox = {
        x: 0,
        y: 0,
        width: imageData.width,
        height: imageData.height,
    };
    let capacity: number = imageData.width * imageData.height;
    let quadTree: QuadTree<Pixel>;
    let message: QuadWorkerDataMessage;
    let processImageData: ImageData;

    while (capacity > 1 && currentImageData === imageData) {
        quadTree = buildQuadTreeFromPixels(imageData, bounds, capacity);
        processImageData = new ImageData(imageData.width, imageData.height);
        fillImageDataFromQuadTree(processImageData, quadTree);

        message = {
            type: 'draw',
            data: processImageData
        };
        postMessage(message);

        capacity = Math.max(capacity / 2, 1);
    }

    currentImageData = null;
}

// Setting up the worker
const worker: Worker = self as any;
worker.addEventListener('message', (event) => {
    const message: QuadWorkerDataMessage = event.data;
    const imageData: ImageData = message.data;

    switch (message.type) {
        case 'new-image':
            console.log("Processing a new image");

            if (imageData) {
                currentImageData = imageData;
                processImage(imageData);
            }
            break;
        default:
            console.error(`Unknown message type: ${message}`);
            return;
    }
});