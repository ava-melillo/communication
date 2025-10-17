class Network {

  constructor(textDatabase, fontSize, curveRadius, imgA, imgB){
  
    this.textDatabase = shuffle(textDatabase);
    this.fontSize = fontSize * (windowWidth/1920) * 1.1;
    this.curveRadius = curveRadius;
    this.nRows = 10 - floor((1080 - windowHeight)/120);
    this.nColumns = 3;
    this.spacing_y = fontSize * 5 * windowWidth/1920;
    this.wires = [];
    this.img = [imgA, imgB];
    
    for (let i = 0; i < this.nRows; i++) {
    
      this.wires.push( new Wire( 
      
        this.textDatabase[i % this.textDatabase.length],
        this.fontSize,
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
    
    for (let a = 0; a < this.nColumns - 1; a++){ 
    
      image(this.img[a], windowWidth/2 - this.spacing_x/2 - this.img[a].width/2 + (a * this.spacing_x), 50);
      //image(this.img[a],0, 0);
    }
  
    for (let i = 0; i < this.nRows; i++){
      
      //print(this.wires[i]);
      this.wires[i].HandleNewMessage();
    
      for (let j = 0; j < this.nColumns; j++){
       
        this.wires[i].ShowWire(initialPosition_x + j * this.spacing_x, signalIndex);
        //fill(0);
      }
    }
  }
  
  addNewMessage(newMessage){
  
    let newMessageIndex = int(random(this.wires.length));
    this.wires[newMessageIndex].text = newMessage + " ";
    this.wires[newMessageIndex].transition = true;
  }
  
  resizeNetwork(){
  
    //this.nRows = 11 - floor((1080 - windowHeight)/120);
    this.spacing_y = fontSize * 4 * windowWidth/1920;
    
    let centerPosX = windowWidth/2;
    
    for (let i = 0; i < this.nRows; i++){
    
      let centerPosY = this.curveRadius * -1 + (i * this.spacing_y) + 200 * (windowWidth/1920)

      if (this.wires[i] != undefined){
      
        this.wires[i] = (centerPosX, centerPosY);
      }
      else {
      
        this.wires.push( new Wire( 
        
          this.textDatabase[i % this.textDatabase.length],
          this.fontSize,
          this.curveRadius,
          windowWidth/2,
          this.curveRadius * -1 + (i * this.spacing_y) + 200 * (windowWidth/1920))
        )
      }
    }
  }
}
