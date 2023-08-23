const DISTANCE_THRESHOLD = 50; 

export class CreateLevels{
    constructor(scene,level,speed,space,Obstacule){
        this.relatedScene = scene;
        this.snakeBody = [];
        this.buildPosition = [];
        this.levelTextRoom = level;
        this.speedBody = speed;
        this.spaceBody = space;
        this.obstacule = Obstacule;
    }

    preload(){
        this.relatedScene.load.image('background', 'images/background.png');
        this.relatedScene.load.image("cesped", 'images/cesped.png');

        this.relatedScene.load.image('gameover', 'images/gameover.png');

        this.relatedScene.load.image("head", 'images/head.png');
        this.relatedScene.load.image("body", 'images/body.png');

        this.relatedScene.load.image("apple", 'images/apple.png');
        this.relatedScene.load.image("cherrys", 'images/cherrys.png');

        this.relatedScene.load.image("upAndDown",'images/up.png');
        this.relatedScene.load.image("leftAndRight",'images/left.png');

        this.relatedScene.load.image("build", 'images/build.png');
        this.relatedScene.load.image("buildHorizontal", 'images/build2.png');
    }

    create(){
        //background
        this.relatedScene.add.image(454, 330.5, 'background');
        this.relatedScene.add.image(454,330.5,'cesped');
             
        this.upCollider = this.relatedScene.physics.add.image(454,25,"upAndDown").setImmovable();
        this.downCollider = this.relatedScene.physics.add.image(454,636,"upAndDown").setImmovable();
        this.leftCollider = this.relatedScene.physics.add.image(27,330.5,"leftAndRight").setImmovable();
        this.rightCollider = this.relatedScene.physics.add.image(881,330.5,"leftAndRight").setImmovable();
     
             //serpiente
             this.head = this.relatedScene.physics.add.image(454,330.5, "head").setImmovable();
             this.head.setCollideWorldBounds(true);
             if (this.snakeBody.length === 0) {
                this.snakeBody.push({x: this.head.x, y: this.head.y});
            }
            
             //comida
             this.cherrys = this.relatedScene.physics.add.image(100,300,'cherrys');
             this.cherrys.disableBody(true,true);
             this.apple = this.relatedScene.physics.add.image(400,100,'apple');
             this.apple.disableBody(true,true);
     
             //score 

             this.scoreText = this.relatedScene.add.text(28,24,`SCORE: ${this.score}`,{
                 fontSize : "20px",
                 fill : "#fff",
                 fontFamily: "verdana, arial, sans-serif"
             });
     
             //level
             this.levelText = this.relatedScene.add.text(300,24,`LEVEL ${this.levelTextRoom}`,{
                 fontSize : "20px",
                 fill : "#fff",
                 fontFamily: "verdana, arial, sans-serif"
             });
             
             //colisiones
             this.relatedScene.physics.add.collider(this.head, this.leftCollider,this.gameOver,null,this);
             this.relatedScene.physics.add.collider(this.head, this.upCollider,this.gameOver,null,this);
             this.relatedScene.physics.add.collider(this.head, this.rightCollider,this.gameOver,null,this);
             this.relatedScene.physics.add.collider(this.head, this.downCollider,this.gameOver,null,this);
     
     
             //keyboard
             this.keyboard = this.relatedScene.input.keyboard.createCursorKeys();
             this.keyboard = this.relatedScene.input.keyboard.addKeys({
                 W: Phaser.Input.Keyboard.KeyCodes.W,
                 D: Phaser.Input.Keyboard.KeyCodes.D,
                 A:Phaser.Input.Keyboard.KeyCodes.A,
                 S:Phaser.Input.Keyboard.KeyCodes.S
             });
    }

    update(){
        if (this.relatedScene.physics.overlap(this.head, this.cherrys)) {
            // Código que se ejecutará cuando colisione la serpiente con la fruta
            this.cherrys.disableBody(true,true);
            this.incrasePoint(10);

           this.positionBody += this.spaceBody;

            var placeBody = this.snakeBody.length;
            const lastSegment = this.snakeBody[(placeBody - placeBody)+10];
             
            // Crear y agregar el nuevo segmento a la lista de segmentos del cuerpo
            const newSegment = this.relatedScene.physics.add.image(lastSegment.x, lastSegment.y, 'body');
            this.snakeBody[this.positionBody]= newSegment;
          }

          if (this.relatedScene.physics.overlap(this.head, this.apple)) {
            // Código que se ejecutará cuando colisione la serpiente con la fruta
            this.apple.disableBody(true,true);
            this.incrasePoint(25);
        
            this.positionBody += this.spaceBody;

            var placeBody = this.snakeBody.length;
            const lastSegment = this.snakeBody[(placeBody - placeBody)+10];
             
            // Crear y agregar el nuevo segmento a la lista de segmentos del cuerpo
            const newSegment = this.relatedScene.physics.add.image(lastSegment.x, lastSegment.y, 'body');
            this.snakeBody[this.positionBody]= newSegment;
          }
    }

