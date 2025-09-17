class Wire {

  constructor(text, size, curveRadius){
  
    this.text = text;
    this.size = size;
    this.curveRadius = curveRadius;
    this.textColor = 0;
    this.arcLength = this.curveRadius;
    
  }
  
  ShowWire() {
  
    textAlign(CENTER);
    ellipseMode(CENTER);
    textSize(this.size);
    fill(this.textColor);
   
    // Start in the center
    translate(width / 2, height / 2 );
    
    let currentAngle = this.arcLength/this.curveRadius/2 ;
    let endAngle = this.arcLength/this.curveRadius/2 * -1;
     this.ShowMessage(currentAngle);
   
    /*
    while (currentAngle > endAngle){
    
      this.ShowMessage(currentAngle);
      currentAngle -= textWidth(this.text)/this.curveRadius;
    }
    */
    
  }
  
  ShowMessage(currentAngle){
  
    //rotate(0.2);
    // We must keep track of our position along the curve
    var arclength = 0 - textWidth(this.text)/2;
  
    // For every box
    for (var i = this.text.length ; i >= 0 ; i-- )  {
      // Instead of a constant width, we check the width of each character.
      var currentChar = this.text.charAt(i);
      var charWidth = textWidth( currentChar );
  
      // Each box is centered so we move half the width
      arclength += charWidth/2;
      
      // Angle in radians is the arclength divided by the radius
      // Starting on the left side of the circle by adding PI
      var currentCharAngle = PI/2 + arclength / curveRadius;    
  
      push();
      // Polar to cartesian coordinate conversion
      translate(this.curveRadius * cos(currentCharAngle), this.curveRadius * sin(currentCharAngle));
      // Rotate the box
      rotate(currentCharAngle+PI*1.5); // rotation is offset by 90 degrees
      // Display the character
      text(currentChar, 0, 0);
      pop();
      // Move halfway again
      arclength += charWidth/2;
    }
    
  }
    
}
