import { CreateLevels } from "../components/baseFromCreateLeve.js";

export class LevelTwo extends Phaser.Scene{
    constructor(){
        super({key: "leveltwo"});
        this.createLevels = new CreateLevels(this,2,280,4,2);
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
        this.createLevels.passLevel(1,800);
        this.createLevels.update();
    }

    init(data){
        this.createLevels.init(data);
    }
}