    init(score){
        this.score = score;
        this.positionBody = 0;
    }

    movementSnake(speed){
        if(this.keyboard.W.isDown){
            this.head.angle = -90;
            this.head.setVelocityX(0);
            this.head.setVelocityY(-speed);
        }else if(this.keyboard.S.isDown){
            this.head.angle = 90;
            this.head.setVelocityX(0);
            this.head.setVelocityY(speed);
        }else if(this.keyboard.D.isDown){
            this.head.angle = 360;
            this.head.setVelocityY(0);
            this.head.setVelocityX(speed);
        }else if(this.keyboard.A.isDown){
            this.head.angle = 180;
            this.head.setVelocityY(0);
            this.head.setVelocityX(-speed);
        }
    }

    
    moveSnakeBody() {
        // Mover el primer segmento del cuerpo a la posición de la cabeza con espacio
        this.snakeBody[0].x = this.head.x;
        this.snakeBody[0].y = this.head.y;
        this.snakeBody.push({x: this.head.x, y:this.head.y});

        // Ajustar las posiciones para el espacio entre segmentos y la dirección de la cabeza
        for (let i = this.snakeBody.length - 1; i >= 1; i--) {
            this.snakeBody[i].x = this.snakeBody[i - 1].x;
            this.snakeBody[i].y = this.snakeBody[i - 1].y;
        }

        // Mover el primer segmento del cuerpo a la posición de la cabeza
        this.snakeBody[0].x = this.head.x;
        this.snakeBody[0].y = this.head.y;
      }     

      incrasePoint(point){
        this.score += point;
        this.scoreText.setText('SCORE:' + this.score);
    }

    respawnFuits(){
        if(!this.cherrys.active && !this.apple.active){
            const randomX = Phaser.Math.Between(27,850);
            const randomY = Phaser.Math.Between(25,625);
            const randomDecision = Phaser.Math.Between(0,4);

            if(randomDecision < 4){
                this.cherrys = this.relatedScene.physics.add.image(randomX,randomY,"cherrys");
            }else{
                this.apple = this.relatedScene.physics.add.image(randomX,randomY,"apple");
            }
        }
    }

    checkCollisionWithBody() {
        // Recorrer el cuerpo desde el segundo segmento en adelante
        for (let i = 6; i < this.snakeBody.length; i++) {
            const segment = this.snakeBody[i];
            
            // Verificar si la cabeza colisiona con un segmento del cuerpo
            if (this.relatedScene.physics.overlap(this.head, segment)) {
            // Código que se ejecutará cuando la cabeza colisione con el cuerpo
            this.gameOver();
            }
        }
    }

    createObstacules() {
        if (this.levelTextRoom >= 2) {
            for (let i = 0; i < this.obstacule; i++) {
                let posX, posY, buildKey;
    
                // Generar una posición única para el obstáculo
                do {
                    posX = Phaser.Math.Between(85, 800);
                    posY = Phaser.Math.Between(83, 590);
                } while (this.isPositionOccupied(posX, posY));
    
                // Elegir la clave de imagen en función de la decisión
                const desicion = Phaser.Math.Between(1, 2);
                if (desicion === 1) {
                    buildKey = "build";
                } else {
                    buildKey = "buildHorizontal";
                }
    
                // Crear y agregar el obstáculo
                this.build = this.relatedScene.physics.add.image(posX, posY, buildKey).setImmovable();
                this.buildPosition.push(this.build);
            }
        }
    }
    
    
    isPositionOccupied(x, y) {
        // Verificar si la posición (x, y) está ocupada por un obstáculo existente
        for (const build of this.buildPosition) {
            const distance = Phaser.Math.Distance.Between(x, y, build.x, build.y);
            if (distance < DISTANCE_THRESHOLD) {
                return true; // La posición está ocupada
            }
        }
        return false; // La posición está desocupada
    }
    

    checkCollisionWithBuild(){
        for(let i = 0 ; i < this.buildPosition.length; i++){
            const buildSegment = this.buildPosition[i];
            if (this.relatedScene.physics.overlap(this.head, buildSegment)) {
                this.gameOver();
            }
        }
    }

    passLevel(levelToPass,scoreMax){
        const levels = [
            "leveltwo",
            "levelthree",
            "levelfour",
            "levelfive",
            "levelsix"
        ]
        if(this.score > scoreMax){
            this.relatedScene.scene.start(`${levels[levelToPass]}`, this.score);
        }
    }
    gameOver(){
        this.relatedScene.scene.start("gameover")
    }
}