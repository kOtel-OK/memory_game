import Phaser from 'phaser';

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, position, key) {
    super(scene); // calling parent constructor and pase scene

    this.scene = scene;
    this.position = position;

    this.scene.add
      .sprite(this.position.x, this.position.y, key)
      .setOrigin(0, 0); // Canvas coord X, Canvas coord Y, key (from preloader)
  }
}

export default Card;
