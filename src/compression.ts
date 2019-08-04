import { BoundingBox, createQuadTree, Point, QuadTree } from 'simplequad';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let imageInput: HTMLInputElement;

interface Pixel extends Point {
    r: number;
    g: number;
    b: number;
    a: number;
}

function isSamePixel(pixel1: Pixel, pixel2: Pixel): boolean {
    return pixel1.r === pixel2.r &&
           pixel1.g === pixel2.g &&
           pixel1.b === pixel2.b &&
           pixel1.a === pixel2.a;
}

function createPixel(x: number, y: number, r: number, g: number, b: number, a: number): Pixel {
    return {
        x,
        y,
        r,
        g,
        b,
        a,
    };
}

function compressImage(imageData: ImageData) {
    // The capacity of each node in the quadtree
    // is set to 1
    // Every leaf node corresponds to 1 pixel
    const quadTree: QuadTree = createQuadTree({
        x: 0,
        y: 0,
        width: imageData.width,
        height: imageData.height,
    }, 1);

    let r: number;
    let g: number;
    let b: number;
    let a: number;
    let offsetX: number;
    let offsetY: number;
    let pixel: Pixel;

    // Add every pixel to the quadtree
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            offsetX = x * 4;
            offsetY = imageData.width * y;

            r = imageData.data[offsetX + offsetY];
            g = imageData.data[offsetX + offsetY + 1];
            b = imageData.data[offsetX + offsetY + 2];
            a = imageData.data[offsetX + offsetY + 3];

            pixel = createPixel(x, y, r, g, b, a);
            quadTree.add(pixel);
        }
    }

    const totalPixels = quadTree.query(quadTree.bounds).size;
    collapseSubtrees(quadTree);
    const totalPixelsAfterCompress = quadTree.query(quadTree.bounds).size;
    const deltaInTotalPixels = totalPixels - totalPixelsAfterCompress;

    console.log(`Total Pixels: ${totalPixels}`);
    console.log(`Total Pixels after Compression: ${totalPixelsAfterCompress}`);
    console.log(`Total reduction in Pixels: ${deltaInTotalPixels}`);
}

function collapseSubtrees(quadTree: QuadTree): void {
    if (quadTree.quadrants) {
        // apply to children
        quadTree.quadrants.forEach(quadrant => collapseSubtrees(quadrant));
        // apply to self
        const childPixels = [...quadTree.query(quadTree.bounds)] as Pixel[];
        const firstPixel = childPixels.shift() as Pixel;
        if (firstPixel) {
            const canConsumeChildren = childPixels.every(childPixel => isSamePixel(childPixel, firstPixel));
            if (canConsumeChildren) {
                quadTree.data.set('', new Set([firstPixel]));
                quadTree.quadrants = [];
            }
        }
    }
}

function getImageData(image: HTMLImageElement): ImageData {
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    return imageData;
}

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
        .then(getImageData)
        .then(compressImage);
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