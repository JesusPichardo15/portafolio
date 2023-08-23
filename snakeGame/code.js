import {LevelOne} from './scenes/game.js';
import { Gameover } from './scenes/gameOver.js';
import { LevelTwo } from './scenes/levelTwo.js';
import { LevelThree } from './scenes/levelThree.js';
import { LevelFour } from './scenes/levelFour.js';
import { LevelFive } from './scenes/levelFive.js';

// Crear una instancia del juego
const config = {
    type: Phaser.AUTO,
    
    width: 908,
    height: 661,

    scene: [LevelOne,Gameover,LevelTwo,LevelThree,LevelFour,LevelFive],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);