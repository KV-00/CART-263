/**
VOICE OLYMPICS (.js)
By: Keven Vaillancourt

Submission for the CART 263 voices jam!

This code has sections taken from https://editor.p5js.org/rainbowlazer/sketches/7UMxWVXyV for the timer scripts. said code was made by user rainbowlazer, not me, I only cobbled it into my own!
I also took code from https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex in order to fix the speech output not being the same between web browsers.

KNOWN BUGS:
- Retry doesn't work, so you have to refresh the page to enter gameplay again. If I had more time (and more help) this could probably be fixed.
- The speech synthesizer doesn't work across all screens, and will just flat out not work on some web browsers.
- The timer for some reason starts before going onto the gameplay screen, and I for the life of me could not figure out how to fix it.
- The latter section of the randomAction function also does not seem to work properly, as it's supposed to prevent the same action from happening twice in a row.

OBVIOUS IMPROVMENTS:
- Add more actions besides the initial 3. I could have added more but also 3's enough to convey the functionalities of the prototype.
- More voice synthesizers. I wanted to add music in the form of a voice going *bum, bum* along with the music, but I couldn't figure that out before submission.

*/

"use strict";

let voice = new p5.Speech();
let recognizer = new p5.SpeechRec();

let screen = 0;

let font;

let guessedAction = ``;

let score = 0;

let field = undefined;
let sky = undefined;

let actions = [
    {
      action: `woof`,
      pic: undefined
    },
    {
      action: `brush`,
      pic: undefined
    },
    {
      action: `jog`,
      pic: undefined
    }
  ];

let randoAction;
let prevAction;
let currentAction;

let timeDigit = 10;

let timeLimit = timeDigit, prevTime, timeInSecs, timeInMillis;

function preload() {
    actions[0].pic = loadImage('assets/images/woof.gif'); 
    actions[1].pic = loadImage('assets/images/brush.gif');
    actions[2].pic = loadImage('assets/images/jog.gif');

    field = loadImage('assets/images/field.png');
    sky = loadImage('assets/images/sky.png');

    font = loadFont('assets/fonts/EraserRegular.ttf');
}

function setup() {
    imageMode(CENTER);

    createCanvas(displayWidth, displayHeight);

    recognizer.continuous = true;
    recognize();

    if (screen == 0) {
        voice.speak('Welcome to the VOICE OLYMPICS!');
	} else if (screen == 2) {
		voice.speak('You SNOOZE you LOSE!');
    }

    prevAction = randoAction;
  
    randomAction();

    resetTimer();
}

function draw() {
    if (screen == 0) {
		titleScreen();
	} else if (screen == 1) {
		gameplayScreen();
	} else if (screen == 2) {
		gameOverScreen();
	}
}

function titleScreen() {
    clear();

    image(sky, width / 2, height / 2, width, height);

    fill(255);
    textFont(font);
    textSize(75);
    textAlign(CENTER);
    text('VOICE OLYMPICS', width/2, height/2);
    textSize(25);
    text('SAY "START" TO BEGIN!', width/2, height/2 + 50);
}

function gameplayScreen() {
    clear();
    score = 0;

    image(field, width / 2, height / 2, width, height);

    // score stuff

    fill(255);
    textFont(font);
    textSize(25);
    textAlign(LEFT);
    text('SCORE: ', 50, 105);
    text(score, 150, 105);

    // current action in text

    fill(255);
    textSize(50);
    textAlign(CENTER);
    text(currentAction.action, width/2, height/2 + 200);

    // visual timer

    handleTimer();

    fill(255);
    noStroke();
    rect(0, 0, timeInSecs * width/timeLimit, 75);

    // action animation

    image(currentAction.pic, width / 2, height / 2);

    currentAction.pic.delay(timeLimit*50);
}

function gameOverScreen() {
    clear();

    image(field, width / 2, height / 2, width, height);
    tint(200, 200, 200);

    fill(255);
    textFont(font);
    textSize(50);
    textAlign(CENTER);
    text('GAME OVER', width/2, height/2);
    textSize(25);
    text('SAY "RETRY" TO PLAY AGAIN!', width/2, height/2 + 50);
}

function recognize() {
    recognizer.onResult = handleResult;
    recognizer.start();
}

function handleResult() {
    console.log(recognizer.resultString);

    // format text to be readable across different browsers

    let normalPhrase = recognizer.resultString;
    let lowercase = normalPhrase.toLowerCase();
    let punctuationless = lowercase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    guessedAction = punctuationless.replace(/\s{2,}/g," ");

    if (guessedAction === 'start' && screen === 0) {
        screen = 1;
    }

    if (guessedAction === currentAction.action){
        score = score + 100;
        randomAction();
        resetTimer();
        manageDifficulty();
     }

    if (guessedAction === 'retry' && screen === 2) {
        screen = 1;
    }
    
}

function randomAction() {
    randoAction = random(actions);
    currentAction = randoAction;

    if (prevAction === randoAction) {
        while (prevAction === randoAction) {
            randoAction = random(actions);
        }
    }
}

function handleTimer(){
    timeInSecs = prevTime + timeInMillis - millis();
    timeInSecs /= 1000;
    
    if (millis() > prevTime + timeInMillis) {
        screen = 2;
    }
}

function resetTimer(){
    prevTime = millis();
    timeInMillis = timeLimit * 1000;
}

function manageDifficulty(){
    timeLimit = timeLimit - 0.1;

    if (timeLimit < 3) {
        timeLimit = 3;
    }
}