import ChunkManager from "./system/chunk-manager";
import {IBlock, IBlockData, IBlockResource, IPosition, IWorldDraw, IWorldInstance, IWorldSetBlock} from "../@types";

export default class World {
    public readonly cell: number;
    public readonly width: number;
    public readonly height: number;
    public readonly seed: string;

    private readonly resources: IBlockResource[];
    private readonly _width: number;
    private readonly _height: number;

    private readonly blocks: Uint16Array;
    private readonly chunk: ChunkManager;

    constructor({width, height, cell, manager}: IWorldInstance) {
        this.cell = cell;
        this.width = width;
        this.height = height;

        this._width = Math.floor(this.width / this.cell);
        this._height = Math.floor(this.height / this.cell);

        this.seed = 'seed';
        this.resources = manager.loadBlocks();

        this.blocks = new Uint16Array((this.width * this.height) / this.cell);

        this.chunk = new ChunkManager({world: this, width: this._width, height: this._height, seed: this.seed});
        this.chunk.generate();
    }

    isSafeBlock({x, y}: IPosition) {
        return !(x < 0 || x >= this._width || y < 0 || y >= this._height);
    }

    getBlockIndex({x, y}: IPosition): number {
        return (y * this._width) + x;
    }

    setBlock({x, y, id}: IWorldSetBlock) {
        const index = this.getBlockIndex({x, y});
        this.blocks[index] = id;
    }

    getBlockData({x, y}: IPosition): IBlockData {
        const block = this.getBlock({x, y});
        const index = this.getBlockIndex({x, y});
        return {
            ...this.resources[block],
            index
        }
    }

    getBlockDataByScreenCoords({x, y}: IPosition): IBlockData {
        const projection = this.toWorldProjection({x, y});
        const block = this.getBlock(projection);
        const index = this.getBlockIndex(projection);

        return {
            ...this.resources[block],
            index
        }
    }

    getBlock({x, y}: IPosition): number {
        return this.blocks[this.getBlockIndex({x, y})];
    }

    toWorldProjection({x, y}: IPosition): IPosition {
        return {
            x: Math.floor(x / this.cell),
            y: Math.floor(y / this.cell)
        }
    }

    toScreenProjection({x, y}: IPosition): IPosition {
        return {
            x: Math.floor(x * this.cell),
            y: Math.floor(y * this.cell)
        }
    }

    async draw({ctx, camera}: IWorldDraw) {
        const viewXBegin = Math.max(0, Math.floor((camera.x - this.cell) / this.cell));
        const viewYBegin = Math.max(0, Math.floor((camera.y - this.cell) / this.cell));
        const viewXEnd = Math.min(Math.floor((camera.x + camera.w + this.cell) / this.cell), this.width - 1);
        const viewYEnd = Math.min(Math.floor((camera.y + camera.h + this.cell) / this.cell), this.height - 1);

        for (let x: number, y: number = viewYBegin; y < viewYEnd; y++) {
            for (x = viewXBegin; x < viewXEnd; x++) {
                ctx.save();
                ctx.translate((x * this.cell) - camera.x, (y * this.cell) - camera.y);
                this.resources[this.blocks[this.getBlockIndex({x, y})]].sprite.draw(ctx);
                ctx.restore();
            }
        }
    }
}