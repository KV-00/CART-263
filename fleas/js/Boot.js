class Boot extends Phaser.Scene {
    constructor() {
      super({
        key: `boot`
      });
    }

    preload() {
      this.load.on(`complete`, () => {
        this.scene.start(`play`);
      });

      this.load.image('sky', 'assets/images/sky.png');
      this.load.image('vignette', 'assets/images/vignette.png');
      this.load.image('block', 'assets/images/block.png');
      this.load.image('star', 'assets/images/clown.png');
      this.load.image('bomb', 'assets/images/clown.png');
      this.load.image('flea', 'assets/images/flea.png');
    }
  
    create() {
  
    }
  
    update() {
  
    }
  
  }