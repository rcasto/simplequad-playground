import { BoundingBox, createQuadTree, QuadTree, CollisionObject } from 'simplequad';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let imageInput: HTMLInputElement;

function loadImage(imageFile: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const imageFileDataUrl = window.URL.createObjectURL(imageFile);
        const image = new Image();

        image.onload = () => {
            window.URL.revokeObjectURL(imageFileDataUrl);
            resolve(image)
        };
        image.onerror = (err) => {
            window.URL.revokeObjectURL(imageFileDataUrl);
            reject(err);
        };
        image.src = imageFileDataUrl;
    });
}

function processImage(imageFile: File): void {
    loadImage(imageFile)
        .then(image => {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
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

function main() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;
    imageInput = document.getElementById('image-input') as HTMLInputElement;

    canvas.width = 600;
    canvas.height = 400;

    imageInput.addEventListener('change', onImageChange);
}

main();