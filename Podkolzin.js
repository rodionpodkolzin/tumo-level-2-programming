function setup() {
        createCanvas(800, 800)
        Game.addComonBalloon();
    }
    
    function draw() {
        background('skyblue')
    
        for (const balloon of Game.balloons) {
            balloon.display();
            balloon.move();
    
            if (balloon.y <= balloon.size / 2 && balloon.color != 'black') {
                noLoop();
                Game.balloons.length = 0
                let finalScore = Game.score
                let maxScore = Game.maxScore
                Game.score = ''
                background (136, 220, 166);
                textSize(64);
                fill('white');
                textAlign(CENTER, CENTER);
                text('FINISH', 400, 400); 
                textSize(34);
                text('Score: ' + finalScore, 400, 500);
                textSize(20);
                text('Max Score' + maxScore, 400, 600)
    
            }
        }
    
        textSize(32);
        fill('black')
        text(Game.score, 20 , 40);
    
        if (frameCount % 40 == 0) {
           Game.addComonBalloon();
        }
    
        if (frameCount % 400 == 0) {
            Game.addUniqBalloon();
        }
    
        if (frameCount % 80 == 0) {
            Game.addAngryBalloon();
        }
    
        if (frameCount % 800 == 0) {
            Game.addFastBalloon();
        }
    
        if (frameCount % 1500 == 0) {
            Game.addGoldBalloon();
        }
    }
    
    function mousePressed() {
        if (!isLooping()) {
            Game.score = 0
            loop() 
        }
        Game.CheckIfBalloonBurst();
    }
    
    class Game {
      static balloons = [];
      static score = 0;
    
      static addComonBalloon(){
        let balloon = new CommonBalloon('blue', 50)
        this.balloons.push(balloon)
      }
    
      static addUniqBalloon(){
        let balloon = new UniqBaloon('green', 30)
        this.balloons.push(balloon)
      }
    
       static addAngryBalloon(){
        let balloon = new AngryBaloon('black', 50)
        this.balloons.push(balloon)
      }
    
       static addFastBalloon(){
        let balloon = new FastBalloon('red', 20)
        this.balloons.push(balloon)
     }
    
     static addGoldBalloon(){
        let balloon = new GoldBalloon('gold', 10)
        this.balloons.push(balloon)
     }
    
       static CheckIfBalloonBurst(){
        Game.balloons.forEach((balloon, index) => {
        let distance = dist(balloon.x , balloon.y , mouseX , mouseY)
    
        if (distance <= balloon.size / 2 ) {
            balloon.burst(index)
    
        }
        });
    
    }
    }
    
    
    
    
    class CommonBalloon {
        constructor(color, size){
            this.x = random(width)
            this.y = (height - 10, height + 50)
            this.size = size
            this.color = color
        }
    
        display() {
            fill(this.color)
            ellipse(this.x, this.y, this.size)
            line(this.x, this.y + this.size / 2, this.x, this.y + 2 * this.size)
        }
    
        move(){
            if (Game.score <= 500) {
                this.y -=1 ;
                }    else if (Game.score > 100 && Game.score <= 200)
                this.y -=1.5;
                else if (Game.score > 200)
                this.y -= 2;
           
        }
    
       burst(index){
        Game.balloons.splice(index, 1);
        Game.score += 50;
    
        } 
    }
    
    class UniqBaloon extends CommonBalloon {
       constructor(color, size){
        super(color, size);
        }
       burst(index){
        Game.balloons.splice(index, 1);
        Game.score += 10;
       }
    }
    
    class AngryBaloon extends CommonBalloon {
        constructor(color, size){
         super(color, size);
        }
        burst(index){
         Game.balloons.splice(index, 1);
         Game.score -= 20;
        }
     }
     
     class FastBalloon extends CommonBalloon {
        constructor(color, size){
         super(color, size);
        }
        burst(index){
         Game.balloons.splice(index, 1);
         Game.score += 100;
        }
     }
     
    
     class GoldBalloon extends CommonBalloon {
        constructor(color, size){
         super(color, size);
        }
        burst(index){
         Game.balloons.splice(index, 1);
         Game.score += 1500;
        }
     }
    