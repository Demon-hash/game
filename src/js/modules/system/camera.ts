import {ICameraHasFocus, ICameraInstance, ICameraUpdate} from "../../@types";

export default class Camera {
    public x: number;
    public y: number;
    public readonly w: number;
    public readonly h: number;
    public readonly attachedTo: number;

    private bw: number;
    private bh: number;

    constructor({x, y, w, h, attachedTo}: ICameraInstance) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bw = this.x + Math.floor(this.w / 2);
        this.bh = this.y + Math.floor(this.h / 2);
        this.attachedTo = attachedTo;
    }

    update({x, y, ww, wh}: ICameraUpdate) {
        this.x = Math.min(Math.max(0, x - Math.floor(this.w / 2)), ww - this.w);
        this.y = Math.min(Math.max(0, y - Math.floor(this.h / 2)), wh - this.h);
        this.bw = Math.min(this.x + Math.floor(this.w / 2), ww - this.w);
        this.bh = Math.min(this.y + Math.floor(this.h / 2), wh - this.h);
    }

    hasFocusAt({x, y, w, h}: ICameraHasFocus): boolean {
        return (this.x <= w && x <= this.bw && this.y <= h && y <= this.bh)
    }
}