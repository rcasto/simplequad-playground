import { Pixel, Color } from './schema';
import GIF from 'gif.js';

export const PIXEL_WIDTH: number = 4;
export const WHITE_COLOR: Color = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
};

export function loadImage(imageFile: File): Promise<HTMLImageElement> {
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

export function getAverageColor(pixels: Pixel[]): Color {
    let squaredSumR: number;
    let squaredSumG: number;
    let squaredSumB: number;
    let squaredSumA: number;
    let averageColor: Color = pixels[0] || WHITE_COLOR;

    if (pixels.length > 1) {
        return pixels.slice(1)
            .reduce((prevAverage: Color, currPixel: Pixel) => {
                squaredSumR = Math.pow(prevAverage.r, 2) + Math.pow(currPixel.r, 2);
                squaredSumG = Math.pow(prevAverage.g, 2) + Math.pow(currPixel.g, 2);
                squaredSumB = Math.pow(prevAverage.b, 2) + Math.pow(currPixel.b, 2);
                squaredSumA = Math.pow(prevAverage.a, 2) + Math.pow(currPixel.a, 2);
                return {
                    r: Math.sqrt(squaredSumR / 2),
                    g: Math.sqrt(squaredSumG / 2),
                    b: Math.sqrt(squaredSumB / 2),
                    a: Math.sqrt(squaredSumA / 2),
                };
            }, averageColor);
    }

    return averageColor;
}

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
        }
    }
}

export function createPixels(imageData: ImageData): Pixel[] {
    let pixels: Pixel[] = [];
    processImageData(imageData, pixel => pixels.push(pixel));
    return pixels;
}

export function fillPixelInImageData(imageData: ImageData, pixel: Pixel): void {
    const pixelOffset: number = (pixel.x + pixel.y * imageData.width) * PIXEL_WIDTH;
    if (pixelOffset < 0 || pixelOffset + PIXEL_WIDTH >= imageData.data.length) {
        return;
    }
    imageData.data[pixelOffset] = pixel.r;
    imageData.data[pixelOffset + 1] = pixel.g;
    imageData.data[pixelOffset + 2] = pixel.b;
    imageData.data[pixelOffset + 3] = pixel.a;
}

export function getImageDataOffScreen(image: HTMLImageElement, width: number, height: number): ImageData {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    return imageData;
}

function processImageData(imageData: ImageData, processFunc: (pixel: Pixel) => void, initPixelX: number = 0, initPixelY: number = 0): void {
    let r: number;
    let g: number;
    let b: number;
    let a: number;
    let offsetX: number;
    let offsetY: number;
    let pixel: Pixel;

    for (let x = initPixelX; x < imageData.width; x++) {
        offsetX = x * PIXEL_WIDTH;

        for (let y = initPixelY; y < imageData.height; y++) {
            offsetY = imageData.width * y * PIXEL_WIDTH;

            r = imageData.data[offsetX + offsetY];
            g = imageData.data[offsetX + offsetY + 1];
            b = imageData.data[offsetX + offsetY + 2];
            a = imageData.data[offsetX + offsetY + 3];

            pixel = createPixel(x, y, r, g, b, a);
            processFunc(pixel);
        }
    }
}

export function toGif(imageFrames: ImageData[]): void {
    const gif = new GIF({
        workers: 2,
        quality: 10
    });

    imageFrames
        .forEach(imageFrame => gif.addFrame(imageFrame, {
            delay: 200,
        }));

    gif.on('finished', (blob: any) => {
        saveBlob('simplequad.export.gif', blob);
    });

    gif.render();
}

function saveBlob(fileName: string, blob: Blob) {
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blob);

    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}