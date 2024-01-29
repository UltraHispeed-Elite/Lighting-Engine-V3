var player;

var img_v;

var lightPoint = [
    [266, 294],
    [507,659]
];

var vals = [];
vals.length = lightPoint.length;

var closest_light = 0;

var pointCount = 0;

function setup() {
  createCanvas(800,800);
  
  player = new Sprite(200,200,50,50);
  player.img = 'ghost2.png'

  img_v = new Sprite(400,400,800,800);
  img_v.collider = 'n'
  img_v.img = 'hello2.png';
}

function draw() {
  background('purple');
  
  player_movement();
  find_shortest();
  shade_engine();
  console.log(vals, closest_light);
}

function player_movement(){
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

function find_shortest() {
  for(let i=0; i<lightPoint.length; i++) {
    calculate_distance(i);
    for(let j=0; j<lightPoint.length; j++) {
      if(j===i) {
        //console.log("same light point");
      }else {
        if(vals[j] > vals[i]){
          pointCount += 1;
          if(pointCount === (lightPoint.length-1)) {
            closest_light = i;
            console.log(closest_light);
          }
        }else {
            pointCount = 0;
          }
      }
    }
    }
}

function calculate_distance(a) {
  let val1, val2, val3;
  
  if(player.x > lightPoint[a][0]) {
    val1 = player.x - lightPoint[a][0];
  }else {
    val1 = lightPoint[a][0] - player.x;
  }
  
  if(player.y > lightPoint[a][1]) {
    val2 = player.y - lightPoint[a][1];
  }else {
    val2 = lightPoint[a][1] - player.y;
  }
  
  val3 = (val1+val2)/2;
  vals[a] = val3;
}

function shade_engine() {
    if(player.x<lightPoint[closest_light][0]){
        e = lightPoint[closest_light][0] - player.x;
        f = (e/lightPoint[closest_light][0])*100;
    }else if(player.x>lightPoint[closest_light][0]) {
        e = player.x - lightPoint[closest_light][0];
        f = (e/lightPoint[closest_light][0])*100;
    }else {
        e = 0;
        f = 0;
    }

    if(player.y<lightPoint[closest_light][1]){
        g = lightPoint[closest_light][1] - player.y;
        h = (g/lightPoint[closest_light][1])*100;
    }else if(player.y>lightPoint[closest_light][1]) {
        g = player.y - lightPoint[closest_light][1];
        h = (g/lightPoint[closest_light][1])*100;
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

    img_v.opacity = 1-cv;

    console.log(img_v.opacity);
}
