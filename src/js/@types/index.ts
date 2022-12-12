import Camera from "../modules/system/camera";
import World from "../modules/world";
import ResourceManager from "../modules/system/resource-manager";
import Player from "../modules/entity/player";
import Sprite from "../modules/system/sprite";

export interface ISpriteCropBox {
    offset: IPosition;
    size: ISpriteBorders;
}

export interface ISpriteInstance {
    src: string;
    x: number;
    y: number;
    cropBox?: ISpriteCropBox;
    w?: number;
    h?: number;
}

export interface ISpriteBorders {
    width: number;
    height: number;
}

export interface IPosition {
    x: number;
    y: number;
}

export type IProjection = IPosition;

export interface IVelocity {
    x: number;
    y: number;
}

export interface IScreenInstance {
    camera: Camera;
    players: IPlayersList;
    world: World;
}

export interface IModel {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

export interface IBlock {
    id: number;
    projection: {
        world: IProjection;
        screen: IProjection;
        model: IModel;
        size: ISpriteBorders;
    };
}

export interface IBlockResource {
    name: string;
    sprite: Sprite | null;
    solid: boolean;
}

export interface IBlockData extends IBlockResource {
    index: number;
}

export interface IWorldInstance {
    width: number;
    height: number;
    cell: number;
    manager: ResourceManager;
}

export interface IWorldSetBlock extends IPosition {
    id: number;
}

export interface IWorldDraw {
    ctx: CanvasRenderingContext2D;
    camera: Camera;
}

export interface IWorldBoundaries {
    width: number;
    height: number;
}

export interface IChunkManagerInstance {
    world: World;
    width: number;
    height: number;
    seed: string;
}

export interface IEntityInstance extends IPosition {
    coords?: IPosition;
    borders?: ISpriteBorders;
    speed?: number;
    jumpVelocity?: number;
    gravity?: number;
}

export type IPlayersList = Player[];

export interface IPlayerDraw {
    ctx: CanvasRenderingContext2D;
    camera: Camera;
}

export interface ICameraInstance {
    x: number;
    y: number;
    w: number;
    h: number;
    attachedTo: number;
}

export interface ICameraUpdate {
    x: number;
    y: number;
    ww: number;
    wh: number;
}

export interface ICameraHasFocus {
    x: number;
    y: number;
    w: number;
    h: number;
}