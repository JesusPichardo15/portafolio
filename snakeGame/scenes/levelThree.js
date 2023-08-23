import { CreateLevels } from "../components/baseFromCreateLeve.js";

export class LevelThree extends Phaser.Scene{
    constructor(){
        super({key: "levelthree"});
        this.createLevels = new CreateLevels(this,3,340,3,4);
    }

    perload(){
        this.createLevels.preload();
    }

    create(){
        this.createLevels.create();
        this.createLevels.createObstacules();
    }

    update(){
        this.createLevels.movementSnake(this.createLevels.speedBody);
        this.createLevels.moveSnakeBody();
        this.createLevels.respawnFuits();
        this.createLevels.checkCollisionWithBody();
        this.createLevels.checkCollisionWithBuild();
        this.createLevels.passLevel(2,1500);
        this.createLevels.update();
    }

    init(data){
        this.createLevels.init(data);
    }
}