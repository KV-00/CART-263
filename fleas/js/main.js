/**
FLEAS!
By: Keven Vaillancourt
*/

"use strict";

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

let cursors;

let delayTime = 1000;

let gameState = 'title';

let player;
