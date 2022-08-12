import Phaser from 'phaser';
import Card from './Card';

class GameScene extends Phaser.Scene {
  rows = 2; // amount of rows
  cols = 5; // amount of cols

  constructor() {
    super('Game'); // run constructor of paren class
  }

  preload() {
    // 1. load background
    const background = require('../sprites/background.jpg');
    this.load.image('bg', background); // key (file name), path
    // 2. Load back part of card
    const cardBack = require('../sprites/card.png');
    this.load.image('card', cardBack);
  }

  create() {
    this.createBackground();
    this.createCards();
  }

  createBackground() {
    // Display backgound on Canvas
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0); // Canvas coord X, Canvas coord Y, key (from preloader)
  }

  createCards() {
    // Display cards on canvas
    this.cards = [];
    const positions = this.getCardPositions();

    for (let [idx, el] of positions.entries()) {
      this.cards.push(new Card(this, el));
    }
  }

  getCardPositions() {
    const { width, height } = this.sys.game.config;

    const cardTexture = this.textures.get('card').getSourceImage();
    const margin = 5;

    const cardWidth = cardTexture.width + margin;
    const cardHight = cardTexture.height + margin;

    const offsetX = (width - cardWidth * this.cols) / 2;
    const offsetY = (height - cardHight * this.rows) / 2;

    const positions = [];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        positions.push({
          x: offsetX + cardWidth * j,
          y: offsetY + cardHight * i,
        });
      }
    }

    return positions;
  }
}

export default GameScene;
