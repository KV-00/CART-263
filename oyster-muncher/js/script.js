/**
OYSTER MUNCHER
By: Keven Vaillancourt
*/

"use strict";
// The webcam
let video = undefined;
// The handpose Model
let handpose = undefined;
// The facemesh Model
let facemesh;
// The current set of hand predictions
let handPredictions = [];
// The current set of face predictions
let facePredictions = [];
// The mouth graphics
let mouthType = undefined;
let mouthOpen = undefined;
let mouthClosed = undefined;
// The clamp graphics
let clampType = undefined;
let clampOpen = undefined;
let clampClosed = undefined;
let clampHold = undefined;
// The oyster graphics
let oysterType = undefined;
let oysterOpen = undefined;
let oysterClosed = undefined;
let oysterShell = undefined;
// The oyster
let oyster = undefined;
let oysterSpawnPoints = [170, 320, 470];

function preload() {
    // Load mouth graphics
    mouthOpen = loadImage('assets/images/mouth_open.png');
    mouthClosed = loadImage('assets/images/mouth_closed.png');
    // Load clamp graphics
    clampOpen = loadImage('assets/images/clamp_open.png');
    clampClosed = loadImage('assets/images/clamp_closed.png');
    clampHold = loadImage('assets/images/clamp_hold.png');
    // Load oyster graphics
    oysterOpen = loadImage('assets/images/oyster_open.png');
    oysterClosed = loadImage('assets/images/oyster_closed.png');
    oysterShell = loadImage('assets/images/oyster_shell.png');

}

function setup() {
    createCanvas(640, 480);
    // Access the webcam
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    // Load the handpose model
    handpose = ml5.handpose(video, {flipHorizontal: true}, modelReady);
    // Load the facemesh model
    facemesh = ml5.facemesh(video, {flipHorizontal: true}, modelReady);
    // Listen for hand predictions
    handpose.on('predict', function (handResults) {
        console.log(handResults);
        handPredictions = handResults;
    });
    // Listen for face predictions
    facemesh.on('predict', function (faceResults) {
        console.log(faceResults);
        facePredictions = faceResults;
    });
    // Set up oyster
    oyster = {
        x: random(oysterSpawnPoints),
        y: height - 75,
        size: 100,
        vx: 0,
        vy: 0
    };
}

function modelReady() {
    console.log('Model loaded.');
}

function draw() {
    // Draw video
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
    // Draw clamps
    if (handPredictions.length > 0) {
        // Set up hand parameters
        let hand = handPredictions[0];
        let index = hand.annotations.indexFinger;
        let thumb = hand.annotations.thumb;
        let topClamp = index[3];
        let bottomClamp = thumb[3];
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
        // Calculate clamp graphic
        let clampsDistance = dist(bottomClampX, bottomClampY, topClampX, topClampY);
        if (clampsDistance <= 45) {
            clampType = clampClosed;
        }
        else {
            clampType = clampOpen;
        }
        // Clamps
        push();
        imageMode(CENTER);
        image(clampType, ((bottomClampX + topClampX)/2), ((bottomClampY + topClampY)/2), 200, 100);
        pop();
        // Check if touching oyster
        let d = dist(((bottomClampX + topClampX)/2), ((bottomClampY + topClampY)/2), oyster.x, oyster.y);
        if (d < oyster.size/2) {
            oyster.x = random(oysterSpawnPoints);
            oyster.y = height - 75;
        }
    }
    // Draw face
    for (let i = 0; i < facePredictions.length; i += 1) {
        console.log(facePredictions[i].scaledMesh);
        let face = facePredictions[0].scaledMesh;
        let [topLipX, topLipY] = face[13];
        let [bottomLipX, bottomLipY] = face[14];
    // if (facePredictions.length > 0) {
    //     // Set up face parameters
    //     let face = facePredictions[0].scaledMesh;
    //     let topLip = face[13];
    //     let bottomLip = face[14];
    //     let topLipX = topLip[0];
    //     let topLipY = topLip[1];
    //     let bottomLipX = bottomLip[0];
    //     let bottomLipY = bottomLip[1];
        // Debug line
        push();
        noFill();
        stroke(255,255,255);
        strokeWeight(2);
        line(bottomLipX, bottomLipY, topLipX, topLipY)
        pop();
        // Debug dots
        push();
        fill(0, 255, 0);
        noStroke();
        ellipse(bottomLipX, bottomLipY, 10, 10);
        ellipse(topLipX, topLipY, 10, 10);
        pop();
    }
    // Move the oyster
    oyster.x += oyster.vx;
    oyster.y += oyster.vy;

    if (oyster.y < 0) {
        oyster.x = random(oysterSpawnPoints);
        oyster.y = height - 75;
    }
    // Draw the oyster
    push();
    fill(0, 100, 255);
    noStroke();
    ellipse(oyster.x, oyster.y, oyster.size);
    imageMode(CENTER);
    image(oysterClosed, oyster.x, oyster.y, oyster.size);
    pop();
}