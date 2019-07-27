import { CollisionObject, Point } from 'simplequad';

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface QuadWorkerMessage {
    type: string;
}

export interface QuadWorkerDataMessage extends QuadWorkerMessage {
    data: ImageData;
}

export interface Pixel extends Point, Color {};
export interface PixelObject extends Pixel, CollisionObject {};