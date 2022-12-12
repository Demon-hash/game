import Sprite from "./sprite";

import {IBlockResource} from "../../@types";

import sheet from "../../../assets/textures/blocks/sheet.png";

import ResourceBuilder from "../builders/resource-builder";

export default class ResourceManager {
    constructor() {
    }

    loadBlocks(): IBlockResource[] {
        return new ResourceBuilder<IBlockResource>()
            .add({name: "Air", sprite: new Sprite({x: 0, y: 0, src: sheet, cropBox: { offset: { x: 0, y: 0 }, size: { width: 16, height: 16 } }}), solid: false})
            .add({name: "Grass", sprite: new Sprite({x: 0, y: 0, src: sheet, cropBox: { offset: { x: 16, y: 0 }, size: { width: 16, height: 16 } }}), solid: true})
            .add({name: "Dirt", sprite: new Sprite({x: 0, y: 0, src: sheet, cropBox: { offset: { x: 32, y: 0 }, size: { width: 16, height: 16 } }}), solid: true})
            .add({name: "Stone", sprite: new Sprite({x: 0, y: 0, src: sheet, cropBox: { offset: { x: 48, y: 0 }, size: { width: 16, height: 16 } }}), solid: true})
            .add({name: "Log", sprite: new Sprite({x: 0, y: 0, src: sheet, cropBox: { offset: { x: 0, y: 16 }, size: { width: 16, height: 16 } }}), solid: false})
            .add({name: "Leaves", sprite: new Sprite({x: 0, y: 0, src: sheet, cropBox: { offset: { x: 16, y: 16 }, size: { width: 16, height: 16 } }}), solid: false})
            .build();
    }
}