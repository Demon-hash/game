import Sprite from "./sprite";

import {IBlockResource} from "../../@types";

import EmptyPNG from "../../../assets/textures/blocks/empty.png";
import GrassPNG from "../../../assets/textures/blocks/grass.png";
import DirtPNG from "../../../assets/textures/blocks/dirt.png";
import StonePNG from "../../../assets/textures/blocks/stone.png";
import LeavesPNG from "../../../assets/textures/blocks/leaves.png";
import LogPNG from "../../../assets/textures/blocks/log.png";

import SandPNG from "../../../assets/textures/blocks/sand.png";

export default class ResourceManager {
    constructor() {
    }

    loadBlocks() {
        const resources: IBlockResource[] = [
            {
                name: "Air",
                sprite: new Sprite({x: 0, y: 0, src: EmptyPNG}),
                solid: false,
            },
            {
                name: "Grass",
                sprite: new Sprite({x: 0, y: 0, src: GrassPNG}),
                solid: true,
            },
            {
                name: "Dirt",
                sprite: new Sprite({x: 0, y: 0, src: DirtPNG}),
                solid: true,
            },
            {
                name: "Stone",
                sprite: new Sprite({x: 0, y: 0, src: StonePNG}),
                solid: true
            },
            {
                name: "Log",
                sprite: new Sprite({x: 0, y: 0, src: LogPNG}),
                solid: false
            },
            {
                name: "Leaves",
                sprite: new Sprite({x: 0, y: 0, src: LeavesPNG}),
                solid: false
            }
        ]
        return resources;
    }
}