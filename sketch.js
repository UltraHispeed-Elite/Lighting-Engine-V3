var player;
var screen;
var screen2;

var img1;

var e,f,g,h;

function setup() {
    createCanvas(400,400);

    player = new Sprite(200,200,50,50);
    player.color='red';
    player.img = 'ghost2.png';

    img1 = new Sprite(200,200,400,400);
    img1.collider = 'n';
    img1.img = 'hello.png';
}

function draw() {
    background("purple");

    playerMovement();
    shade_engine();
}

function playerMovement() {
    if(kb.pressing('w')) {
        player.y -= 5;
    }

    if(kb.pressing('a')) {
        player.x -= 5;
    }

    if(kb.pressing('s')) {
        player.y += 5;
    }

    if(kb.pressing('d')) {
        player.x += 5;
    }
}

function shade_engine() {
    if(player.x<img1.x){
        e = img1.x - player.x;
        f = (e/img1.x)*100;
    }else if(player.x>img1.x) {
        e = player.x - img1.x;
        f = (e/img1.x)*100;
    }else {
        e = 0;
        f = 0;
    }

    if(player.y<img1.y){
        g = img1.y - player.y;
        h = (g/img1.y)*100;
    }else if(player.y>img1.y) {
        g = player.y - img1.y;
        h = (g/img1.y)*100;
    }else {
        g = 0;
        h = 0;
    }

    let vx = 100-f;
    let  vy = 100-h;
    let v = (vx+vy)/2
    let cv = v/100;

    if(cv < 0){
        cv = 0;
    }else if(cv > 0.9) {
        cv = 1;
    }

    img1.opacity = 1-cv;

    console.log(img1.opacity);
}