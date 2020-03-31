import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Interfaces/Options/IOptions";
import { MoveDirection } from "../../Enums/MoveDirection";
import { OutMode } from "../../Enums/OutMode";
import { PresetType } from "../../Enums/PresetType";
import { ShapeType } from "../../Enums/ShapeType";
import { HoverMode } from "../../Enums/Modes/HoverMode";

export class Presets {
    private static presets: { [preset: string]: RecursivePartial<IOptions> } = {};

    public static getPreset(preset: PresetType | string): RecursivePartial<IOptions> | undefined {
        return this.presets[preset];
    }

    public static addPreset(presetKey: string, options: RecursivePartial<IOptions>) {
        if (!this.presets[presetKey]) {
            this.presets[presetKey] = options;
        }
    }

    public static get basic(): RecursivePartial<IOptions> {
        return {
            particles: {
                color: {
                    value: "#ffffff",
                },
                lineLinked: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outMode: OutMode.out,
                    speed: 2,
                },
            },
        };
    }

    public static get backgroundMask(): RecursivePartial<IOptions> {
        return {
            backgroundMask: {
                cover: {
                    value: {
                        b: 255,
                        g: 255,
                        r: 255,
                    },
                },
                enable: true,
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: HoverMode.bubble,
                    },
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 1,
                        size: 100,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                lineLinked: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 1,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outMode: OutMode.out,
                    random: false,
                    speed: 2,
                    straight: false,
                },
                opacity: {
                    random: false,
                    value: 1,
                },
                shape: {
                    type: ShapeType.circle,
                },
                size: {
                    random: true,
                    value: 30,
                },
            },
        };
    }

    public static get fontAwesome(): RecursivePartial<IOptions> {
        return {
            particles: {
                shape: {
                    character: {
                        fill: true,
                        font: "Font Awesome 5 Free",
                        style: "",
                        weight: "400",
                    },
                    type: ShapeType.character,
                },
                size: {
                    random: false,
                    value: 16,
                },
            },
        };
    }

    public static get snow(): RecursivePartial<IOptions> {
        return {
            particles: {
                color: {
                    value: "#fff",
                },
                move: {
                    bounce: false,
                    direction: MoveDirection.bottom,
                    enable: true,
                    outMode: OutMode.out,
                    random: false,
                    speed: 2,
                    straight: false,
                },
                opacity: {
                    random: true,
                    value: 0.5,
                },
                shape: {
                    type: ShapeType.circle,
                },
                size: {
                    random: true,
                    value: 10,
                },
            },
        };
    }

    public static get bouncing(): RecursivePartial<IOptions> {
        return {
            particles: {
                move: {
                    outMode: OutMode.bounce,
                },
            },
        };
    }

    public static get stars(): RecursivePartial<IOptions> {
        return {
            particles: {
                color: {
                    value: "#ffffff",
                },
                lineLinked: {
                    enable: false,
                },
                move: {
                    bounce: false,
                    direction: MoveDirection.none,
                    enable: true,
                    outMode: OutMode.out,
                    random: true,
                    speed: 0.3,
                    straight: false,
                },
                opacity: {
                    anim: {
                        enable: true,
                        minimumValue: 0,
                        speed: 1,
                        sync: false,
                    },
                    random: true,
                    value: 1,
                },
                shape: {
                    type: ShapeType.circle,
                },
                size: {
                    random: true,
                    value: 3,
                },
            },
        };
    }

    public static get _60fps(): RecursivePartial<IOptions> {
        return {
            fpsLimit: 60
        };
    }
}
