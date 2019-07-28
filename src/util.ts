import { Pixel, Color } from './schema';

export const PIXEL_WIDTH: number = 4;

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
    let averageColor: Color = pixels[0] || {
        r: 255,
        g: 255,
        b: 255,
        a: 255,
    };

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
    const pixelX: number = pixel.x * PIXEL_WIDTH;
    const pixelY: number = pixel.y * imageData.width * PIXEL_WIDTH;
    const pixelOffset: number = pixelX + pixelY;
    if (pixelOffset < 0 || pixelOffset + PIXEL_WIDTH >= imageData.data.length) {
        return;
    }
    imageData.data[pixelOffset] = pixel.r;
    imageData.data[pixelOffset + 1] = pixel.g;
    imageData.data[pixelOffset + 2] = pixel.b;
    imageData.data[pixelOffset + 3] = pixel.a;
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
        offsetX = Math.round(x * PIXEL_WIDTH);

        for (let y = initPixelY; y < imageData.height; y++) {
            offsetY = Math.round(imageData.width * y * PIXEL_WIDTH);

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
function copyImageDataOver(sourceImageData: ImageData, targetImageData: ImageData, initPixelX: number = 0, initPixelY: number = 0): boolean {
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

    let sourceOffsetX: number;
    let sourceOffsetY: number;
    let sourceOffset: number;

    let targetOffsetX: number;
    let targetOffsetY: number;
    let targetOffset: number;

    for (let x = 0; x < targetImageData.width; x++) {
        sourceOffsetX = (x + initPixelX) * PIXEL_WIDTH;
        targetOffsetX = x * PIXEL_WIDTH;

        for (let y = 0; y < targetImageData.height; y++) {
            sourceOffsetY = sourceImageData.width * (y + initPixelY) * PIXEL_WIDTH;
            targetOffsetY = targetImageData.width * y * PIXEL_WIDTH;

            sourceOffset = Math.round(sourceOffsetX + sourceOffsetY);
            targetOffset = Math.round(targetOffsetX + targetOffsetY);

            sourceImageData.data[sourceOffset] = targetImageData.data[targetOffset];
            sourceImageData.data[sourceOffset + 1] = targetImageData.data[targetOffset + 1];
            sourceImageData.data[sourceOffset + 2] = targetImageData.data[targetOffset + 2];
            sourceImageData.data[sourceOffset + 3] = targetImageData.data[targetOffset + 3];
        }
    }

    return true;
}