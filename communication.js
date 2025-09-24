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

function preload() {
  
  backgroundImg = loadImage('Background2.jpg');
  towerImg = loadImage('poste.png');
}

function setup() {

  image(backgroundImg, 0, 0);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.size(600);
  input.position(windowWidth/2 - input.width/2, windowHeight - 100);
  button = createButton("send.");
  button.position(windowWidth/2 + input.width/2 + 10, windowHeight - 100);
  button.mousePressed(sendNewMessage); 
  noStroke();
  
  network = new Network(textDatabase, fontSize, curveRadius, towerImg);
  
  if (backgroundImg.width/backgroundImg.height > windowWidth/windowHeight){
    backgroundImg.resize(0, windowHeight);
  }
  else{
  
    backgroundImg.resize(windowWidth, 0);
  }
}

function draw() {
  
  //background(255);
  image(backgroundImg, 0, 0);
  network.showNetwork(signalIndex);
  signalIndex += 3;

}

function sendNewMessage(){

  if (input.value() == "") return;
  
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

function keyPressed() {

  if (keyCode === ENTER) {
    sendNewMessage();
  }
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
