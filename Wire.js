class Wire {

  constructor(text, size, curveRadius){
  
    this.text = text + " ";
    this.size = size;
    this.curveRadius = curveRadius;
    this.textColor = 0;
    this.arcLength = this.curveRadius /1.5;
    
    this.transition = false;
    this.transitionIndex = 0;
    this.movementIndex = 0;
    
    this.fullWireText = [];
    
    let i = 0;
    let j = 0;
    
    while (i < this.arcLength){
    
      this.fullWireText.push(this.text.charAt(j));
      i += textWidth(this.text.charAt(j));
      j = (j + 1) % this.text.length
    }
    
    this.fullWireText = this.fullWireText.join("");
    //print(this.fullWireText);
  }
  
  ShowWire(curveCenter_x, curveCenter_y, signalIndex) {
  
    textAlign(CENTER);
    ellipseMode(CENTER);
    textSize(this.size);
    fill(this.textColor);
    
    let whiteIndex = 0;
    let letterPosition = ((PI * this.curveRadius) - this.arcLength)/-2 ;
    let endPosition = ((PI/2 * this.curveRadius) + this.arcLength/2) * -1;
   
    this.ShowMessage(letterPosition, endPosition, signalIndex, curveCenter_x, curveCenter_y);
    
    if (frameCount % 2 == 0){
    
      this.fullWireText = this.text.charAt(this.text.length - (this.movementIndex % this.text.length) - 1) + this.fullWireText.slice(0, -1);
      this.movementIndex++;
    }
  }
  
  ShowMessage(letterPosition, endPosition, signalIndex, x, y){
  
    // We must keep track of our position along the curve
    var arclength = letterPosition;
    // For every box
    
    for (var i = 0 ; i < this.fullWireText.length ; i++ )  {
      
      if (arclength < endPosition) return;
      
      if (i == (signalIndex % this.fullWireText.length)) fill(220);
      
      // Instead of a constant width, we check the width of each character.
      var currentChar = this.fullWireText.charAt(i);
      var charWidth = textWidth( currentChar );
  
      // Each box is centered so we move half the width
      arclength -= charWidth/2;
      
      // Angle in radians is the arclength divided by the radius
      // Starting on the bottom side of the circle by adding PI/2
      var currentCharAngle = PI/2 + arclength / curveRadius; 
  
      push();
     
      translate(x, y);     
      rotate(currentCharAngle); // rotation is offset by 90 degrees
      // Display the character
      text(currentChar, 0, this.curveRadius);
      pop();
      // Move halfway again
      arclength -= charWidth/2; 
      fill(0)
    }
    
  }
  
  HandleNewMessage(){
  
    if (this.transition == true){
    
      this.fullWireText = this.text.charAt(this.text.length - (this.transitionIndex % this.text.length) - 1) + this.fullWireText.slice(0, -1);
      this.transitionIndex++;
      
      print(this.transitionIndex + " " + this.fullWireText.length);
      
      if (this.transitionIndex >= this.fullWireText.length){
      
        this.transition = false;
      }
    }
  }
}
