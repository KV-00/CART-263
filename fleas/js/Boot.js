class Boot extends Phaser.Scene {
    constructor() {
      super({
        key: `boot`
      });
    }
    // preload sprites
    preload() {
      this.load.on(`complete`, () => {
        this.scene.start(`play`);
      });

      this.load.image('sky', 'assets/images/sky.png');
      this.load.image('vignette', 'assets/images/vignette.png');
      this.load.spritesheet('block',
      'assets/images/block.png',
      { frameWidth: 32, frameHeight: 32 }
      );
      this.load.spritesheet('flea',
      'assets/images/flea.png',
      { frameWidth: 32, frameHeight: 32 }
      );
    }
  }