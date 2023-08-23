import { CreateLevels } from "../components/baseFromCreateLeve.js";

export class LevelOne extends Phaser.Scene{
    
    constructor(){
        super({key : "levelOne"});
        this.createLevels = new CreateLevels(this,1,240,5,1);
    }

    preload(){
        this.createLevels.preload();

    }

    create(){
        this.createLevels.create();

    }

    update(){
        this.createLevels.movementSnake(this.createLevels.speedBody);
        this.createLevels.moveSnakeBody();
        this.createLevels.respawnFuits();
        this.createLevels.checkCollisionWithBody();
        this.createLevels.passLevel(0,350);
        this.createLevels.update();
  
    }

    init(){
        this.createLevels.init(0);
    }

    // levelTWo(passToLevelTwo){
    //     if(passToLevelTwo > 20){
    //         this.scene.start("leveltwo", this.createLevels.score);
    //     }
    // }
}