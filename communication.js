var input;
var button;
var fontSize = 12;
var curveRadius = 1300;

var wires = [];

function setup() {

  background(255);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.size(1000);
  input.position(windowWidth/2 - input.width/2, windowHeight - 100);
  button = createButton("send.");
  button.position(windowWidth/2 + input.width/2 + 10, windowHeight - 100);
  button.mousePressed(showMessages);
  
  noStroke();

}

function draw() {

}

function showMessages(){

  wires.push( new Wire(
  
    input.value(),
    fontSize,
    curveRadius
  
  ));
  
  wires[wires.length - 1].ShowWire();
}


function drawText(){

  var textt = input.value();
  var idx = 0;
  background(255);
  textSize(fontSize);
  
  for (i = 0; i < windowWidth + textWidth(textt); i += textWidth(textt) + fontSize){
  
    for (j = 0; j < windowHeight + fontSize; j += fontSize * 4){
    
      fill(0);
      
      var stringPart = textt.substring(0, idx);
      text(stringPart, i, j);
      idx++;
      
      print(input.value());
      //text(textt, i, j);
      
    }
  }
}
