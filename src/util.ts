import { Pixel, PixelObject, Color } from './schema';

export const PIXEL_WIDTH: number = 4;

export function toPixelObject(pixel: Pixel): PixelObject {
    return {
        ...pixel,
        getBounds() {
            return {
                x: pixel.x,
                y: pixel.y,
            };
        }
    }
}

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
    let averageColor: Color = pixels[0];

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

export function createPixel(x: number, y: number, r: number, g: number, b: number, a: number): Pixel {
    return {
        x,
        y,
        r,
        g,
        b,
        a,
    }
}

export function createPixels(imageData: ImageData): Pixel[] {
    let pixels: Pixel[] = [];
    processImageData(imageData, pixel => pixels.push(pixel));
    return pixels;
}

export function fillImageDataFromColor(imageData: ImageData, color: Color): void {
    for (let i = 0; i < imageData.data.length; i += PIXEL_WIDTH) {
        imageData.data[i] = color.r;
        imageData.data[i + 1] = color.g;
        imageData.data[i + 2] = color.b;
        imageData.data[i + 3] = color.a;
    }
}

export function processImageData(imageData: ImageData, processFunc: (pixel: Pixel) => void, initPixelX: number = 0, initPixelY: number = 0): void {
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

/*
    Merges the target image data into the source image data object

    First checks if it will fit.
    Returns true if it was copied over, false if not.
*/
export function copyImageDataOver(sourceImageData: ImageData, targetImageData: ImageData, initPixelX: number = 0, initPixelY: number = 0): boolean {
    // validate inputs
    if (!sourceImageData ||
        !targetImageData ||
        initPixelX < 0 ||
        initPixelY < 0 ||
        initPixelX > sourceImageData.width ||
        initPixelY > sourceImageData.height) {
        return false;
    }

    // can target image data fit?
    if (initPixelX + targetImageData.width > sourceImageData.width ||
        initPixelY + targetImageData.height > sourceImageData.height) {
        return false;
    }

    let offsetX: number;
    let offsetY: number;
    let pixelOffset: number;

    for (let x = initPixelX; x < targetImageData.width; x++) {
        offsetX = x * PIXEL_WIDTH;
        
        for (let y = initPixelY; y < targetImageData.height; y++) {
            offsetY = targetImageData.width * y * PIXEL_WIDTH;
            pixelOffset = offsetX + offsetY;

            sourceImageData.data[pixelOffset] = targetImageData.data[pixelOffset];
            sourceImageData.data[pixelOffset + 1] = targetImageData.data[pixelOffset + 1];
            sourceImageData.data[pixelOffset + 2] = targetImageData.data[pixelOffset + 2];
            sourceImageData.data[pixelOffset + 3] = targetImageData.data[pixelOffset + 3];
        }
    }

    return true;
}