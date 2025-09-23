var input;
var button;
var fontSize = 12;
var curveRadius = 1500;
var textDatabase = ["transmissão", "oieeeee ihihihihiiiii td bommm", "o que é isso?", "eu morro de medo dessas coisas gente kkkk eu não entendi isso aqui", "ieal platonico de um cchorro", "hoje acordei com dedos..."];
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

function signalEffect(x, y){

  let maxDiameter = 100;
  let opacity = 255;
  let step = opacity/maxDiameter;
  
  for (let i = 0; i < maxDiameter; i++){
  
    push()
    

    //stroke(0, 0, 0, opacity)
    circle(x, y, i);
    
    opacity -= step;
    //stroke();
    
    pop()
    
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
