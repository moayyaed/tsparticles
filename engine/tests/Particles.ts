import { describe, it } from "mocha";
import { ICoordinates3d, getRandom } from "../src";
import { TestCanvas } from "./Fixture/TestCanvas";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticles } from "./Fixture/TestParticles";
import { TestWindow } from "./Fixture/Window";
import { expect } from "chai";

describe("Particles", () => {
    globalThis.window = TestWindow;
    const testContainer = new TestContainer({});
    const testParticles = new TestParticles(testContainer.container);
    const testCanvas = new TestCanvas(testContainer.container, 1920, 1080);

    // Common options used when initializing Particles with a set number of particles
    const numParticles = 5;
    const numParticlesOptions = {
        particles: {
            number: {
                value: numParticles,
            },
        },
    };
    // This is to keep the `removeQuantity` method from executing `container.play`
    // which is not playing well in Node.
    const enableParticleMoveOptions = {
        particles: {
            number: numParticlesOptions.particles.number,
            move: {
                enable: true,
            },
        },
    };

    const enableParticleEmptyMoveOptions = {
        particles: {
            number: { value: 0 },
            move: {
                enable: true,
            },
        },
    };

    it("should create the number of particles configured in container", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
    });

    it("should add particles to array of particles", () => {
        testContainer.reset({
            particles: {
                number: {
                    value: 0,
                },
            },
        });
        testParticles.reset(testContainer.container);

        expect(testParticles.particles.count).to.equal(0);

        const particle1 = testParticles.particles.addParticle({ x: 1, y: 1 });
        expect(testParticles.particles.count).to.equal(1);
        expect(testParticles.particles.find(t => t === particle1)).to.be.not.undefined;

        const particle2 = testParticles.particles.addParticle({ x: 2, y: 2 });
        expect(testParticles.particles.count).to.equal(2);
        expect(testParticles.particles.filter(t => t === particle1 || t === particle2).length).to.equal(2);

        const particle3 = testParticles.particles.addParticle({ x: 3, y: 3 });
        expect(testParticles.particles.count).to.equal(3);
        expect(
            testParticles.particles.filter(t => t === particle1 || t === particle2 || t === particle3).length
        ).to.equal(3);
    });

    it("should remove particles at specified indices", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        let arr = testParticles.particles.filter(() => true);

        const particle1 = arr[0],
            particle3 = arr[2],
            particle4 = arr[3],
            particle5 = arr[4];

        testParticles.particles.removeAt(1);
        arr = testParticles.particles.filter(() => true);
        expect(arr).to.eql([particle1, particle3, particle4, particle5]);
        expect(arr).to.not.eql([particle5, particle4, particle3, particle1]);

        testParticles.particles.removeAt(2);
        arr = testParticles.particles.filter(() => true);
        expect(arr).to.eql([particle1, particle3, particle5]);
        expect(arr).to.not.eql([particle5, particle3, particle1]);
    });

    it("should remove specified quantity of indices, starting at the specified index", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        let arr = testParticles.particles.filter(() => true);

        const particle1 = arr[0],
            particle4 = arr[3],
            particle5 = arr[4];

        testParticles.particles.removeAt(1, 2);
        arr = testParticles.particles.filter(() => true);
        expect(arr).to.eql([particle1, particle4, particle5]);
        expect(arr).to.not.eql([particle5, particle4, particle1]);

        testParticles.particles.removeAt(0, 2);
        arr = testParticles.particles.filter(() => true);
        expect(arr).to.eql([particle5]);
    });

    it("should remove specified number of particles", () => {
        testContainer.reset(enableParticleMoveOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
        testParticles.particles.removeQuantity(3);
        expect(testParticles.particles.count).to.equal(numParticles - 3);
        testParticles.particles.removeQuantity(2);
        expect(testParticles.particles.count).to.equal(numParticles - 5);
    });

    it("should remove specified particle", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        let arr = testParticles.particles.filter(() => true);

        const particle1 = arr[0],
            particle2 = arr[1],
            particle3 = arr[2],
            particle4 = arr[3],
            particle5 = arr[4];

        testParticles.particles.remove(particle4);

        arr = testParticles.particles.filter(() => true);

        expect(arr).to.eql([particle1, particle2, particle3, particle5]);
        expect(arr).to.not.eql([particle5, particle3, particle2, particle1]);

        testParticles.particles.remove(particle1);

        arr = testParticles.particles.filter(() => true);

        expect(arr).to.eql([particle2, particle3, particle5]);
        expect(arr).to.not.eql([particle5, particle3, particle2]);
    });

    it("should remove all particles when calling clear", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
        testParticles.particles.clear();
        expect(testParticles.particles.count).to.equal(0);
    });

    it("should push multiple particles at the specified position", () => {
        testContainer.reset(enableParticleEmptyMoveOptions);
        testCanvas.reset(1920, 1080, testContainer.container);
        testParticles.reset(testContainer.container);

        const position: ICoordinates3d = { x: 100, y: 100, z: 0 };
        testParticles.particles.push(numParticles, { position, clicking: false, inside: false });
        expect(testParticles.particles.count).to.equal(numParticles);

        const arr = testParticles.particles.filter(() => true);

        for (const particle of arr) {
            expect(particle.position.x).to.be.equal(position.x);
            expect(particle.position.y).to.be.equal(position.y);
        }
    });

    it("should move particles", () => {
        testContainer.reset(enableParticleEmptyMoveOptions);
        testCanvas.reset(1920, 1080, testContainer.container);
        testParticles.reset(testContainer.container);

        const position: ICoordinates3d = { x: 100, y: 100, z: 0 };
        testParticles.particles.push(numParticles, { position, clicking: false, inside: false });
        expect(testParticles.particles.count).to.equal(5);

        const arr = testParticles.particles.filter(() => true);

        let ts = getRandom() * 16.66667;
        const logP = arr[0];

        console.log(logP.id);

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = getRandom() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = getRandom() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = getRandom() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = getRandom() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });
    });
});
