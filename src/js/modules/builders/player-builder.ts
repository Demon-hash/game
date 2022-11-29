import {IPosition, ISpriteBorders} from "../../@types";
import Player from "../entity/player";

export class PlayerBuilder<T extends Player> {
    private coords: IPosition = {x: 0, y: 0};
    private borders: ISpriteBorders = {width: 0, height: 0};
    private speed: number = 0;
    private gravity: number = 0;
    private jumpAmplitude: number = 0;

    constructor() {
    }

    setJumpAmplitude(amplitude: number) {
        this.jumpAmplitude = amplitude;
        return this;
    }

    setGravity(gravity: number) {
        this.gravity = gravity;
        return this;
    }

    setSpeed(speed: number) {
        this.speed = speed;
        return this;
    }

    setCoords(coords: IPosition) {
        this.coords = coords;
        return this;
    }

    setBorders(borders: ISpriteBorders) {
        this.borders = borders;
        return this;
    }

    build(): Player {
        return new Player({
            x: this.coords.x,
            y: this.coords.y,
            coords: this.coords,
            borders: this.borders,
            speed: this.speed,
            gravity: this.gravity,
            jumpVelocity: this.jumpAmplitude
        });
    }
}