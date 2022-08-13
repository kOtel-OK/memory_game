import Phaser from 'phaser';

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, position, key) {
    super(scene, position.x, position.y, 'card'); // calling parent constructor and pase scene // scene, Canvas coord X, Canvas coord Y, key (from preloader)

    this.scene = scene;
    this.position = position;
    this.key = key;

    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.setInteractive();

    this.on('pointerdown', this.open);
  }

  open() {
    this.setTexture(this.key);
  }
}

export default Card;
