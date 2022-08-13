import Phaser from 'phaser';

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, position, key) {
    super(scene, position.x, position.y, 'card'); // calling parent constructor and pase scene // scene, Canvas coord X, Canvas coord Y, key (from preloader)

    this.scene = scene;
    this.position = position;
    this.key = key;
    this.isOpen = false;

    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.setInteractive();
  }

  open() {
    this.isOpen = true;
    this.setTexture(this.key);
  }

  close() {
    this.isOpen = false;
    this.setTexture('card');
  }
}

export default Card;
