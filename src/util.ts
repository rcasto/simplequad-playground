import { Pixel, Color } from './schema';

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

export function flattenSets<T>(sets: Set<T>[]): Set<T> {
    return (sets || [])
        .reduce((prevSet, currSet) => new Set([...prevSet, ...currSet]), new Set());
}

export function getAverageColor(pixels: Pixel[]): Color {
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

export function createPixel(x: number, y: number, r: number, g: number, b: number, a: number): Pixel {
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
                width: 1,
                height: 1,
            };
        },
    }
}

export function createPixels(imageData: ImageData): Pixel[] {
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