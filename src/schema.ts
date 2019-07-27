import { CollisionObject, Point } from 'simplequad';

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Pixel extends CollisionObject, Point, Color {};