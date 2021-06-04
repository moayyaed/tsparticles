import {
    colorToRgb,
    getRandomRgbColor,
    getStyleFromRgb,
    hslaToRgba,
    hslToHsv,
    hslToRgb,
    hsvToHsl,
    hsvToRgb,
    rgbToHsv,
    stringToAlpha,
    stringToRgb,
} from "../src/Utils";
import { describe, it } from "mocha";
import { expect } from "chai";
import { IColor, IRgb, IHsl, IHsla, IHsv } from "../src/Core/Interfaces/Colors";

describe("ColorUtils", () => {
    const red: IRgb = {
        b: 0,
        g: 0,
        r: 255,
    };

    describe("colorToRgb", () => {
        it("string value", () => {
            const color: IColor = {
                value: "#ff0000",
            };

            expect(colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it("string value", () => {
            const color: IColor = {
                value: ["#ff0000", "#00ff00", "#0000ff"],
            };

            expect(colorToRgb(color)).to.satisfy((rgb: IRgb) => {
                return rgb.r === 255 || rgb.g === 255 || rgb.b === 255;
            }).and.not.be.undefined.and.not.be.null;
        });

        it("IValueColor w/ rgb value", () => {
            const color: IColor = {
                value: {
                    rgb: {
                        b: 0,
                        g: 0,
                        r: 255,
                    },
                },
            };

            expect(colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it("IValueColor w/ hsl value", () => {
            const color: IColor = {
                value: {
                    hsl: {
                        h: 0,
                        l: 50,
                        s: 100,
                    },
                },
            };

            expect(colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it("rgb value", () => {
            const color: IColor = {
                value: {
                    b: 0,
                    g: 0,
                    r: 255,
                },
            };

            expect(colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it("hsl value", () => {
            const color: IColor = {
                value: {
                    h: 0,
                    l: 50,
                    s: 100,
                },
            };

            expect(colorToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("invalid string value", () => {
            const color: IColor = {
                value: "hello world",
            };

            expect(colorToRgb(color)).to.be.undefined;
        });
    });

    describe("stringToAlpha", () => {
        it("from hex with alpha string to alpha value", () => {
            const value = "#ff0000ff";

            expect(stringToAlpha(value)).to.equal(1).and.be.not.undefined;
        });

        it("from hex without alpha string to alpha value", () => {
            const value = "#ff0000";

            expect(stringToAlpha(value)).to.equal(1).and.be.not.undefined;
        });

        it("invalid string value", () => {
            const value = "hello world";

            expect(stringToAlpha(value)).to.be.undefined;
        });
    });

    describe("stringToRgb", () => {
        it("from hex string to rgb value", () => {
            const color = "#ff0000";

            expect(stringToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it("invalid string value", () => {
            const value = "hello world";

            expect(stringToRgb(value)).to.be.undefined;
        });
    });

    describe("hslToRgb", () => {
        it("hsl value", () => {
            const color: IHsl = {
                h: 0,
                l: 50,
                s: 100,
            };

            expect(hslToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });
    });

    describe("hslaToRgba", () => {
        it("hsl value", () => {
            const color: IHsla = {
                a: 1,
                h: 0,
                l: 50,
                s: 100,
            };

            expect(hslaToRgba(color)).to.include(red).and.include({ a: 1 }).and.not.be.undefined.and.not.be.null;
        });
    });

    describe("hslToHsv", () => {
        it("hsl value", () => {
            const color: IHsl = {
                h: 0,
                l: 50,
                s: 100,
            };

            expect(hslToHsv(color)).to.include({
                h: 0,
                s: 100,
                v: 100,
            }).and.not.be.undefined.and.not.be.null;
        });
    });

    describe("hsvToHsl", () => {
        it("hsv value", () => {
            const color: IHsv = {
                h: 0,
                s: 100,
                v: 100,
            };

            expect(hsvToHsl(color)).to.include({
                h: 0,
                l: 50,
                s: 100,
            }).and.not.be.undefined.and.not.be.null;
        });
    });

    describe("hsvToRgb", () => {
        it("hsv value", () => {
            const color: IHsv = {
                h: 0,
                s: 100,
                v: 100,
            };

            expect(hsvToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });
    });

    describe("rgbToHsv", () => {
        it("rgb value", () => {
            const color: IHsv = {
                h: 0,
                s: 100,
                v: 100,
            };

            expect(rgbToHsv(red)).to.include(color).and.not.be.undefined.and.not.be.null;
        });
    });

    describe("getRandomRgbColor", () => {
        const checkRange = (n: number, min?: number): boolean => n >= (min ?? 0) && n < 256;

        const checkColor = (rgb: IRgb, min?: number): boolean =>
            checkRange(rgb.r, min) && checkRange(rgb.g, min) && checkRange(rgb.b, min);

        it("totally random color", () => {
            expect(getRandomRgbColor()).to.satisfy((rgb: IRgb) => checkColor(rgb)).and.not.be.undefined.and.not.be.null;
        });

        it("random color with min seed", () => {
            const min = 200;

            expect(getRandomRgbColor(min)).to.satisfy((rgb: IRgb) => checkColor(rgb, min)).and.not.be.undefined.and.not
                .be.null;
        });
    });

    describe("getStyleFromColor", () => {
        it("IRgb to rgba string", () => {
            expect(getStyleFromRgb(red)).to.equal("rgba(255, 0, 0, 1)");
        });
    });
});