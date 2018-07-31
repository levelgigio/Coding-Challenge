function Box(x, y, z, raio) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.raio = raio;
    this.draw = function() {
        push();
        translate(this.x, this.y, this.z);
        box(this.raio);
        pop();
    }
    this.divide = function() {
        for(var i = -1; i <= 1; i++)
            for(var j = -1; j <= 1; j++) 
                for(var k = -1; k <= 1; k++) 
                    if(abs(i)+abs(j)+abs(k) > 1)
                        new_boxes[new_boxes.length] = new Box(this.raio/3*i + this.x, this.raio/3*j + this.y, this.raio/3*k + this.z, this.raio/3);
    }
}

// ------------------------------------------------------------ //

var angulo = 0;
var boxes = [];
var new_boxes = [];
var divisoes = 0;
let largura = 300;
let altura = 300;

function setup() {
    createCanvas(largura, altura, WEBGL);
    boxes[0] = new Box(0, 0, 0, 150);
}

function draw() {
    background(0);
    rotateX(angulo)
    rotateY(angulo/2);
    fill(255);
    for(var i = 0; i < boxes.length; i++)
        boxes[i].draw();
    angulo += 0.01;
}

function mousePressed() {
    var total = boxes.length;
    for(var i = 0; i < total; i++)
        boxes[i].divide();
    boxes = new_boxes;
    new_boxes = [];
}