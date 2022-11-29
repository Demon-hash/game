import Config from "../system/config";
import World from "../world";
import {
    IEntityInstance, IModel,
    IPosition, ISpriteBorders,
    IVelocity
} from "../../@types";

export class Entity {
    public readonly coords: IPosition;
    public readonly borders: ISpriteBorders;
    public readonly velocity: IVelocity;

    public readonly speed: number;
    public readonly jumpVelocity: number;
    public readonly gravity: number;

    public states = {
        onFoots: false
    }

    constructor({x, y, borders, speed = 4, jumpVelocity = 15, gravity = 0.5}: IEntityInstance) {
        this.borders = borders;
        this.coords = {x, y};
        this.velocity = {x: 0, y: 1};

        this.speed = speed;
        this.jumpVelocity = jumpVelocity;
        this.gravity = gravity;
    }

    public resetState<K extends keyof typeof this.states, V extends typeof this.states[K]>(key: K, value: V) {
        this.states = {
            ...this.states,
            [key]: value
        }
    }

    private collision(world: World) {
        const entity: IModel = {
            top: Math.floor(Math.max(0, Math.floor(this.coords.y)) / world.cell),
            left: Math.floor(Math.max(0, Math.floor(this.coords.x)) / world.cell),
            bottom: Math.floor(Math.min(Math.floor(this.coords.y + this.borders.height), world.height - world.cell) / world.cell),
            right: Math.floor(Math.min(Math.floor(this.coords.x + this.borders.width), world.width - world.cell) / world.cell)
        }

        for (let x: number, y: number = entity.top; y <= entity.bottom; y++) {
            for (x = entity.left; x <= entity.right; x++) {
                if (!world.getBlockData({x, y}).solid) continue;
                return {x: (x * world.cell), y: (y * world.cell)};
            }
        }
    }

    protected gravitation(world: World) {

        this.resetState("onFoots", false);
        this.coords.x += this.velocity.x;

        let pos: IPosition;
        if (!(pos = this.collision(world))) {
            this.coords.y += this.velocity.y;
            this.velocity.y += this.gravity;
        } else {
            if (pos.y <= this.coords.y + this.borders.height - world.cell) {
                switch (Math.sign(this.velocity.x)) {
                    case 1:
                        this.resetState("onFoots", false);
                        this.velocity.x = 0;
                        this.coords.x = pos.x - this.borders.width - 0.1;
                        break;
                    case -1:
                        this.resetState("onFoots", false);
                        this.velocity.x = 0;
                        this.coords.x = pos.x + world.cell;
                        break;
                }
            } else {
                switch (Math.sign(this.velocity.y)) {
                    case 1:
                        this.velocity.y = 0;
                        this.coords.y = pos.y - (this.borders.height - 0.1);
                        break;
                }
                this.resetState("onFoots", true);
            }
        }
    }

    protected listenToKeyboard() {
        window.addEventListener("keypress", (event: KeyboardEvent) => {
            switch (event.key) {
                case Config.controls.right:
                    this.velocity.x = this.speed;
                    break;
                case Config.controls.left:
                    this.velocity.x = -this.speed;
                    break;
                case Config.controls.jump:
                    if (this.states.onFoots) {
                        this.coords.y -= 1;
                        this.velocity.y = -this.jumpVelocity;
                    }
                    break;
            }
        }, false);

        window.addEventListener("keyup", (event: KeyboardEvent) => {
            switch (event.key) {
                case Config.controls.right:
                case Config.controls.left:
                    this.velocity.x = 0;
                    break;
            }
        }, false);
    }
}