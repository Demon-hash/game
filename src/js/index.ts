import Camera from "./modules/system/camera";
import Screen from "./modules/screen";

import Player from "./modules/entity/player";
import World from "./modules/world";
import ResourceManager from "./modules/system/resource-manager";

import {IPlayersList} from "./@types";

const resourceManager: ResourceManager = new ResourceManager();

const players: IPlayersList = [new Player({x: 0, y: 100})];
const world: World = new World({width: 16384, height: 8192, cell: 16, manager: resourceManager });

const camera: Camera = new Camera({ x: 0, y: 0, w: 1024, h: 768, attachedTo: 0 });
const screen: Screen = new Screen({ camera, players, world });