import {Entity} from "./index";
import {IEntityInstance, IPlayerDraw} from "../../@types";

export default class Player extends Entity {
    constructor({coords, borders, speed, gravity, jumpVelocity}: IEntityInstance) {
        super({x: 0, y: 0, coords, borders, speed, jumpVelocity, gravity});
        this.controls();
    }

    draw({ctx, camera}: IPlayerDraw) {
        ctx.fillStyle = "red";
        ctx.fillRect(Math.floor(this.coords.x - camera.x), Math.floor(this.coords.y - camera.y), this.borders.width, this.borders.height);
    }

    update() {
        this.gravitation();
    }
}