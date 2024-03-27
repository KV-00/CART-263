class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
        this.timedEvent = null;
        this.initialTime = null;
        this.timerText = null;
        this.countUpEvent = null;
        this.container = null;
        this.topTitleText = null;
        this.BottomTitleText = null;
        this.blocks = null;
        this.boundary = null;
    }

    create() {
        let self = this;

        this.initialTime = 0;

        this.add.image(400, 400, 'sky');

        this.blocks = this.physics.add.staticGroup();
        this.boundary = this.physics.add.staticGroup();

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

        this.anims.create({
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('block', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
            showOnStart: true
        });

        for (let i = 0; i < this.blocks.children.entries.length; i ++) {
            this.blocks.children.entries[i].play('wobble');
        }

        player = this.physics.add.sprite(400, 100, 'flea');

        player.setBounce(0.5);
        player.setCollideWorldBounds(false);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('flea', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
            showOnStart: true
        });

        player.play('idle');

        player.body.setGravityY(800)

        this.physics.add.collider(player, this.blocks);
        player.setBodySize(24, 24);

        this.add.image(400, 400, 'vignette');

        this.topTitleText = this.add.text(400, 144, 'PRESS THE ARROW KEYS TO PLAY!', {fontFamily: 'font', fontSize: 24, color: '#c27a32' }).setOrigin(0.5, 0.5);
        this.bottomTitleText = this.add.text(400, 656, 'A GAME BY: KEVEN VAILLANCOURT', {fontFamily: 'font', fontSize: 24, color: '#c27a32' }).setOrigin(0.5, 0.5);

        cursors = this.input.keyboard.createCursorKeys();
    }

    formatTime(seconds) {
        // Minutes
        let minutes = Math.floor(seconds/60);
        // Seconds
        let partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    onEvent () {
        if (gameState === 'play') {
            this.initialTime += 1; // One second
            this.timerText.setText('TIME : ' + this.formatTime(this.initialTime));
        }
    }

    manageDifficulty(){
        if (delayTime <= 1000 && delayTime >= 150) {
            delayTime = delayTime - 10;
        }

        if (delayTime <= 150 && delayTime >= 1) {
            delayTime = delayTime - 1;
        }

        if (delayTime < 0.01) {
            delayTime = 0.01;
        }
    }

    moveTile() {
        this.tileMoved = false;
        let blockChildren = this.blocks.children.entries;
        let boundaryChildren = this.boundary.children.entries;
        while (this.tileMoved === false && gameState === 'play') {
            let randomTile = Phaser.Math.RND.between(0, blockChildren.length-1);
            let randomDirection = Phaser.Math.RND.between(0, 3);

            if (randomDirection === 0) {
                let result = checkSpacesX(blockChildren[randomTile].x + 32, blockChildren[randomTile].y)
                if (result === false) {
                    let resultBoundary = checkBoundaryX(blockChildren[randomTile].x + 32, blockChildren[randomTile].y);
                    if (resultBoundary === false) {
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
            if (randomDirection === 1) {
                let result = checkSpacesX(blockChildren[randomTile].x - 32, blockChildren[randomTile].y)
                if (result === false) {
                    let resultBoundary = checkBoundaryX(blockChildren[randomTile].x - 32, blockChildren[randomTile].y);
                    if (resultBoundary === false) {
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
            if (randomDirection === 2) {
                let result = checkSpacesY(blockChildren[randomTile].y + 32, blockChildren[randomTile].x)
                if (result === false) {
                    let resultBoundary = checkBoundaryY(blockChildren[randomTile].y + 32, blockChildren[randomTile].x);
                    if (resultBoundary === false) {
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
            if (randomDirection === 3) {
                let result = checkSpacesY(blockChildren[randomTile].y - 32, blockChildren[randomTile].x)
                if (result === false) {
                    let resultBoundary = checkBoundaryY(blockChildren[randomTile].y - 32, blockChildren[randomTile].x);
                    if (resultBoundary === false) {
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

            function checkSpacesX (newPos, testY) {
                for (let i = 0; i < blockChildren.length; i++) {
                    if (blockChildren[i].x === newPos && blockChildren[i].y === testY) {
                        return true;
                    }
                }
                return false;
            }

            function checkSpacesY (newPos, testX) {
                for (let i = 0; i < blockChildren.length; i++) {
                    if (blockChildren[i].y === newPos && blockChildren[i].x === testX) {
                        return true;
                    }
                }
                return false;
            }

            function checkBoundaryX (newPos, testY) {
                for (let i = 0; i < boundaryChildren.length; i++) {
                    if (boundaryChildren[i].x === newPos && boundaryChildren[i].y === testY) {
                        return true;
                    }
                }
                return false;
            }

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
        let self = this;

        this.initialTime = 0;
        this.timerText.setVisible(false);

        this.timerText.setText('TIME : ' + this.formatTime(0));

        this.blocks.clear(true, true);
        this.boundary.clear(true, true);

        this.levelArrayIndex = 0;

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
        for (let i = 0; i < this.blocks.children.entries.length; i ++) {
            this.blocks.children.entries[i].play('wobble');
        }

        player.x = 400;
        player.y = 100;

        this.topTitleText.setVisible(true);
        this.bottomTitleText.setVisible(true);

        this.timedEvent = null;
    }

    update() {
        let self = this;
        if (gameState === 'willPlay') {
        gameState = 'play';
        this.topTitleText.setVisible(false);
        this.bottomTitleText.setVisible(false);
        if (this.timerText === null) {
            this.timerText = this.add.text(400, 144, 'TIME : ' + this.formatTime(this.initialTime), {fontFamily: 'font', fontSize: 24, color: '#c27a32'}).setOrigin(0.5, 0.5);
            this.countUpEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        }
        else {
            this.timerText.setVisible(true);
        }
        this.timedEvent = this.time.addEvent({delay: delayTime, callback: function(){
            self.moveTile();
        } , loop: false});
        }

        if (gameState === 'play') {
            if (player.y > 900) {
                gameState = 'reset';
            }
        }

        if (gameState === 'reset') {
            this.reset();
            gameState = 'title';
        }

        if (cursors.left.isDown)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play') {
                player.setVelocityX(-250);
            }
        }
        else if (cursors.right.isDown)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play') {
                player.setVelocityX(250);
            }
        }
        else
        {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play') {
                player.setVelocityY(-800);
            }
        }
        else if (cursors.down.isDown && player.body.touching.down)
        {
            if (gameState === 'title') {
                gameState = 'willPlay';
            }
            if (gameState === 'play') {
                player.setVelocityY(-300);
            }
        }
        else if (player.body.touching.down)
        {
            player.setVelocityY(-400);
        }
    }
}