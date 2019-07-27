import { createQuadTree, QuadTree } from 'simplequad';
import { Pixel, Color } from './schema';
import { getAverageColor, flattenSets, loadImage, createPixels } from './util';
import QuadWorker from 'worker-loader!./quad.worker';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let imageInput: HTMLInputElement;

function buildQuadTreeFromPixels(pixels: Pixel[], quality: number = 1): QuadTree {
    const capacity: number = Math.round(1 / quality);
    const quadTree: QuadTree = createQuadTree({
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    }, capacity);

    // Build quadtree with this capacity from pixels
    pixels.forEach(pixel => quadTree.add(pixel));

    return quadTree;
}

function drawTree(context: CanvasRenderingContext2D, quadTree: QuadTree): void {
    if (quadTree.quadrants.length) {
        quadTree.quadrants
            .forEach(quadrant => drawTree(context, quadrant));
    } else {
        const pixels: Set<Pixel> = flattenSets([...quadTree.data.values()]) as Set<Pixel>;
        const averageColor: Color = getAverageColor([...pixels]);
        const x: number = quadTree.bounds.x;
        const y: number = quadTree.bounds.y;
        const width: number = quadTree.bounds.width;
        const height: number = quadTree.bounds.height;

        context.beginPath();
        context.fillStyle = `rgba(${averageColor.r}, ${averageColor.g}, ${averageColor.b}, ${averageColor.a})`;
        context.fillRect(x, y, width, height);
        context.closePath();
    }
}

function animateDraw(pixels: Pixel[], quality: number = 0.001) {
    if (quality < 1) {
        window.requestAnimationFrame(() => animateDraw(pixels, Math.min(quality * 2, 1)));
    }

    const quadTree: QuadTree = buildQuadTreeFromPixels(pixels, quality);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(context, quadTree);
}

function processImage(imageFile: File): void {
    loadImage(imageFile)
        .then(getImageData)
        .then((imageData: ImageData) => {
            const pixels: Pixel[] = createPixels(imageData);
            animateDraw(pixels);
        });
}

function onImageChange(event: Event) {
    const imageInput: HTMLInputElement = event.target as HTMLInputElement;
    if (!imageInput ||
        !imageInput.files ||
        !imageInput.files.length) {
        return;
    }
    const firstImage = imageInput.files[0];
    processImage(firstImage);
}

function getImageData(image: HTMLImageElement): ImageData {
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    return imageData;
}

function resizeCanvas() {
    const computedStyle = window.getComputedStyle(canvas);
    const width = parseInt(computedStyle.getPropertyValue('width'), 10);
    const height = parseInt(computedStyle.getPropertyValue('height'), 10);
    canvas.width = width;
    canvas.height = height;
}

function main() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;
    imageInput = document.getElementById('image-input') as HTMLInputElement;

    resizeCanvas();

    imageInput.addEventListener('change', onImageChange);
    window.addEventListener('resize', resizeCanvas);

    const quadWorker: Worker = new QuadWorker();
    quadWorker.addEventListener('message', (event) => {
        console.log(event.data);
    });
    quadWorker.postMessage('testing');
}

main();