var input;
var button;
var fontSize = 13;
var curveRadius = 1500;
var network;
var signalIndex = 0;

var wires = [];
var towerImg;
var backgroundImg;
var signalSound;
var keyPressSound;
var backgroundSound;

function preload() {
  
  let randBg = floor(random(2)) + 1;
  randBg = "Background" + toString(randBg) + ".png";
  
  backgroundImg = loadImage(randBg);
  towerImg = loadImage('poste.png');
  signalSound = loadSound('Signal.mp3');
  keyPressSound = loadSound('Keypress.mp3');
  backgroundSound = loadSound('BackgroundNoise.mp3');
}

function setup() {
  
  curveRadius *= windowWidth/1920;
  textStyle(BOLD);
  //print(windowHeight);
  getAudioContext().suspend();
  document.body.style.overflow = 'hidden';
  image(backgroundImg, 0, windowHeight - backgroundImg.height);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.size(750);
  input.position(windowWidth/2 - input.width/2 - 10, windowHeight - 100 * windowHeight/1080);
  button = createButton("send.");
  button.position(windowWidth/2 + input.width/2, windowHeight - 100 * windowHeight/1080);
  button.mousePressed(sendNewMessage); 
  noStroke();
  
  network = new Network(textDatabase, fontSize, curveRadius, towerImg);
  
  if (backgroundImg.width/backgroundImg.height > windowWidth/windowHeight){
    backgroundImg.resize(0, windowHeight);
  }
  else{
  
    backgroundImg.resize(windowWidth, 0);
  }
  
  backgroundNoise();
  signalSound.setVolume(1.5)
}

function draw() {
  
  //background(255);
  image(backgroundImg, 0, 0);
  network.showNetwork(signalIndex);
  signalIndex += 3;

}

function sendNewMessage(){

  if (input.value() == "") return;
  
  signalSound.play();
  
  textDatabase.push(input.value());  
  
  network.addNewMessage(input.value());
  input.value("");
  //print(textDatabase);
}


function loadData(database){

  messages = [];
  let i = 0;
  for(let message of messagesData){
  
    messages[i]  = message.text();
  }
}

function backgroundNoise(){

  backgroundSound.play();
  backgroundSound.loop();
  backgroundSound.setVolume(0.2);
}

function keyPressed() {

  if (keyCode === ENTER) {
    sendNewMessage();
  }
  else {
  
    keyPressSound.play();
  }
  
  userStartAudio();
  //fullscreen(true);

}

function mousePressed() {
  userStartAudio();
  //fullscreen(true);

}

function windowResized() {
  
  resizeCanvas(windowWidth, windowHeight);
  input.position(windowWidth/2 - input.width/2 - 10, windowHeight - 100 * windowHeight/1080);
  button.position(windowWidth/2 + input.width/2, windowHeight - 100 * windowHeight/1080);
  
  //network.resizeNetwork();
  
  if (backgroundImg.width/backgroundImg.height > windowWidth/windowHeight){
    backgroundImg.resize(0, windowHeight);
  }
  else{
  
    backgroundImg.resize(windowWidth, 0);
  }
}
