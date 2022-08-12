import Phaser from 'phaser';
import GameScene from './GameScene';

const config = {
  type: Phaser.AUTO, // use webGL if possible, if no - canvas
  width: 1280, // width of Canvas (should take from background size)
  height: 720, // height of Canvas
  scene: new GameScene(), // game scene
};

const game = new Phaser.Game(config);
