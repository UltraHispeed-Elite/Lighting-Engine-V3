var player;
var enemy;

var light_source = [
    [0,0,400,400],
    [0,400,400,800],
    [400,0,800,400],
    [400,400,800,800]
];

var light_sprites;

var xc, yc;
var c;
var d = [];
var e = [];
var g = [];
var h = [];
var vx = [];
var vy = [];
var v = [];
var cv = [];
var dave = 0;

function setup() {
  createCanvas(800,800);
  
  player = new Sprite(300,300,64,64);
  player.rotationLock = true;
  player.img = 'ghost2.png';
  
  enemy = new Group();
  enemy.rotationLock = true;
  enemy.img = 'ghost2.png';
  
  for(let i=0; i<1; i++){
    new enemy.Sprite(200+(i*5),200+(i*5),50,50);
  }

  light_sprites = new Group();

  for(let i=0; i<light_source.length; i++){
    new light_sprites.Group();
  }
}

function draw(){
  background("black");
  
//   if(player.x >= 0 && player.x <= 400){
//     if(player.y >= 0 && player.y <= 400){
//         createLight(0,0,400,400,1);
//     }else if(player.y >= 400 && player.y <= 800){
//         createLight(0,400,400,800,2);
//     }
//   }else if(player.x >= 400 && player.x <= 800){
//     if(player.y >= 0 && player.y <= 400){
//         createLight(400,0,800,400,3);
//     }else if(player.y >= 400 && player.y <= 800){
//         createLight(400,400,800,800,4);
//     }
//   }

    for(let i=0; i<light_source.length; i++) {
        if(player.x >= light_source[i][0] && player.x <= light_source[i][2]){
            if(player.y >= light_source[i][1] && player.y <= light_source[i][3]){
                createLight(light_source[i][0],light_source[i][1],light_source[i][2],light_source[i][3]);
                spriteLight();
            }
        }
    }

    console.log(light_source);

  playerMovement();
}

function createLight(x1, y1, x2, y2){
  xc = (x1+x2)/2;
  yc = (y1+y2)/2;
  console.log(xc, yc);
}

function spriteLight(){
  d.length = allSprites.length;
  e.length = allSprites.length;
  g.length = allSprites.length;
  h.length = allSprites.length;
  vx.length = allSprites.length;
  vy.length = allSprites.length;
  v.length = allSprites.length;
  cv.length = allSprites.length;
    
  for(let i = 0; i<allSprites.length; i++) {
    d[i]=0;
    e[i]=0;
    g[i]=0;
    h[i]=0;
    vx[i]=0;
    vy[i]=0;
    v[i]=0;
    cv[i]=0;
    data(i);
  }
}

function data(a) {
  if(allSprites[a].x < xc) {
    d[a] = xc - allSprites[a].x;
    e[a] = (d[a]/xc)*100;
  }else if(allSprites[a].x > xc) {
    d[a] = allSprites[a].x - xc;
    e[a] = (d[a]/xc)*100;
  }else {
    d[a]=0;
    e[a]=0;
  }
    
  if(allSprites[a].y < yc) {
    g[a] = yc - allSprites[a].y;
    h[a] = (g[a]/yc)*100;
  }else if(allSprites[a].y > yc) {
    g[a] = allSprites[a].y - yc;
    h[a] = (g[a]/yc)*100;
  }else {
    g[a]=0
    h[a]=0;
  }
    
  vx[a] = 100-e[a];
  vy[a] = 100-h[a];
  v[a] = (vx[a]+vy[a])/2
  cv[a] = v[a]/100;
  //colorMode = (HSB, 255)
  //allSprites[a].color = (255,255,cv[a]);
  if(cv[a] < 0) {
    cv[a] = 0;
  }
  allSprites[a].opacity = cv[a];
  // console.log(cv);
}

function playerMovement() {
  if(kb.pressing("w")) {
    player.y -= 5;
  }
  if(kb.pressing("a")) {
    player.x -= 5;
  }
  if(kb.pressing("s")) {
    player.y += 5;
  }
  if(kb.pressing("d")) {
    player.x += 5;
  }
}