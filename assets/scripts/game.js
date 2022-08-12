import Phaser from 'phaser';

const scene = new Phaser.Scene('Game');

scene.preload = function () {
  // 1. load background
  const background = require('../sprites/background.jpg');
  this.load.image('bg', background); // key (file name), path
};

scene.create = function () {
  this.add.sprite(0, 0, 'bg'); // Canvas coord X, Canvas coord Y, key (from preloader)
  // 2. Display backgound on Canvas
};

const config = {
  type: Phaser.AUTO, // use webGL if possible, if no - canvas
  width: 1280, // width of Canvas (should take from background size)
  height: 720, // height of Canvas
  scene: scene, // game scene
};

const game = new Phaser.Game(config);
