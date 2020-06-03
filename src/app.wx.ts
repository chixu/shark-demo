import * as shark from "../engine/src/shark";
import { SharkConfig } from "../engine/src/sharkConfig.wx";
import { DisplayObject2 } from "../engine/src/display/displayObject";
import { Rectangle } from "../engine/src/display/rectangle";
import { Circle } from "../engine/src/display/circle";
import { Image } from "../engine/src/display/image";
import { Label } from "../engine/src/display/label";
import { LangLabel } from "../engine/src/display/langLabel";
import { Container } from "../engine/src/display/container";
import { EmptyButton } from "../engine/src/display/emptyButton";
import { LoadingScene } from "./loadingScene";
import { MainScene } from "./mainScene";
import { GameBoard } from "./gameBoard";

let displays = [Rectangle, Image, LoadingScene, MainScene, Label, GameBoard, EmptyButton, LangLabel, Circle, Container];
shark.ready(() => {
    console.log('ready...');
    // let obj = shark.factory.create(Rectangle, "width:300;height:120;color:#ff0000;x:100;y:100");
    // let scene = shark.sceneManager.current;
    // scene.addChild(obj);
});
shark.run(new SharkConfig());