class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
        // initialize timer items
        this.timedEvent = null;
        this.initialTime = null;
        this.timerText = null;
        this.countUpEvent = null;
        this.bestTime = null;
        this.deathDelay = null;
        this.deathDelayProgress = null;
        // initialize text items
        this.topTitleText = null;
        this.BottomTitleText = null;
        // initialize game objects
        this.blocks = null;
        this.boundary = null;
    }

    create() {
        // initialize self
        let self = this;
        // set timers to zero
        this.initialTime = 0;
        this.bestTime = 0;
        // draw background
        this.sky = this.add.image(400, 400, 'sky');
        // add in groups for blocks and boundaries
        this.blocks = this.physics.add.staticGroup();
        this.boundary = this.physics.add.staticGroup();
        // create the block + boundary array
        this.levelArray = [];
        this.levelArray.push(0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,
                        0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,
                        0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,
                        0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,
                        0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,
                        0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,
                        0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,
                        0,2,1,1,1,0,1,0,0,0,1,1,1,0,0,1,0,0,0,1,1,0,1,2,0,
                        2,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,2,
                        2,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,2,
                        2,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,2,
                        2,0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,0,0,1,0,0,1,0,2,
                        2,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,2,
                        2,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,2,
                        2,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,2,
                        0,2,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,2,0,
                        0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,
                        0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,
                        0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,
                        0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,
                        0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,
                        0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,
                        0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0)
        this.levelArrayIndex = 0;
        // place the blocks
        for (let i = 0; i < 25; i += 1) {
            for (let j = 0; j < 25; j += 1) {
                if (this.levelArray[this.levelArrayIndex] === 1) {
                this.blocks.create(j*32+16, i*32+16, 'block');
                
            }
            else if (this.levelArray[this.levelArrayIndex] === 2) {
                this.boundary.create(j*32+16, i*32+16, 'block').setAlpha(0);;
            }
                this.levelArrayIndex++;
            }
        }
        // create block animation
        this.anims.create({
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('block', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
            showOnStart: true
        });
        // play the block animation
        for (let i = 0; i < this.blocks.children.entries.length; i ++) {
            this.blocks.children.entries[i].play('wobble');
        }
        // create the player
        player = this.physics.add.sprite(400, 100, 'flea');
        // create player physics
        player.setBounce(0.5).setDragX(500).setMaxVelocity(250, 1000);
        player.body.setGravityY(800);
        // make sure the player doesn't fall out of bounds
        player.setCollideWorldBounds(false);
        // create player animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('flea', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
            showOnStart: true
        });
        // play player animation
        player.play('idle');
        // make sure the player collides with the blocks
        this.physics.add.collider(player, this.blocks);
        // set player hitbox
        player.setBodySize(24, 24);
        // add in a delay after death
        this.deathDelay = new Phaser.Time.TimerEvent({ delay: 500 });
        this.time.addEvent(this.deathDelay);
        // add in vignette image
        this.add.image(400, 400, 'vignette');
        // handle top title screen text
        if (this.bestTime <= 0) {
            this.topTitleText = this.add.text(400, 144, 'PRESS THE ARROW KEYS TO PLAY!', {fontFamily: 'font', fontSize: 24, color: '#c27a32' }).setOrigin(0.5, 0.5);
        }
        if (this.bestTime > 0) {
            this.topTitleText = this.add.text(400, 144, 'BEST TIME : ' + this.formatTime(this.bestTime), {fontFamily: 'font', fontSize: 24, color: '#c27a32' }).setOrigin(0.5, 0.5);
        }
        // create bottom title screen text
        this.bottomTitleText = this.add.text(400, 656, 'A GAME BY: KEVEN VAILLANCOURT', {fontFamily: 'font', fontSize: 24, color: '#c27a32' }).setOrigin(0.5, 0.5);
        // create input system
        cursors = this.input.keyboard.createCursorKeys();
    }

    formatTime(seconds) {
        // minutes
        let minutes = Math.floor(seconds/60);
        // seconds
        let partInSeconds = seconds%60;
        // adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    onEvent () {
        // have timer count up upon play
        if (gameState === 'play') {
            this.initialTime += 1; // One second
            this.timerText.setText('TIME : ' + this.formatTime(this.initialTime));
        }
    }

    manageDifficulty(){
        // have block move time decrease by 10 when game starts
        if (delayTime <= 1000 && delayTime >= 150) {
            delayTime = delayTime - 10;
        }
        // have block move time decrease by 1 after reaching a certain value
        if (delayTime <= 150 && delayTime >= 1) {
            delayTime = delayTime - 1;
        }
        // make sure block move time can never be less than 1
        if (delayTime < 1) {
            delayTime = 1;
        }
        // reset block move time upon death
        if (gameState === 'title') {
            delayTime = 1000;
        }
    }

    moveTile() {
        // make sure the blocks aren't moving
        this.tileMoved = false;
        // get the block and boundary children
        let blockChildren = this.blocks.children.entries;
        let boundaryChildren = this.boundary.children.entries;
        // move blocks once in the play state
        while (this.tileMoved === false && gameState === 'play') {
            // pick a random tile
            let randomTile = Phaser.Math.RND.between(0, blockChildren.length-1);
            // pick a random direction
            let randomDirection = Phaser.Math.RND.between(0, 3);
            // if direction chosen is right
            if (randomDirection === 0) {
                // check for empty spaces
                let result = checkSpacesX(blockChildren[randomTile].x + 32, blockChildren[randomTile].y)
                if (result === false) {
                    // check for boundaries
                    let resultBoundary = checkBoundaryX(blockChildren[randomTile].x + 32, blockChildren[randomTile].y);
                    if (resultBoundary === false) {
                        // move block right
                        blockChildren[randomTile].x += 32;
                        blockChildren[randomTile].body.x += 32;
                        this.tileMoved = true;
                        let self = this;
                        this.timedEvent = this.time.addEvent({delay: delayTime, callback: function(){
                            self.moveTile();
                            self.manageDifficulty();
                        } , loop: false});
                    }
                }
            }
            // if direction chosen is left
            if (randomDirection === 1) {
                // check for empty spaces
                let result = checkSpacesX(blockChildren[randomTile].x - 32, blockChildren[randomTile].y)
                if (result === false) {
                    // check for boundaries
                    let resultBoundary = checkBoundaryX(blockChildren[randomTile].x - 32, blockChildren[randomTile].y);
                    if (resultBoundary === false) {
                        // move block left
                        blockChildren[randomTile].x -= 32;
                        blockChildren[randomTile].body.x -= 32;
                        this.tileMoved = true;
                        let self = this;
                        this.timedEvent = this.time.addEvent({delay: delayTime, callback: function(){
                            self.moveTile();
                            self.manageDifficulty();
                        } , loop: false});
                    }
                }
            }
            // if direction chosen is up
            if (randomDirection === 2) {
                // check for empty spaces
                let result = checkSpacesY(blockChildren[randomTile].y + 32, blockChildren[randomTile].x)
                if (result === false) {
                    // check for boundaries
                    let resultBoundary = checkBoundaryY(blockChildren[randomTile].y + 32, blockChildren[randomTile].x);
                    if (resultBoundary === false) {
                        // move block up
                        blockChildren[randomTile].y += 32;
                        blockChildren[randomTile].body.y += 32;
                        this.tileMoved = true;
                        let self = this;
                        this.timedEvent = this.time.addEvent({delay: delayTime, callback: function(){
                            self.moveTile();
                            self.manageDifficulty();
                        } , loop: false});
                    }
                }
            }
            // if direction chosen is down
            if (randomDirection === 3) {
                // check for empty spaces
                let result = checkSpacesY(blockChildren[randomTile].y - 32, blockChildren[randomTile].x)
                if (result === false) {
                    // check for boundaries
                    let resultBoundary = checkBoundaryY(blockChildren[randomTile].y - 32, blockChildren[randomTile].x);
                    if (resultBoundary === false) {
                        // move block down
                        blockChildren[randomTile].y -= 32;
                        blockChildren[randomTile].body.y -= 32;
                        this.tileMoved = true;
                        let self = this;
                        this.timedEvent = this.time.addEvent({delay: delayTime, callback: function(){
                            self.moveTile();
                            self.manageDifficulty();
                        } , loop: false});
                    }
                }
            }
            // check if blocks are beside horizontally
            function checkSpacesX (newPos, testY) {
                for (let i = 0; i < blockChildren.length; i++) {
                    if (blockChildren[i].x === newPos && blockChildren[i].y === testY) {
                        return true;
                    }
                }
                return false;
            }
            // check if blocks are beside vertically
            function checkSpacesY (newPos, testX) {
                for (let i = 0; i < blockChildren.length; i++) {
                    if (blockChildren[i].y === newPos && blockChildren[i].x === testX) {
                        return true;
                    }
                }
                return false;
            }
            // check if boundary is beside horizontally
            function checkBoundaryX (newPos, testY) {
                for (let i = 0; i < boundaryChildren.length; i++) {
                    if (boundaryChildren[i].x === newPos && boundaryChildren[i].y === testY) {
                        return true;
                    }
                }
                return false;
            }
            // check if boundary is beside vertically
            function checkBoundaryY (newPos, testX) {
                for (let i = 0; i < boundaryChildren.length; i++) {
                    if (boundaryChildren[i].y === newPos && boundaryChildren[i].x === testX) {
                        return true;
                    }
                }
                return false;
            }
        }
    }

    reset() {
        // initialize self
        let self = this;
        // set timer to zero
        this.initialTime = 0;
        // start death delay
        this.time.addEvent(this.deathDelay);
        // hide timer text
        this.timerText.setVisible(false);
        // reset timer text
        this.timerText.setText('TIME : ' + this.formatTime(0));
        // clear blocks and boundary
        this.blocks.clear(true, true);
        this.boundary.clear(true, true);
        // clear level array
        this.levelArrayIndex = 0;
        // reset block positions
        for (let i = 0; i < 25; i += 1) {
            for (let j = 0; j < 25; j += 1) {
                if (this.levelArray[this.levelArrayIndex] === 1) {
                this.blocks.create(j*32+16, i*32+16, 'block');
                
            }
            else if (this.levelArray[this.levelArrayIndex] === 2) {
                this.boundary.create(j*32+16, i*32+16, 'block').setAlpha(0);;
            }
                this.levelArrayIndex++;
            }
        }
        // restart block animation
        for (let i = 0; i < this.blocks.children.entries.length; i ++) {
            this.blocks.children.entries[i].play('wobble');
        }
        // reset player position
        player.x = 400;
        player.y = 0;
        // reset player velocity
        player.setVelocityX(0);
        // handle top title screen text
        if (this.bestTime <= 0) {
            this.topTitleText = this.add.text(400, 144, 'PRESS THE ARROW KEYS TO PLAY!', {fontFamily: 'font', fontSize: 24, color: '#c27a32' }).setOrigin(0.5, 0.5);
        }
        if (this.bestTime > 0) {
            this.topTitleText = this.add.text(400, 144, 'BEST TIME : ' + this.formatTime(this.bestTime), {fontFamily: 'font', fontSize: 24, color: '#c27a32' }).setOrigin(0.5, 0.5);
        }
        // make title screen text visible
        this.topTitleText.setVisible(true);
        this.bottomTitleText.setVisible(true);
        // nullify the timer
        this.timedEvent = null;
    }

    update() {
         // initialize self
        let self = this;
        // rotate background
        this.sky.rotation += 0.01;
        // start the game
        if (gameState === 'willPlay') {
            gameState = 'play';
            // make title screen text invisible
            this.topTitleText.setVisible(false);
            this.bottomTitleText.setVisible(false);
            // start the timer
            if (this.timerText === null) {
                this.timerText = this.add.text(400, 144, 'TIME : ' + this.formatTime(this.initialTime), {fontFamily: 'font', fontSize: 24, color: '#c27a32'}).setOrigin(0.5, 0.5);
                this.countUpEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
            }
            else {
                this.timerText.setVisible(true);
            }
            // start moving tiles
            this.timedEvent = this.time.addEvent({delay: delayTime, callback: function(){
                self.moveTile();
            } , loop: false});
        }
        // death condition
        if (gameState === 'play') {
            if (player.y > 900) {
                gameState = 'reset';
            }
        }
        // handle game reset delay
        if (gameState === 'title') {
            this.deathDelayProgress = this.deathDelay.getProgress();
            if (this.deathDelayProgress >= 0 && this.deathDelayProgress < 1) {
                this.input.keyboard.manager.enabled = false;
            }
            if (this.deathDelayProgress === 1) {
                this.input.keyboard.manager.enabled = true;
            }
        }
        // handle reset
        if (gameState === 'reset') {
            if (this.initialTime > this.bestTime) {
                this.bestTime = this.initialTime;
            }
            this.reset();
            gameState = 'title';

        }
        // handle moving left
        if (cursors.left.isDown)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play') {
                player.setAccelerationX(-500);
            }
        }
        // handle moving right
        else if (cursors.right.isDown)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play') {
                player.setAccelerationX(500);
            }
        }
        // handle not moving
        else
        {
            player.setAccelerationX(0);

        }
        // handle pressing up
        if (cursors.up.isDown)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play' && player.body.touching.down) {
                player.setVelocityY(-800);
            }
        }
        // handle pressing down
        else if (cursors.down.isDown)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play' && player.body.touching.down) {
                player.setVelocityY(-300);
            }
        }
        // handle constant bouncing
        else if (player.body.touching.down)
        {
            player.setVelocityY(-400);
        }
    }
}