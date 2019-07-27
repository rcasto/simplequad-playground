import { QuadWorkerDataMessage, Pixel, PixelObject, Color } from './schema';
import { QuadTree, createQuadTree, BoundingBox } from 'simplequad';
import { toPixelObject, createPixels, copyImageDataOver, getAverageColor, fillImageDataFromColor } from './util';

function buildQuadTreeFromPixels(imageData: ImageData, bounds: BoundingBox, capacity: number): QuadTree<PixelObject> {
    const pixels: Pixel[] = createPixels(imageData);
    const quadTree: QuadTree<PixelObject> = createQuadTree(bounds, capacity);

    // Build quadtree with this capacity from pixels
    pixels.forEach(pixel => {
        quadTree.add(toPixelObject(pixel));
    });

    return quadTree;
}

function getImageDataFromQuadTree(quadTree: QuadTree<PixelObject>): ImageData {
    const imageData: ImageData = new ImageData(quadTree.bounds.width, quadTree.bounds.height);
    
    if (quadTree.quadrants.length) {
        let quadImageData: ImageData;
        quadTree.quadrants
            .forEach(quadrant => {
                quadImageData = getImageDataFromQuadTree(quadrant);
                copyImageDataOver(imageData, quadImageData, quadrant.bounds.x, quadrant.bounds.y);
            });
    } else {
        const pixels: PixelObject[] = quadTree.getData();
        const averageColor: Color = getAverageColor(pixels);
        fillImageDataFromColor(imageData, averageColor);
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
    let quadTree: QuadTree<PixelObject>;
    let message: QuadWorkerDataMessage;

    while (capacity > 1) {
        quadTree = buildQuadTreeFromPixels(imageData, bounds, capacity);
        message = {
            type: 'draw',
            data: getImageDataFromQuadTree(quadTree),
        };
        postMessage(message);

        capacity = Math.max(capacity / 2, 1);
    }
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
                processImage(imageData);
            }
            break;
        default:
            console.error(`Unknown message type: ${message}`);
            return;
    }
    console.log(message.type);
});