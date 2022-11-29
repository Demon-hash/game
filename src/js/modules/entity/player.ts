import {Entity} from "./index";
import World from "../world";
import {IPlayerDraw, IPlayerInstance} from "../../@types";

export default class Player extends Entity {
    constructor({x = 100, y = 100}: IPlayerInstance) {
        super({x, y, borders: {height: 96, width: 32}});
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