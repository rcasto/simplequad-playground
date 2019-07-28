import { QuadWorkerDataMessage } from './schema';
import { loadImage, getImageDataOffScreen, toGif } from './util';
import QuadWorker from 'worker-loader!./quad.worker';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let imageInput: HTMLInputElement;
let exportGifButton: HTMLButtonElement;
let quadWorker: QuadWorker;
const processedFrames: ImageData[] = [];
const processingQueue: File[] = [];
let isProcessing: boolean = false;
let offlineAnimateId: number;

function draw(imageData: ImageData) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
}

function offlineAnimate(offlineFrames: ImageData[], animateIndex: number = 0, currFrameIndex: number = 0, numFramesEach: number = 20): void {
    let nextFrameIndex: number = currFrameIndex + 1;
    let nextAnimateIndex: number = animateIndex;

    if (nextFrameIndex > numFramesEach) {
        nextAnimateIndex = animateIndex + 1 >= offlineFrames.length ? 0 : animateIndex + 1;
        nextFrameIndex = 0;
    }

    offlineAnimateId = window.requestAnimationFrame(() => offlineAnimate(offlineFrames, nextAnimateIndex, nextFrameIndex, numFramesEach));

    draw(offlineFrames[nextAnimateIndex]);
}

function processImage(imageFile: File): void {
    window.cancelAnimationFrame(offlineAnimateId);

    loadImage(imageFile)
        .then(imageElem => getImageDataOffScreen(imageElem, canvas.width, canvas.height))
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
    let skipFirst: boolean = false;
    if (!isProcessing) {
        processImage(imageInput.files[0]);

        isProcessing = true;
        skipFirst = true;
    }
    for (let fileIndex = skipFirst ? 1 : 0; fileIndex < imageInput.files.length; fileIndex++) {
        processingQueue.push(imageInput.files[fileIndex]);
    }
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
            if (message.data) {
                processedFrames.push(message.data);
                window.requestAnimationFrame(timestamp => draw(message.data))
            }
            break;
        case 'processed':
            if (processingQueue.length) {
                // process the next image in the queue
                const nextImageFile: File = processingQueue.shift() as File;
                processImage(nextImageFile);
            } else {
                offlineAnimateId = window.requestAnimationFrame(() => offlineAnimate(processedFrames));
                isProcessing = false;
            }

            exportGifButton.disabled = isProcessing;
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

    // export logic
    exportGifButton = document.getElementById('export-gif') as HTMLButtonElement;
    exportGifButton.addEventListener('click', () => {
        toGif(processedFrames);
    });

    // size canvas
    resizeCanvas();
}

main();