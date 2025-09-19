class Wire {

  constructor(text, size, curveRadius){
  
    this.text = text;
    this.size = size;
    this.curveRadius = curveRadius;
    this.textColor = 0;
    this.arcLength = this.curveRadius /1.5;
    
  }
  
  ShowWire() {
  
    textAlign(CENTER);
    ellipseMode(CENTER);
    textSize(this.size);
    fill(this.textColor);
   
    // Start in the center
    
    
    //this.ShowMessage(letterPosition);
    for (let i = 0; i < 6; i++){
     
    let letterPosition = ((PI * this.curveRadius) - this.arcLength)/-2 ;
    let endPosition = ((PI/2 * this.curveRadius) + this.arcLength/2) * -1;
   
      while ( letterPosition > endPosition ){
      
        this.ShowMessage(letterPosition, windowWidth/2, windowHeight/2 - this.curveRadius + i*50);
        
        letterPosition -= textWidth(this.text) + textWidth(" ");
        
      }
      
    }
    
  }
  
  ShowMessage(letterPosition, x, y){
  
    // We must keep track of our position along the curve
    var arclength = letterPosition;
     print(y)
    // For every box
    for (var i = 0 ; i < this.text.length ; i++ )  {
      // Instead of a constant width, we check the width of each character.
      var currentChar = this.text.charAt(i);
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
    }
    
  }

}
