var input;
var button;
var fontSize = 12;
var curveRadius = 1500;
var textDatabase = ["transmissão"];
var network;
var signalIndex = 0;

var wires = [];
var towerImg;

function preload() {
  towerImg = loadImage('tower.png');
}

function setup() {

  background(255);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.size(1000);
  input.position(windowWidth/2 - input.width/2, windowHeight - 70);
  button = createButton("send.");
  button.position(windowWidth/2 + input.width/2 + 10, windowHeight - 70);
  button.mousePressed(addNewMessage); 
  noStroke();
  
  network = new Network(textDatabase, fontSize, curveRadius, towerImg);

}

function draw() {
  
  network.showNetwork(signalIndex);
  signalIndex++;

}

function addNewMessage(){

  textDatabase.push( new Wire(
  
    input.value(),
    fontSize,
    curveRadius
  
  ));  
  
  network.addNewMessage(input.value());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
