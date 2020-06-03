// import { DisplayObject } from "./displayObject";
import { display } from "../engine/src/core/decorator";
import { Scene } from "../engine/src/display/scene";
import { MainScene } from "./mainScene";
import * as shark from "../engine/src/shark";

@display('ids')
export class LoadingScene extends Scene {
    // container;
    ids: string[];

    constructor(config: { [ids: string]: string }) {
        super();
        this.ids = config.ids.split(',');
        console.log(this.ids);
    }

    enter() {
        shark.resourceManager.load(this.ids);
        shark.resourceManager.complete(() => {
            console.log("loading scene completed");
            shark.sceneManager.replace('mainScene');
        })
    }
}
