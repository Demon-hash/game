import {ISpriteCropBox, ISpriteInstance} from "../../@types";

export default class Sprite {
    private readonly image: HTMLImageElement;
    private readonly x: number;
    private readonly y: number;
    private width: number;
    private height: number;
    private cropBox: ISpriteCropBox;

    constructor({src, x, y, cropBox}: ISpriteInstance) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;

        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;

            this.cropBox = {
                offset: {
                    x: cropBox?.offset?.x ?? 0,
                    y: cropBox?.offset?.y ?? 0,
                },
                size: {
                    width: cropBox?.size?.width ?? this.width,
                    height: cropBox?.size?.height ?? this.height
                }
            };
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.image || this.cropBox == null) return;
        ctx.drawImage(
            this.image,
            this.cropBox.offset.x,
            this.cropBox.offset.y,
            this.cropBox.size.width,
            this.cropBox.size.height,
            this.x,
            this.y,
            this.cropBox.size.width,
            this.cropBox.size.height
        );
    }
}