import { BoundingBox, Circle, createQuadTree, QuadTree, CollisionObject } from 'simplequad';

interface Vector {
    x: number;
    y: number;
}

interface Particle extends CollisionObject, Circle {
    v: Vector;
    lastUpdate: number;
    update: (timestamp: number) => void;
    draw: (context: CanvasRenderingContext2D, isCollided: boolean) => void;
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
const wallDampenFactor: number = 0.8;
const particleRadius: number = 5;
const particleVelocity: Vector = {
    x: 1,
    y: 1,
};
const TWO_PI: number = 2 * Math.PI;
const maxParticlesInWorld: number = 100;
const particlesInWorld: Particle[] = [];

canvas.width = bounds.width;
canvas.height = bounds.height;

function animate(animateTimestamp: number = 0) {
    window.requestAnimationFrame(animate);

    // Check if we are at capacity with particles
    if (particlesInWorld.length + 1 > maxParticlesInWorld) {
        // clear held particles
        particlesInWorld.length = 0;
    } else {
        // add a new particle
        const particle: Particle = createParticle(quadTree.bounds);
        particlesInWorld.push(particle);
    }

    // Clear the canvas and the quadtree
    context.clearRect(0, 0, canvas.width, canvas.height);
    quadTree.clear();

    // Build quadtree for particles in world
    particlesInWorld
        .forEach(particleInWorld => quadTree.add(particleInWorld));

    // Update the state of each particle (move it)
    particlesInWorld
        .forEach(particleInWorld => particleInWorld.update(animateTimestamp));

    // Resolve the state of each particle such that it isn't out of the world bounds
    particlesInWorld
        .forEach(particleInWorld => resolveParticleWorldCollisions(particleInWorld, quadTree));

    // Draw each particle in the world
    particlesInWorld
        .forEach(particleInWorld => {
            const particleWindowQueryResultSet: Set<CollisionObject> = quadTree.query(particleInWorld.getBounds());
            particleInWorld.draw(context, particleWindowQueryResultSet.size > 1);
        });
}

// Resolves all particle collisions
function resolveParticleWorldCollisions(particle: Particle, world: QuadTree): void {
    const minX: number = quadTree.bounds.x + particle.r;
    const minY: number = quadTree.bounds.y + particle.r;
    const maxX: number = quadTree.bounds.x + quadTree.bounds.width - particle.r;
    const maxY: number = quadTree.bounds.y + quadTree.bounds.height - particle.r;

    // Outside at the left of the canvas
    if (particle.x <= minX) {
        particle.x = minX;
        particle.v.x *= -1 * wallDampenFactor;
    }
    // Outisde at the right of the canvas
    else if (particle.x >= maxX) {
        particle.x = maxX;
        particle.v.x *= -1 * wallDampenFactor;
    }
    // Outside at the top of the canvas
    else if (particle.y <= minY) {
        particle.y = minY;
        particle.v.y *= -1 * wallDampenFactor;
    }
    // Outside at the bottom of the canvas
    else if (particle.y >= maxY) {
        particle.y = maxY;
        particle.v.y *= -1 * wallDampenFactor;
    }
}

// function createStaticParticle()
// function createDynamicParticle()
function createParticle(bounds: BoundingBox): Particle {
    const x = (bounds.x + bounds.width - particleRadius) * Math.random() + bounds.x + particleRadius;
    const y = (bounds.y + bounds.height - particleRadius) * Math.random() + bounds.y + particleRadius;
    return {
        x, 
        y,
        r: particleRadius,
        v: {
            ...particleVelocity,
        },
        lastUpdate: 0,
        update(timestamp: number) {
            const deltaTimeInMs: number = timestamp - this.lastUpdate;
            this.lastUpdate = timestamp;
            this.x += this.v.x * deltaTimeInMs;
            this.y += this.v.y * deltaTimeInMs;
        },
        draw(context, isCollided) {
            context.beginPath();
            context.strokeStyle = 'black';
            context.fillStyle = 'blue';
            context.arc(this.x, this.y, this.r, 0, TWO_PI);
            context.stroke();
            if (isCollided) {
                context.fill();
            }
            context.beginPath();
            context.fillStyle = 'red';
            context.arc(this.x, this.y, 1, 0, TWO_PI);
            context.fill();
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

// start the animation
if (context) {
    animate();
}