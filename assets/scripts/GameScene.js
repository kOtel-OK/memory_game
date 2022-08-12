import Phaser from 'phaser';
import Card from './Card';

import * as cardsIMGS from '../sprites/*.png';
import background from '../sprites/background.jpg';

class GameScene extends Phaser.Scene {
  rows = 2; // amount of rows
  cols = 5; // amount of cols
  cardsKeys = [];

  constructor() {
    super('Game'); // run constructor of paren class

    console.log(cardsIMGS);
  }

  preload() {
    // 1. load background
    this.load.image('bg', background); // key (file name), path

    // 2. Load  card
    for (let key in cardsIMGS) {
      this.load.image(key, cardsIMGS[key]);

      if (key.match(/\d/g)) {
        this.cardsKeys.push(key);
      }
    }

    console.log(this.cardsKeys);
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

    for (let i = 0; i < this.cardsKeys.length; i++) {
      for (let j = 0; j < 2; j++) {
        this.cards.push(new Card(this, positions.pop(j), this.cardsKeys[i])); // using prefabs
      }
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
