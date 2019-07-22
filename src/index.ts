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
const dampenFactor: number = 0.9;

canvas.width = bounds.width;
canvas.height = bounds.height;

function animate(animateTimestamp: number = 0) {
    window.requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);

    particle.update(animateTimestamp);
    quadTree.add(particle);

    const worldObjects: Set<CollisionObject> = quadTree.query(quadTree.bounds);

    // If there are know objects within the overall bounds
    // It means the particle is out of the world bounds
    if (worldObjects.size <= 0) {
        particle.x = Math.max(Math.min(particle.x + particle.r, quadTree.bounds.x + quadTree.bounds.width), quadTree.bounds.x + particle.r);
        particle.y = Math.max(Math.min(particle.y + particle.r, quadTree.bounds.y + quadTree.bounds.height), quadTree.bounds.y + particle.r);

        // goes out of bounds on the x axis
        if (particle.x === quadTree.bounds.x + quadTree.bounds.width ||
            particle.x === quadTree.bounds.x + particle.r) {
            particle.v.x *= -1 * dampenFactor;
        }

        // goes out of bounds on the y axis
        if (particle.y === quadTree.bounds.y + quadTree.bounds.height ||
            particle.y === quadTree.bounds.y + particle.r) {
            particle.v.y *= -1 * dampenFactor;
        }
    }

    particle.draw(context);
}

// Resolves all particle collisions
function resolveParticleCollisions(particle: Particle, world: QuadTree) {
    resolveParticleWorldCollision(particle, quadTree);
}

function resolveParticleWorldCollision(particle: Particle, world: QuadTree) {

}

// function createStaticParticle()
// function createDynamicParticle()

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
            const deltaTimeInMs: number = timestamp - this.lastUpdate;
            this.lastUpdate = timestamp;
            this.x += this.v.x * deltaTimeInMs;
            this.y += this.v.y * deltaTimeInMs;
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