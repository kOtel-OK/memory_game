import Phaser, { Scene } from 'phaser';

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, key) {
    super(scene, 0, 0, 'card'); // calling parent constructor and pase scene // scene, Canvas coord X, Canvas coord Y, key (from preloader)

    this.scene = scene;
    this.key = key;
    this.isOpen = false;

    this.scene.add.existing(this);
    this.setInteractive();
  }

  open() {
    this.isOpen = true;
    this.flip(this.key);
  }

  close() {
    this.isOpen = false;
    this.flip('card');
  }

  flip(texture) {
    this.scene.tweens.add({
      targets: this, // GameObjects for animation
      scaleX: 0, // Property wich we should change and value
      ease: 'linear', // Type of animation
      duration: 250, // Duration of animation in ms
      onComplete: () => {
        this.show(texture);
      },
    });
  }

  show(texture) {
    this.setTexture(texture);

    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: 'linear',
      duration: 250,
    });
  }
}

export default Card;
