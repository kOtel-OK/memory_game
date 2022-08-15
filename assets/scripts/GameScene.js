import Phaser, { Utils } from 'phaser';
import WebFontFile from './WebFontFile';
import Card from './Card';
import * as Constants from './constants';

import * as cardsIMGS from '../sprites/*.png';
import sounds from 'url:../sounds/*.mp3';

import background from '../sprites/background.jpg';

class GameScene extends Phaser.Scene {
  rows = 2; // amount of rows
  cols = 5; // amount of cols
  cardsKeys = [];
  soundKeys = [];
  gameCounter = 0;
  timeOut = Constants.TIMEOUT;

  constructor() {
    super(); // run constructor of paren class
    console.log(Constants);
  }

  preload() {
    console.log(this.game.config);

    // 1. Load font
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));

    // 2. load background
    this.load.image('bg', background); // key (file name), path

    // 3. Load  cards
    for (let key in cardsIMGS) {
      this.load.image(key, cardsIMGS[key]);

      if (key.match(/\d/g)) {
        this.cardsKeys.push(key);
      }
    }

    // 4. Load sounds
    for (let key in sounds) {
      this.load.audio(key, sounds[key]);
      this.soundKeys.push(key);
    }
  }

  create() {
    this.createBackground();
    this.createText();
    this.createCards();
    this.createSounds();
    this.gameStart();
  }

  gameStart() {
    const positions = this.getCardPositions();

    this.cards.forEach((el, idx) => {
      if (this.gameCounter) el.close();

      el.setCardOnPosition(positions.pop(), idx * 100);
    });
    // this.playSound('theme', 0.1, true);
    this.createTimer();
  }

  gameStop() {
    this.time.removeEvent(this.timeOutEvent);
    this.gameCounter++;
    this.timeOut = Constants.TIMEOUT;
  }

  createBackground() {
    // Display backgound on Canvas
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0); // Canvas coord X, Canvas coord Y, key (from preloader)
  }

  createText() {
    this.timeoutText = this.add.text(20, 350, `Time:${this.timeOut}`, {
      fontFamily: '"Press Start 2P"', //For fonts with spaces in the name we need to include double quotes
      fontSize: '16px',
    });
  }

  createSounds() {
    // Adding 5 sounds to object
    // {card, complete, success, theme, timeout}
    this.sounds = {};
    this.soundKeys.forEach(el => (this.sounds[el] = this.sound.add(el)));
  }

  playSound(key, vol, loop) {
    this.sounds[key].play({
      volume: vol,
      loop: loop,
    });
  }

  onTimerTick() {
    if (this.timeOut <= 0) {
      this.playSound('timeout');
      this.gameStop();
      this.gameStart();
    }

    this.timeoutText.setText(`Time:${this.timeOut}`);
    this.timeOut--;
  }

  createTimer() {
    this.timeOutEvent = this.time.addEvent({
      delay: 1000, // Callback delaying in ms
      loop: true,
      callback() {
        this.onTimerTick();
      },
      callbackScope: this, // Pointer to outer this
    });
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
        this.playSound('success');
        card.open();

        this.openedCard = null;
      } else {
        this.playSound('card');
        card.open();

        setTimeout(function () {
          card.close();
        }, 500);

        this.openedCard.close();
        this.openedCard = null;
      }
    } else {
      this.openedCard = card;
      this.playSound('card');
      card.open();
    }

    // check if all cards opened
    if (this.cards.every(el => el.isOpen)) {
      this.playSound('complete');
      this.gameStop();
      this.gameStart();
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
