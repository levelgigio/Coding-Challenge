function Snake() {
    this.x = 0;
    this.y = 0;
    this.velx = 1;
    this.vely = 0;
    this.cauda = [];
    this.draw = function() {
        fill(255);
        for(var i = 0; i < this.cauda.length; i++)
            rect(this.cauda[i].x, this.cauda[i].y, quadrante, quadrante);
        rect(this.x, this.y, quadrante, quadrante);
    }
    this.colisao = function() {
        for(var i = 0; i < this.cauda.length; i++)
            if(this.x === this.cauda[i].x && this.y === this.cauda[i].y)
                perdeu = true;
    }
    this.update = function() {
        if(this.cauda.length > 1)
            for(var i = this.cauda.length-2; i >= 0; i--)
                this.cauda[i+1] = this.cauda[i]; 
        if(this.cauda.length)
            this.cauda[0] = {x: this.x, y: this.y};
        this.x += this.velx*quadrante;
        this.y += this.vely*quadrante;
        this.x = constrain(this.x, 0, largura-quadrante);
        this.y = constrain(this.y, 0, altura-quadrante);
    }
    this.dir = function(velx, vely) {
        this.velx = velx;
        this.vely = vely;
    }
    this.eat = function(fruta) {
        if (this.x === fruta.x && this.y === fruta.y) {
            fruta.generate();
            this.cauda.push({x: this.x, y: this.y});
            pontuacao++;
            console.log(pontuacao);
        }
    }
}

function Fruta() {
    this.x;
    this.y;
    this.generate = function() {
        this.x = Math.floor(random(largura/quadrante))*quadrante;
        this.y = Math.floor(random(altura/quadrante))*quadrante;
    }
    this.draw = function() {
        fill(255, 0, 255);
        rect(this.x, this.y, quadrante, quadrante);
    }
}

// ----------------------------------------------------------------- //

var pontuacao = 0;
var snake = new Snake();
var fruta = new Fruta();
let quadrante = 20;
let largura = 400;
let altura = 400;
var perdeu = false;

function setup() {
    createCanvas(largura, altura);
    frameRate(10);
    fruta.generate();
}

function draw() {
    background(0);
    if(!perdeu) {
        snake.eat(fruta);
        snake.update();
        snake.draw();
        fruta.draw();
        snake.colisao();
    } else {
        textSize(20);
        textAlign(CENTER, CENTER);
        text("GAME OVER!", largura/2, altura/2);
        text("Pontuacao: " + pontuacao, largura/2 + 40, altura/2 + 40);
    }
}

function keyPressed() {
    switch(keyCode) {
        case 83:
            snake.dir(0, 1);
            break;
        case 68:
            snake.dir(1, 0);
            break;
        case 87:
            snake.dir(0, -1);
            break;
        case 65:
            snake.dir(-1, 0);
            break;
    }
}