import {createNoise2D} from "simplex-noise";
import Alea from "alea";
import World from "../world";
import {IChunkManagerInstance} from "../../@types";

export default class ChunkManager {
    private readonly world: World;
    private readonly width: number;
    private readonly height: number;
    private readonly seed: string;

    constructor({world, width, height, seed}: IChunkManagerInstance) {
        this.world = world;
        this.width = width;
        this.height = height;
        this.seed = seed;
    }

    amplitude(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    smooth(x: number, y: number, frequency: number): number {
        const noise2D = createNoise2D(Alea(this.seed));
        return (noise2D(x, y - 1) + noise2D(x, y) + noise2D(x, y + 1)) / frequency;
    }

    generate() {
        const level: number = 96;
        let lastTree = 0;

        for (let range: number, z: number, freq: number = Math.floor(this.width / 2), y: number = level, x: number = 0; x < this.width; x++) {
            range = this.amplitude(-1, 1);
            y += Math.floor(this.smooth(x, y, freq)) * range;

            if(x >= lastTree) {
                for (z = 0; z < 18; z++) {
                    this.world.setBlock({x, y: y - (1 + z), id: 4});
                }
                lastTree += 6 + Math.floor(Math.random() * 18);
            }

            this.world.setBlock({x, y, id: 1});

            for (z = 0; z < this.height; z++) {
                this.world.setBlock({x, y: y + 1 + z, id: (z >= 16) ? 3 : 2});
            }
        }
    }
}