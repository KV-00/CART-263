/**
FLEAS!
By: Keven Vaillancourt

Submission for the CART 263 game engine jam!

The platformer portion of the project, was based on code from the phaser 3 tutorial https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
The timer code used was modified from https://phaser.discourse.group/t/countdown-timer/2471/2

KNOWN BUGS:
- The flea may *occasionally* become stuck on blocks when pressing against them (not that big of an issue)
- The death delay will not work if the player is holding any of the arrow keys upon the moment of death
- the game's font will for some reason refuse to load properly on the title screen (some kind of cache issue)
*/

"use strict";
// configurate
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: `arcade`,
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [Boot, Play]
  };
  
let game = new Phaser.Game(config);
// initialize the input system
let cursors;
// initialize the delay time
let delayTime = 1000;
// set game state to the title screen once the game boots
let gameState = 'title';
// initialize the player
let player;
