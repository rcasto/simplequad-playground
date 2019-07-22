import { BoundingBox, Circle, createQuadTree, QuadTree, CollisionObject } from 'simplequad';

interface Vector {
    x: number;
    y: number;
}

interface Particle extends CollisionObject, Circle {
    v: Vector;
    lastUpdate: number;
    update: (timestamp: number) => void;
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
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
const quadTree: QuadTree = createQuadTree(bounds, capacity);
const particle: Particle = createParticle();

canvas.width = bounds.width;
canvas.height = bounds.height;

function animate(animateTimestamp: number = 0) {
    window.requestAnimationFrame(animate);

    particle.update(animateTimestamp);
    quadTree.add(particle);

    const worldObjects: Set<CollisionObject> = quadTree.query(quadTree.bounds);
    if (worldObjects.size <= 0) {
        console.log('Particle has left the map of the world');
    }

    particle.draw(context);
}

function createParticle(): Particle {
    return {
        x: 0, 
        y: 0,
        r: 5,
        v: {
            x: 1,
            y: 1,
        },
        lastUpdate: 0,
        update(timestamp: number) {
            const deltaTime: number = timestamp - this.lastUpdate;
            this.lastUpdate = timestamp;
            this.x += this.v.x * deltaTime;
            this.y += this.v.y * deltaTime;
        },
        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            context.stroke();
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

if (context) {
    animate();
}