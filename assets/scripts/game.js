import Phaser from 'phaser';

const scene = new Phaser.Scene('Game');

scene.preload = function () {
  // 1. load background
  const background = require('../sprites/background.jpg');
  this.load.image('bg', background); // key (file name), path
  // 2. Load back part of card
  const cardBack = require('../sprites/card.png');
  this.load.image('card', cardBack);
};

scene.create = function () {
  // Display backgound on Canvas
  this.add.sprite(0, 0, 'bg').setOrigin(0, 0); // Canvas coord X, Canvas coord Y, key (from preloader)

  const positions = this.getCardPositions();

  for (let el of positions) {
    this.add.sprite(el.x, el.y, 'card').setOrigin(0, 0); // Canvas coord X, Canvas coord Y, key (from preloader)
  }

  console.log(this);
};

scene.getCardPositions = function () {
  const { width, height, rows, cols } = config;

  const cardTexture = this.textures.get('card').getSourceImage();
  const margin = 5;

  const cardWidth = cardTexture.width + margin;
  const cardHight = cardTexture.height + margin;

  const offsetX = (width - cardWidth * cols) / 2;
  const offsetY = (height - cardHight * rows) / 2;

  const positions = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      positions.push({
        x: offsetX + cardWidth * j,
        y: offsetY + cardHight * i,
      });
    }
  }

  return positions;
};

const config = {
  type: Phaser.AUTO, // use webGL if possible, if no - canvas
  width: 1280, // width of Canvas (should take from background size)
  height: 720, // height of Canvas
  scene: scene, // game scene
  rows: 2, // amount of rows
  cols: 5, // amount of cols
};

const game = new Phaser.Game(config);
