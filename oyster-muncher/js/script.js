/**
OYSTER MUNCHER
By: Keven Vaillancourt

If you are reading this, this project is currently unfinished and you're seeing code I'm sneakily trying to complete before anyone marks it!
*/

"use strict";
// The webcam
let video = undefined;
// The handpose Model
let handpose = undefined;
// The current set of predictions
let predictions = [];

let mouthType = undefined;
let mouthOpen = undefined;
let mouthClosed = undefined;

function preload() {
    mouthOpen = loadImage('assets/images/mouth_open.png');
    mouthClosed = loadImage('assets/images/mouth_closed.png');
}

function setup() {
    createCanvas(640, 480);
    // Access the webcam
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    // Load the handpose model
    handpose = ml5.handpose(video, modelReady);
    // Listen for predictions
    handpose.on('predict', function (results) {
        console.log(results);
        predictions = results;
    });
}

function modelReady() {
    console.log('Model loaded.');
}

function draw() {
    image(video, 0, 0, width, height);
    if (predictions.length > 0) {
        // Set up hand parameters
        let hand = predictions [0];
        let index = hand.annotations.indexFinger;
        let thumb = hand.annotations.thumb;
        let topClamp = index[3];
        let bottomClamp = thumb [3];
        let topClampX = topClamp[0];
        let topClampY = topClamp[1];
        let bottomClampX = bottomClamp[0];
        let bottomClampY = bottomClamp[1];
        // Debug line
        push();
        noFill();
        stroke(255,255,255);
        strokeWeight(2);
        line(bottomClampX, bottomClampY, topClampX, topClampY)
        pop();
        // Debug dots
        push();
        fill(0, 255, 0);
        noStroke();
        ellipse(bottomClampX, bottomClampY, 10, 10);
        ellipse(topClampX, topClampY, 10, 10);
        pop();

        let clampsDistance = dist(bottomClampX, bottomClampY, topClampX, topClampY);
        console.log(clampsDistance);

        if (clampsDistance <= 45) {
            mouthType = mouthClosed;
        }
        else {
            mouthType = mouthOpen;
        }

        // Clamps
        push();
        imageMode(CENTER);
        image(mouthType, ((bottomClampX + topClampX)/2), ((bottomClampY + topClampY)/2), 100, 100);
        pop();
    }
}