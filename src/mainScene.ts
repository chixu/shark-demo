// import { DisplayObject } from "./displayObject";
import { display } from "../engine/src/core/decorator";
import { Scene } from "../engine/src/display/scene";
import { Image } from "../engine/src/display/image";
import * as shark from "../engine/src/shark";
import { GameBoard } from "./gameBoard";

@display()
export class MainScene extends Scene {

    // container;

    // constructor(config: { [ids: string]: string }) {
    //     super();
    //     this.ids = config.ids.split(',');
    //     console.log(this.ids);
    // }
    gameBoard: GameBoard;
    joystick: Image;
    joystickX: number;
    joystickY: number;
    btnA: Image;
    // btnAX: number;
    btnAY: number;
    btnB: Image;
    // btnBX: number;
    btnBY: number;

    enter() {
        console.log("MainScene entered");
        console.log(this.gameBoard);
        this.joystickX = this.joystick.x;
        this.joystickY = this.joystick.y;
        // this.btnAX = this.btnA.x;
        this.btnAY = this.btnA.y;
        // this.btnBX = this.btnB.x;
        this.btnBY = this.btnB.y;
    }

    onBtnAUp() {
        this.btnA.y = this.btnAY;
        this.gameBoard.startGame();
        this.gameBoard.speedDown();
    }

    onBtnADown() {
        this.btnA.y = this.btnAY + 10;
        this.gameBoard.speedUp();
    }

    onBtnBUp() {
        this.btnB.y = this.btnBY;
        this.gameBoard.startGame();
        this.gameBoard.speedDown();

    }

    onBtnBDown() {
        this.btnB.y = this.btnBY + 10;
        this.gameBoard.speedUp();
    }

    // onBtnDown() {
    //     console.log('onbtndown');
    //     // this.gameBoard.startGame();
    //     this.gameBoard.speedUp();
    // }

    // onBtnUp() {
    //     console.log('onbtnup');
    //     this.gameBoard.startGame();
    //     this.gameBoard.speedDown();
    // }

    onUpUp() {
        this.joystick.y = this.joystickY;
    }
    onUpDown() {
        this.gameBoard.up();
        this.joystick.y = this.joystickY - 6;
    }
    onUpClick() {
        this.gameBoard.up();
    }

    onDownUp() {
        this.joystick.y = this.joystickY;
    }
    onDownDown() {
        this.gameBoard.down();
        this.joystick.y = this.joystickY + 6;
    }
    onDownClick() {
        this.gameBoard.down();
    }

    onLeftUp() {
        this.joystick.x = this.joystickX;
    }
    onLeftDown() {
        this.gameBoard.left();
        this.joystick.x = this.joystickX - 6;
    }
    onLeftClick() {
        this.gameBoard.left();
    }

    onRightUp() {
        this.joystick.x = this.joystickX;
    }
    onRightDown() {
        this.gameBoard.right();
        this.joystick.x = this.joystickX + 6;
    }
    onRightClick() {
        this.gameBoard.right();
    }
}
