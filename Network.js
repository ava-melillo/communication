class Network {

  constructor(textDatabase, fontSize, curveRadius, img){
  
    this.textDatabase = shuffle(textDatabase);
    this.fontSize = fontSize;
    this.curveRadius = curveRadius;
    this.nRows = 11;
    this.nColumns = 3;
    this.spacing_y = 54 * windowWidth/1920;
    this.wires = [];
    this.img = img
        
    for (let i = 0; i < this.nRows; i++) {
    
      this.wires.push( new Wire( 
      
        this.textDatabase[i % this.textDatabase.length],
        fontSize,
        curveRadius,
        windowWidth/2,
        this.curveRadius * -1 + (i * this.spacing_y) + 200 * (windowWidth/1920))
      )
    } 
    
    this.spacing_x = int(this.wires[0].edgeOffsetX * 2 + 20);

  }
  
  showNetwork(signalIndex){
   
    
    let transitionIndex = 0;
    let initialPosition_x = windowWidth/2 - this.spacing_x;
    
    for (let a = 0; a < this.nColumns; a++){
    
      image(this.img, windowWidth/2 - this.spacing_x/2 - this.img.width/2 + (a * this.spacing_x), 50);
    }
    
    rect(0, this.img.height, windowWidth, 200);
  
    for (let i = 0; i < this.nRows; i++){
      
      this.wires[i].HandleNewMessage();
    
      for (let j = 0; j < this.nColumns; j++){
       
        this.wires[i].ShowWire(initialPosition_x + j * this.spacing_x, signalIndex);
        //fill(0);
      }
    }
  }
  
  addNewMessage(newMessage){
  
    let newMessageIndex = int(random(this.wires.length - 1));
    this.wires[newMessageIndex].text = newMessage + " ";
    this.wires[newMessageIndex].transition = true;
  }
  

}
