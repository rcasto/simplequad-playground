import { BoundingBox, Circle, createQuadTree, QuadTree, CollisionObject } from 'simplequad';

interface Vector {
    x: number;
    y: number;
}

interface Particle extends CollisionObject, Circle {
    v: Vector;
    draw: (context: CanvasRenderingContext2D) => void;
}

const capacity: number = 10;
const bounds: BoundingBox = {
    x: 0,
    y: 0,
    width: 600,
    height: 400,
};
const canvas: HTMLCanvasElement = document.getElementById('canvas') as unknown as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d');
const quadTree: QuadTree = createQuadTree(bounds, capacity);

canvas.width = bounds.width;
canvas.height = bounds.height;

function animate() {
    window.requestAnimationFrame(animate);


}

function createParticle(bounds: BoundingBox): Particle {
    return {
        x: 0, 
        y: 0,
        r: 5,
        v: {
            x: 1,
            y: 1,
        },
        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            context.closePath();
        },
        getBounds() {
            return {
                x: this.x,
                y: this.y,
                r: this.r,
            };
        },
    };
}

animate();