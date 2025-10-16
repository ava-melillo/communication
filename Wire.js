class Wire {

  constructor(text, size, curveRadius, centerPosX, centerPosY){
  
    this.text = text + " ";
    this.fontSize = size;
    this.curveRadius = curveRadius;
    this.textColor = 0;
    this.arcLength = this.curveRadius /1.4 + 30;
    
    //speed é inversamente proporcional
    this.speed = 3;
    this.transition = false;
    this.transitionIndex = 0;
    this.newMessageLength = null;
    this.movementIndex = 0;
    this.position = { x: centerPosX, y: centerPosY };
    
    this.signalActive = false;
    this.signalRadius = 1;
    this.signalMaxRadius = 100;
    
    this.edgeOffsetX = sin(this.arcLength/2/this.curveRadius) * this.curveRadius
    this.edgeOffsetY = cos(this.arcLength/2/this.curveRadius) * this.curveRadius
    
    this.edgePosition = {
      
      left: {
        x: this.position.x - this.edgeOffsetX,
        y: this.position.y + this.edgeOffsetY},
        
      right: {
        x: this.position.x + this.edgeOffsetX,
        y: this.position.y + this.edgeOffsetY},
    }
    
    this.fullWireText = [];
    
    let i = 0;
    let j = 0;
    
    while (i < this.arcLength){
    
      this.fullWireText.push(this.text.charAt(j));
      i += textWidth(this.text.charAt(j));
      j = (j + 1) % this.text.length
    }
    
    this.fullWireText = this.fullWireText.join("");
    print(this.fullWireText);
  }
  
  ShowWire(curveCenter_x, signalIndex) {
  
    textAlign(CENTER);
    ellipseMode(CENTER);
    textSize(this.fontSize);
    fill(this.textColor);
    
    let whiteIndex = 0;
    let letterPosition = ((PI * this.curveRadius) - this.arcLength)/-2 ;
    let endPosition = ((PI/2 * this.curveRadius) + this.arcLength/2) * -1;
   
    this.showMessage(letterPosition, endPosition, signalIndex, curveCenter_x, this.position.y);
    //this.showLetters();
    
    if (this.transition == true){
      
      this.signalEffect(this.edgePosition.left.x, this.edgePosition.left.y);
      
    }
    
    if (frameCount % this.speed == 0 && this.transition == false){
    
      this.fullWireText = this.text.charAt(this.text.length - (this.movementIndex % this.text.length) - 1) + this.fullWireText.slice(0, -1);
      this.movementIndex++;
    }
  }
  
  showLetters(){
  
    let factor_x = (windowWidth-(2*this.edgePosition.left.x))/2;
    
    // implementação das letras com seno e cosseno
    let convertAngle = -1*((this.arcLenght/this.curveRadius)/2); // inicia o desenho em -30 graus
    
    for(let i = 0; i <= this.fullWireText.length; i++){ // itera na string com o texto completo a ser mostrado no fio
    
      // converte a largura de cada caractere em um ângulo dentro do escopo definido anteriormente
      let charWidthToAngle = map(textWidth(this.fullWireText.charAt(i)), 0, this.arcLength, 0, this.arcLength/this.curveRadius);
      convertAngle += charWidthToAngle; // acrescenta o ângulo para desenhar a sequência de chars
      
      // define posições x e y com base no ângulo entre -30 e 30º multiplicando pelo diâmetro e fazendo correção
      // de posicionamento (eixo Y não está correto)
      let x = ((sin(radians(convertAngle))*factor_x*2)+(windowWidth/2));
      let y = ((cos(radians(convertAngle))*factor_x*2)- 500);
      push();
        translate(x, y); // translação para a posição do caractere
        rotate(radians(convertAngle)*-1); // rotação no eixo do caractere
        text(this.fullWireText.charAt(i), -(textWidth(this.fullWireText.charAt(i))/2), 0); // desenha o caractere centralizando no eixo X
      pop();
    }
  }
  
  
  showMessage(letterPosition, endPosition, signalIndex, x, y){
  
    // We must keep track of our position along the curve
    var arclength = letterPosition;
    // For every box
    
    for (var i = 0 ; i < this.fullWireText.length ; i++ )  {
      
      if (arclength < endPosition) return;
      
      this.handleSignalColor(i);
      if (i == signalIndex % this.fullWireText.length) fill(255);
      
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
      rotate(currentCharAngle);
      
      // Display the character
      text(currentChar, 0, this.curveRadius);
      pop();
      // Move halfway again
      arclength -= charWidth/2; 
      fill(0);
    }
    
  }
  
  HandleNewMessage(){
  
    let transitionSpeed = 5;
    
    if (this.newMessageLength == null){
    
      let i = 0;
      let j = 0;
      this.newMessageLength = [];
      
      while (i < this.arcLength){
    
        this.newMessageLength.push(this.text.charAt(j));
        i += textWidth(this.text.charAt(j));
        j = (j + 1) % this.text.length
      }
    
      this.newMessageLength = this.newMessageLength.join("");
      print(this.newMessageLength)
      this.newMessageLength = this.newMessageLength.length;
    }
    
    //caso tenha recebido uma nova mensagem,
    if (this.transition == true){
      
      if (this.transitionIndex - transitionSpeed < this.newMessageLength){
      
        let newWireText = "";
        //é criada uma variável com 1 char da string nova no começo, e 1 char a menos no final
        for (let i = 0; i < transitionSpeed; i++){
        
          newWireText = this.text.charAt(this.text.length - ((this.transitionIndex + i) % this.text.length) - 1) + newWireText
        }
        
        newWireText += this.fullWireText.slice(0, -1);
        
        //ela vira o novo texto do fio, dando a ilusao de que o texto novo empurra o texto antigo
        print("1- ", this.fullWireText)
        print("2- ", newWireText)
        this.fullWireText = newWireText;
        this.transitionIndex += transitionSpeed;
        
        //print("WIRE TEXT LENGTH:  " + int(newWireText.length));
        //print("WIRE TEXT WIDTH:   " + int(textWidth(newWireText)));
        //print("WIRE WIDTH:        " + int(this.arcLength));
        
      } else {
        
        //a transicao termina
        this.transition = false;
        this.transitionIndex = 0;
        this.newMessageLength = null;
        this.signalActive = false;
        
      }
    }
  }
  
  signalEffect(x, y){
    
    this.signalActive = true;
    if (this.signalRadius < this.signalMaxRadius){
     
      push()
        
      noFill();
      stroke(255, int(255 - 255/this.signalMaxRadius * this.signalRadius));
        
      circle(x, y, this.signalRadius);
  
      this.signalRadius += 3;
        
      pop()
    } else {
    
      this.signalActive = false;
      this.signalRadius = 1;
    }
  }
  
  handleSignalColor(i){
  
    let transitionFrames = 40
    
    if (this.transitionIndex > i){
    
      fill(255, 214, 100);
      
      if (this.transitionIndex > this.newMessageLength - transitionFrames && this.transition == true){
  
        fill((255/transitionFrames) * (this.newMessageLength - this.transitionIndex), (214/transitionFrames) * (this.newMessageLength - this.transitionIndex), (100/transitionFrames) * (this.newMessageLength - this.transitionIndex));
  
      }
    }
  }
  
  resizeWire(centerPosX, centerPosY){
  
    this.position = { x: centerPosX, y: centerPosY };
    
    this.edgePosition = {
      
    left: {
      x: this.position.x - this.edgeOffsetX,
      y: this.position.y + this.edgeOffsetY},
        
    right: {
      x: this.position.x + this.edgeOffsetX,
      y: this.position.y + this.edgeOffsetY},
    }
    
  }
}
