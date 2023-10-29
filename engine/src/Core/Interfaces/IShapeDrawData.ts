import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";

export type IShapeDrawData<TParticle extends Particle = Particle> = {
    /**
     * the canvas context for drawing
     */
    context: CanvasRenderingContext2D;

    /**
     * this variable contains the delta between the current frame and the previous frame
     */
    delta: IDelta;

    /**
     * the particle opacity
     */
    opacity: number;

    /**
     * the particle to be drawn using the shape
     */
    particle: TParticle;

    /**
     * the device pixel ratio, used for retina displays
     */
    pixelRatio: number;

    /**
     * the particle radius
     */
    radius: number;
};
