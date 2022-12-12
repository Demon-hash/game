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
    private world: World;

    public states = {
        onFoots: false
    }

    constructor({
                    coords: {x = 0, y = 0}, borders: {width = 32, height = 96},
                    speed = 4, jumpVelocity = 15, gravity = 0.5
                }: IEntityInstance) {
        this.coords = {x, y};
        this.borders = {width, height};
        this.velocity = {x: 0, y: 1};

        this.speed = speed;
        this.jumpVelocity = jumpVelocity;
        this.gravity = gravity;
    }

    public attachToWorld(world: World) {
        this.world = world;
    }

    public resetState<K extends keyof typeof this.states, V extends typeof this.states[K]>(key: K, value: V) {
        this.states = {
            ...this.states,
            [key]: value
        }
    }

    private collision(offset?: IModel) {
        const model = {
            top: Math.floor(Math.max(0, Math.floor(this.coords.y - (offset?.top ?? 0))) / this.world.cell),
            left: Math.floor(Math.max(0, Math.floor(this.coords.x - (offset?.left ?? 0))) / this.world.cell),
            bottom: Math.floor(Math.min(Math.floor(this.coords.y + this.borders.height + (offset?.bottom ?? 0)), this.world.height - this.world.cell) / this.world.cell),
            right: Math.floor(Math.min(Math.floor(this.coords.x + this.borders.width + (offset?.right ?? 0)), this.world.width - this.world.cell) / this.world.cell),
            velocity: {
                top: Math.floor(-this.velocity.y / this.world.cell),
                bottom: Math.floor(this.velocity.y / this.world.cell)
            }
        };

        for (let x: number, y: number = model.top; y <= (model.bottom + model.velocity.bottom); y++) {
            for (x = model.left; x <= model.right; x++) {
                if (!this.world.getBlockData({x, y}).solid) continue;
                return {x: (x * this.world.cell), y: (y * this.world.cell)};
            }
        }
    }

    protected gravitation() {
        if (this.world == null) return;

        this.resetState("onFoots", false);
        this.coords.x += this.velocity.x;

        let pos: IPosition;
        if (!(pos = this.collision())) {
            this.coords.y += this.velocity.y;
            this.velocity.y += this.gravity;
        } else {
            if (pos.y <= this.coords.y + this.borders.height - this.world.cell) {
                switch (Math.sign(this.velocity.x)) {
                    case 0:
                        this.coords.y = pos.y + this.world.cell + Math.abs(this.velocity.y);
                        this.velocity.y = 0;
                        break;
                    case 1:
                        this.resetState("onFoots", false);
                        this.coords.x = (pos.x - (this.borders.width) - 0.01);
                        this.velocity.x = 0;
                        break;
                    case -1:
                        this.resetState("onFoots", false);
                        this.velocity.x = 0;
                        this.coords.x = pos.x + this.world.cell;
                        break;
                }
            } else {
                this.coords.y = pos.y - (this.borders.height - 0.1);
                this.velocity.y = 0;
                this.resetState("onFoots", true);
            }
        }
    }

    protected controls() {
        window.addEventListener("keypress", (event: KeyboardEvent) => {
            if (this.world == null) return;
            switch (event.key) {
                case Config.controls.right:
                    this.velocity.x = this.speed;
                    break;
                case Config.controls.left:
                    this.velocity.x = -this.speed;
                    break;
                case Config.controls.jump:
                    if (this.states.onFoots && !this.collision({ left: 0, top: this.world.cell, bottom: -this.borders.height, right: 0 })) {
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