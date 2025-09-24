var input;
var button;
var fontSize = 12;
var curveRadius = 1500;
var textDatabase = ["hoje sonhei que eu tava fazendo pão", "transmissão", "oieeeee ihihihihiiiii td bommm", "o que é isso?", "eu morro de medo dessas coisas gente kkkk eu não entendi isso aqui", "ieal platonico de um cchorro", "hoje acordei com dedos..."];
var network;
var signalIndex = 0;

var wires = [];
var towerImg;
var backgroundImg;
var signalSound;
var keyPressSound;
var backgroundSound;

function preload() {
  
  backgroundImg = loadImage('Background2.jpg');
  towerImg = loadImage('poste.png');
  signalSound = loadSound('Signal.mp3');
  keyPressSound = loadSound('Keypress.mp3');
  backgroundSound = loadSound('BackgroundNoise.mp3');
}

function setup() {
  
  //fontSize *= windowWidth/1920;
  curveRadius *= windowWidth/1920;
  print(windowHeight);
  getAudioContext().suspend();
  document.body.style.overflow = 'hidden';
  image(backgroundImg, 0, 0);
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
  
  backgroundNoise()
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
  
  textDatabase.push( new Wire(
  
    input.value(),
    fontSize,
    curveRadius
  
  ));  
  
  network.addNewMessage(input.value());
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
  backgroundSound.setVolume(0.6);
}

function keyPressed() {

  if (keyCode === ENTER) {
    sendNewMessage();
  }
  else {
  
    keyPressSound.play();
  }
  
  userStartAudio();
}

function mousePressed() {
  userStartAudio();
}

function windowResized() {
  
  resizeCanvas(windowWidth, windowHeight);
  
  input.position(windowWidth/2 - input.width/2, windowHeight - 100);
  button.position(windowWidth/2 + input.width/2 + 10, windowHeight - 100);
  
  if (backgroundImg.width/backgroundImg.height > windowWidth/windowHeight){
    backgroundImg.resize(0, windowHeight);
  }
  else{
  
    backgroundImg.resize(windowWidth, 0);
  }
}
