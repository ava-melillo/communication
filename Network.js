class Network {

  constructor(textDatabase, fontSize, curveRadius, img){
  
    this.textDatabase = shuffle(textDatabase);
    this.fontSize = fontSize;
    this.curveRadius = curveRadius;
    this.nRows = 11;
    this.nColumns = 3;
    this.spacing_x = curveRadius/1.5 + img.width - 20;
    this.spacing_y = 54;
    this.wires = [];
    this.img = img
    
    for (let i = 0; i < this.nRows; i++) {
    
      this.wires.push( new Wire(this.textDatabase[i % this.textDatabase.length], fontSize, curveRadius))
    }
    
  }
  
  showNetwork(signalIndex){
    
    background(255);
    
    let transitionIndex = 0;
    let initialPosition_x = windowWidth/2 - this.spacing_x;
  
    for (let i = 0; i < this.nRows; i++){
    
      for (let j = 0; j < this.nColumns; j++){
       
        this.wires[i].ShowWire(initialPosition_x + j * this.spacing_x, windowHeight/2 - this.curveRadius * 1.2 + (i * this.spacing_y) - 5, signalIndex);
        
      }
      
      this.wires[i].HandleNewMessage();
    }
        
    for (let a = 0; a < this.nColumns; a++){
    
      image(this.img, initialPosition_x - this.curveRadius/2.2 + a * this.spacing_x - 10, 50);
    }
    rect(0, this.img.height, windowWidth, 200);
  }
  
  addNewMessage(newMessage){
  
    let newMessageIndex = int(random(this.wires.length - 1));
    this.wires[newMessageIndex].text = newMessage + " ";
    this.wires[newMessageIndex].transition = true;
    print("ta rodando legal");
  }
}
