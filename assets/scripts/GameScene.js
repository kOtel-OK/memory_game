import Phaser, { Utils } from 'phaser';
import Card from './Card';

import * as cardsIMGS from '../sprites/*.png';
import background from '../sprites/background.jpg';

class GameScene extends Phaser.Scene {
  rows = 2; // amount of rows
  cols = 5; // amount of cols
  cardsKeys = [];

  constructor() {
    super('Game'); // run constructor of paren class
  }

  preload() {
    // 1. load background
    this.load.image('bg', background); // key (file name), path

    // 2. Load  cards
    for (let key in cardsIMGS) {
      this.load.image(key, cardsIMGS[key]);

      if (key.match(/\d/g)) {
        this.cardsKeys.push(key);
      }
    }
  }

  create() {
    this.createBackground();
    this.createCards();
    this.start();
  }

  start() {
    const positions = this.getCardPositions();

    this.cards.forEach(el => {
      let position = positions.pop();

      el.close();
      el.setPosition(position.x, position.y);
    });
  }

  createBackground() {
    // Display backgound on Canvas
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0); // Canvas coord X, Canvas coord Y, key (from preloader)
  }

  createCards() {
    // Display cards on canvas
    this.cards = [];

    for (let i = 0; i < this.cardsKeys.length; i++) {
      for (let j = 0; j < 2; j++) {
        this.cards.push(new Card(this, this.cardsKeys[i])); // using prefabs
      }
    }

    // listen to all interactive objects
    this.input.on('gameobjectdown', this.onCardClick.bind(this));
  }

  onCardClick(pointer, card) {
    // card - object which has been clicked
    if (card.isOpen) return false;

    if (this.openedCard) {
      if (this.openedCard.key === card.key) {
        card.open();
        this.openedCard = null;
      } else {
        card.open();

        setTimeout(function () {
          card.close();
        }, 500);

        this.openedCard.close();
        this.openedCard = null;
      }
    } else {
      this.openedCard = card;
      card.open();
    }

    // check if all cards opened
    if (this.cards.every(el => el.isOpen)) {
      this.start();
    }
  }

  getCardPositions() {
    const { width, height } = this.sys.game.config;

    const cardTexture = this.textures.get('card').getSourceImage();
    const margin = 5;

    const cardWidth = cardTexture.width + margin;
    const cardHight = cardTexture.height + margin;

    const offsetX = (width - cardWidth * this.cols) / 2 + cardWidth / 2;
    const offsetY = (height - cardHight * this.rows) / 2 + cardHight / 2;

    const positions = [];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        positions.push({
          x: offsetX + cardWidth * j,
          y: offsetY + cardHight * i,
        });
      }
    }

    return Phaser.Utils.Array.Shuffle(positions); // Ramdomly shuffling the array with Phaser.Utils
  }
}

export default GameScene;
