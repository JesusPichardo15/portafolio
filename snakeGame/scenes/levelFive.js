import { CreateLevels } from "../components/baseFromCreateLeve.js";

export class LevelFive extends Phaser.Scene{
    
    constructor(){
        super({key : "levelfive"});
        this.createLevels = new CreateLevels(this,5,450,2,7);
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
        this.createLevels.passLevel(4,2850);
        this.createLevels.update();
  
    }

    init(score){
        this.createLevels.init(score);
    }
}