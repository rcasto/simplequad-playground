import { createQuadTree, Point, QuadTree, CollisionObject } from 'simplequad';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let imageInput: HTMLInputElement;

interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

interface Pixel extends CollisionObject, Point, Color {};

function createPixel(x: number, y: number, r: number, g: number, b: number, a: number): Pixel {
    return {
        x,
        y,
        r,
        g,
        b,
        a,
        getBounds() {
            return {
                x: this.x,
                y: this.y,
            };
        },
    }
}

function getAverageColor(pixels: Pixel[]): Color {
    let squaredSumR: number = 0;
    let squaredSumG: number = 0;
    let squaredSumB: number = 0;
    let squaredSumA: number = 0;
    pixels.forEach(pixel => {
        squaredSumR += Math.pow(pixel.r, 2);
        squaredSumG += Math.pow(pixel.g, 2);
        squaredSumB += Math.pow(pixel.b, 2);
        squaredSumA += Math.pow(pixel.a, 2);
    });
    return {
        r: Math.sqrt(squaredSumR / pixels.length),
        g: Math.sqrt(squaredSumG / pixels.length),
        b: Math.sqrt(squaredSumB / pixels.length),
        a: Math.sqrt(squaredSumA / pixels.length),
    };
}

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

function createPixels(imageData: ImageData): Pixel[] {
    let r: number;
    let g: number;
    let b: number;
    let a: number;
    let offsetX: number;
    let offsetY: number;
    let pixels: Pixel[] = [];

    // Add every pixel to the quadtree
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            offsetX = x * 4;
            offsetY = imageData.width * y * 4;

            r = imageData.data[offsetX + offsetY];
            g = imageData.data[offsetX + offsetY + 1];
            b = imageData.data[offsetX + offsetY + 2];
            a = imageData.data[offsetX + offsetY + 3];

            pixels.push(createPixel(x, y, r, g, b, a));
        }
    }

    return pixels;
}

function flattenSets<T>(sets: Set<T>[]): Set<T> {
    return (sets || [])
        .reduce((prevSet, currSet) => new Set([...prevSet, ...currSet]), new Set());
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
}

main();