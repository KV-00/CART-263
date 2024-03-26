class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
        this.timedEvent = null;
        this.container = null;
    }

    create() {
        let self = this;
        this.timedEvent = this.time.addEvent({delay: delayTime, callback: function(){
            self.moveTile();
        } , loop: false});

        this.add.image(400, 400, 'sky');

        blocks = this.physics.add.staticGroup();
        boundary = this.physics.add.staticGroup();

        let levelArray = [];
        levelArray.push(0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,
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
        let levelArrayIndex = 0;

        for (let i = 0; i < 25; i += 1) {
            for (let j = 0; j < 25; j += 1) {
                if (levelArray[levelArrayIndex] === 1) {
                blocks.create(j*32+16, i*32+16, 'block');
            }
            else if (levelArray[levelArrayIndex] === 2) {
                boundary.create(j*32+16, i*32+16, 'block').setAlpha(0);;
            }
                levelArrayIndex++;
            }
        }
        player = this.physics.add.sprite(400, 100, 'flea');

        player.setBounce(0.5);
        player.setCollideWorldBounds(true);

        player.body.setGravityY(800)

        this.physics.add.collider(player, blocks);
        player.setBodySize(24, 24);

        this.add.image(400, 400, 'vignette');

        cursors = this.input.keyboard.createCursorKeys();
    }

    moveTile() {
        this.tileMoved = false;
        let blockChildren = blocks.children.entries;
        let boundaryChildren = boundary.children.entries;
        while (this.tileMoved === false) {
            let randomTile = Phaser.Math.RND.between(0, blockChildren.length-1);
            let randomDirection = Phaser.Math.RND.between(0, 3);
            console.log(randomDirection);

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

    update() {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-250);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(250);
        }
        else
        {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-800);
        }
        else if (player.body.touching.down)
        {
            player.setVelocityY(-400);
        }
    }
}