import {ISpriteInstance} from "../../@types";

export default class Sprite {
    private readonly image: HTMLImageElement;
    private readonly x;
    private readonly y;

    constructor({ src, x, y }: ISpriteInstance) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.image) return;
        ctx.drawImage(this.image, this.x, this.y);
    }
}