import { CreateLevels } from "../components/baseFromCreateLeve.js";

export class LevelFour extends Phaser.Scene{
    
    constructor(){
        super({key : "levelfour"});
        this.createLevels = new CreateLevels(this,4,400,3,6);
    }

    preload(){
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
        this.createLevels.passLevel(3,2200);
        this.createLevels.update();
  
    }

    init(score){
        this.createLevels.init(score);
    }
}