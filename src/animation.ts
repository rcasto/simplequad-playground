import { QuadWorkerDataMessage } from './schema';
import { loadImage } from './util';
import QuadWorker from 'worker-loader!./quad.worker';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let imageInput: HTMLInputElement;
let quadWorker: QuadWorker;

function draw(imageData: ImageData) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
}

function processImage(imageFile: File): void {
    loadImage(imageFile)
        .then(getImageData)
        .then((imageData: ImageData) => {
            const message: QuadWorkerDataMessage = {
                type: 'new-image',
                data: imageData
            };
            quadWorker.postMessage(message);
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

function onWorkerMessage(event: MessageEvent): void {
    const message: QuadWorkerDataMessage = event.data;
    switch (message.type) {
        case 'draw':
            console.log("Request to draw");

            if (message.data) {
                window.requestAnimationFrame(timestamp => draw(message.data))
            }
            break;
        default:
            console.error(`Unknown message type: ${message}`);
            return;
    }
}

function main() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;
    imageInput = document.getElementById('image-input') as HTMLInputElement;

    imageInput.addEventListener('change', onImageChange);
    window.addEventListener('resize', resizeCanvas);

    // Web worker logic
    quadWorker = new QuadWorker();
    quadWorker.addEventListener('message', onWorkerMessage);

    resizeCanvas();
}

main();