import Camera from "./system/camera";
import World from "./world";
import {IPlayersList, IScreenInstance} from "../@types";

export default class Screen {
    public readonly canvas: HTMLCanvasElement;
    public readonly camera: Camera;
    public readonly world: World;
    public readonly players: IPlayersList;

    private readonly ctx: CanvasRenderingContext2D;

    constructor({camera, players, world}: IScreenInstance) {
        this.canvas = document.getElementById("screen") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");

        this.camera = camera;
        this.players = players;
        this.world = world;

        this.resize();
        this.redraw();

        for (const player of this.players) {
            player.attachToWorld(this.world);
        }

        this.canvas.addEventListener("mouseup", (event: MouseEvent) => {
            const pos = { x: Math.floor((event.x + this.camera.x) / 16), y: Math.floor((event.y + this.camera.y) / 16 ) };
            this.world.setBlock({...pos, id: 3 });
        }, false);
    }

    resize() {
        this.canvas.width = this.camera.w;
        this.canvas.height = this.camera.h;
    }

    redraw() {
        window.requestAnimationFrame(this.redraw.bind(this));
        this.clear();

        void this.world.draw({ctx: this.ctx, camera: this.camera});

        for (const [index, player] of this.players.entries()) {
            switch (index) {
                case this.camera.attachedTo:
                    this.camera.update({
                        x: player.coords.x,
                        y: player.coords.y,
                        ww: this.world.width,
                        wh: this.world.height
                    });
                    player.update();
                    player.draw({ctx: this.ctx, camera: this.camera});
                    break;
                default:
                    if (this.camera.hasFocusAt({
                        x: player.coords.x,
                        y: player.coords.y,
                        w: player.borders.width,
                        h: player.borders.height
                    })) {
                        player.update();
                        player.draw({ctx: this.ctx, camera: this.camera});
                    }
                    break;
            }
        }
    }

    clear(color: string = "rgba(92,204,229,0.55)") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}