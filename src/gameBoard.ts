import * as shark from "../engine/src/shark";
import { Rectangle } from "../engine/src/display/rectangle";
import { LangLabel } from "../engine/src/display/langLabel";
import { DisplayObject2 } from "../engine/src/display/displayObject";
import { display } from "../engine/src/core/decorator";

export enum Direction {
    Left, Right, Up, Down
}

@display()
export class GameBoard extends DisplayObject2 {

    numRows = 15;
    numCols = 15;
    tileSize = 25;
    snake: number[][];
    food;
    direction: Direction = Direction.Right;
    speed = 300;
    started: boolean;
    timer;
    message: LangLabel;
    gameContainer: DisplayObject2;

    // constructor(config) {
    //     super(config);
    //     console.log("GameBoard: true");


    //     // shark.eventBus.on('key-s', ()=>this.direction = Direction.Down);
    // }

    public startGame() {
        if (!this.started) {

            this.message.value = shark.config.isMobile ? "" : "{{gamedescweb}}";
            this.update();
            this.started = true;
        }
    }

    public speedUp() {
        this.speed = 100;
    }

    public speedDown() {
        this.speed = 300;
    }

    public up() {
        if (this.direction != Direction.Down) this.direction = Direction.Up
    }

    public down() {
        if (this.direction != Direction.Up) this.direction = Direction.Down
    }

    public left() {
        if (this.direction != Direction.Right) this.direction = Direction.Left
    }

    public right() {
        if (this.direction != Direction.Left) this.direction = Direction.Right
    }

    public spaceUp() {
        this.startGame();
        this.speedUp();
    }

    public spaceDown() {
        this.startGame();
        this.speedDown();
    }

    init() {
        this.gameContainer.removeChildren();
        this.speed = 300;
        this.started = false;
        this.snake = [[Math.floor(this.numCols / 2), Math.floor(this.numRows / 2)]];
        this.generateFood();
    }

    gameOver() {
        clearTimeout(this.timer);
        this.message.value = "{{gameover}}";
        this.init();
    }

    update() {
        // console.log('update ', this.snake, this.food);
        this.gameContainer.removeChildren();
        let newHead = this.move(this.snake[0]);
        this.snake.length - 1;
        if (this.inBound(newHead) && !this.hitSnake(newHead)) {
            if (newHead[0] == this.food[0] && newHead[1] == this.food[1]) {
                this.generateFood();
            } else
                this.snake.pop();
            this.snake.unshift(newHead);
            this.drwaSnake();
            this.drwaFood();
            this.timer = setTimeout(() => this.update(), this.speed);
        } else {
            this.gameOver();
        }
    }

    inBound(cords) {
        return cords[0] >= 0 && cords[0] < this.numRows && cords[1] >= 0 && cords[1] < this.numCols;
    }

    hitSnake(cords) {
        for (let i = 0; i < this.snake.length - 1; i++)
            if (cords[0] == this.snake[i][0] && cords[1] == this.snake[i][1])
                return true;
        return false;
    }

    move(cords) {
        if (this.direction == Direction.Left)
            return [cords[0], cords[1] - 1];
        else if (this.direction == Direction.Right)
            return [cords[0], cords[1] + 1];
        else if (this.direction == Direction.Up)
            return [cords[0] - 1, cords[1]];
        else if (this.direction == Direction.Down)
            return [cords[0] + 1, cords[1]];
    }

    generateFood() {
        let r = Math.floor(Math.random() * this.numRows);
        let c = Math.floor(Math.random() * this.numCols);
        while (this.isOverlap(r, c)) {
            r = Math.floor(Math.random() * this.numRows);
            c = Math.floor(Math.random() * this.numCols);
        }
        this.food = [r, c];
    }

    isOverlap(r, c) {
        for (let k in this.snake) {
            if (this.snake[k][0] == r && this.snake[k][1] == c)
                return true;
        }
        return false;
    }

    drwaFood() {
        this.drwaTile(this.food, "#FF3333");
    }

    drwaSnake() {
        for (let k in this.snake) {
            this.drwaTile(this.snake[k]);
        }
    }

    drwaTile(cords: number[], color = "#999999") {
        let tile = shark.factory.create(Rectangle, `height:${this.tileSize};width:${this.tileSize};color:${color};x:${cords[1] * this.tileSize};y:${cords[0] * this.tileSize}`)
        this.gameContainer.addChild(tile);
    }

    public created(scene) {
        super.created(scene);
        if (this.config.numRows)
            this.numRows = parseInt(this.config.numRows);
        if (this.config.numCols)
            this.numCols = parseInt(this.config.numCols);
        let color = this.config.bgcolor || "#bedf62";
        let bg = shark.factory.create(Rectangle, `height:${this.tileSize * this.numRows};width:${this.tileSize * this.numCols};color:${color}`);
        this.addChild(bg);
        this.gameContainer = new DisplayObject2({});
        this.addChild(this.gameContainer);
        this.init();
        shark.eventBus.on('key-up-w', this.up, this);
        shark.eventBus.on('key-up-s', this.down, this);
        shark.eventBus.on('key-up-a', this.left, this);
        shark.eventBus.on('key-up-d', this.right, this);
        shark.eventBus.on('key-down- ', this.spaceUp, this);
        shark.eventBus.on('key-up- ', this.spaceDown, this);
    }

}