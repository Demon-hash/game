import Camera from "./modules/system/camera";
import Screen from "./modules/screen";

import World from "./modules/world";
import ResourceManager from "./modules/system/resource-manager";

import {IPlayersList} from "./@types";
import {PlayerBuilder} from "./modules/builders/player-builder";

const resourceManager: ResourceManager = new ResourceManager();

const players: IPlayersList = [
    new PlayerBuilder()
        .setCoords({ x: 100, y: 100 })
        .setBorders({ width: 32, height: 96 })
        .setGravity(1)
        .setJumpAmplitude(15)
        .setSpeed(5)
        .build()
];
const world: World = new World({width: 16384, height: 8192, cell: 16, manager: resourceManager });

const camera: Camera = new Camera({ x: 0, y: 0, w: 1024, h: 768, attachedTo: 0 });
const screen: Screen = new Screen({ camera, players, world });