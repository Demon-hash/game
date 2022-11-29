import {Entity} from "./index";
import World from "../world";
import {IEntityInstance, IPlayerDraw} from "../../@types";

export default class Player extends Entity {
    constructor({coords, borders, speed, gravity, jumpVelocity}: IEntityInstance) {
        super({x: 0, y: 0, coords, borders, speed, jumpVelocity, gravity});
        this.listenToKeyboard();
    }

    draw({ctx, camera}: IPlayerDraw) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.coords.x - camera.x, this.coords.y - camera.y, this.borders.width, this.borders.height);
    }

    update(world: World) {
        this.gravitation(world);
    }
}