/******************************* 
 * Author: Lucia (Mei Zhang)
 * Student number: 33692500
 * Programming date: 15/10/2022
 * 
 * Theme: Seasons
 * Interactions: 
 * 1) Home page and end page -> Brush effect
 * 2) Four seasons switch -> click the left mouse button
 * 3) The effect of the four seasons element will be generated randomly in a certain range following the mouse 
 * 4) In the [winter] scene, the "light source" can be created by pressing the [space]
*/




//canvas property
var canvasWidth = 500;
var canvasHight = 500;
var center_x = canvasWidth / 2;
var center_y = canvasHight / 2;


var brushSize = 9;
var clickNum = 0;

//LOGIC
function setup() {
  createCanvas(canvasWidth, canvasHight);

  preSettings();

}

function draw() {

  //document.write("frameCount: "+frameCount+"</br>");





  switch (clickNum) {
    case 0:
      brush();
      break;
    case 1:
      spring(mouseX, mouseY);
      break;
    case 2:
      summer(mouseX, mouseY);
      break;
    case 3:
      autumn(mouseX, mouseY);
      break;
    case 4:
      winter(mouseX, mouseY);
      break;

  }
}

function mouseClicked() {
  clickNum++;
  switch (clickNum) {
    case 1:
      eraser(clickNum);
      break;
    case 2:
      eraser(clickNum);
      break;
    case 3:
      eraser(clickNum);
      break;
    case 4:
      eraser(clickNum);
      break;
    case 5:
      eraser(clickNum);
      clickNum = 0;
      break;
  }
};






//DATA ACCESS
function eraser(clickNum) {

  clear();
  preSettings(clickNum);

}
function spring(x, y) {
  //spring
  stroke(seasonExe('Spring', 'r'), seasonExe('Spring', 'g'), seasonExe('Spring', 'b'));
  strokeWeight(1);
  //frameRate(10);
  noFill();

  arcDraw(nearMouse(x), nearMouse(y),
    generate('ellipseRadius'), generate('ellipseRadius'),
    generate('ellipse'), generate('ellipse'));


  triangleDraw(generate('x'), generate('x'), generate('x'), generate('lowerY'))
}
function summer(x, y) {

  //summer

  stroke(seasonExe('Summer', 'r'), seasonExe('Summer', 'g'), seasonExe('Summer', 'b'));
  strokeWeight(1);
  //frameRate(10);
  noFill();

  sinusoidDraw(nearMouse(x), nearMouse(y), 0.2, 0.2, generate('num'));
  squreDraw(generate('x'), generate('lowerY'), generate('num'));


}

function autumn(x, y) {


  //autumn
  stroke(seasonExe('Autumn', 'r'), seasonExe('Autumn', 'g'), seasonExe('Autumn', 'b'));
  strokeWeight(1);
  //frameRate(10);
  noFill();

  ///path 1: parallel lines
  //xPinStore = generate('xPin');
  //yPinStore = generate('yPin');
  //y2 will be calculated and executed in lineDraw()

  xPinStore = nearMouse(mouseX);
  yPinStore = nearMouse(mouseY) + 200;
  ellipse(xPinStore, nearMouse(mouseY), generate('ellipseRadius'));
  lineDraw(xPinStore, yPinStore, xPinStore, canvasHight);

  ///path 2: intersecting lines
  //lineDraw(generate('xPin'), generate('yPin'), generate('xPin'));

}

function winter(x, y) {


  //winter
  stroke(seasonExe('Winter', 'r'), seasonExe('Winter', 'g'), seasonExe('Winter', 'b'));
  strokeWeight(1);
  //frameRate(10);
  noFill();

  //(x2,y2)(x3,y3)(x4,y4) will be calculated and executed in lineDraw()
  bezierDraw(generate('coordinate_x'), generate('coordinate_y'));

  //winterPlus
  stroke(seasonExe('Winter_plus', 'r'), seasonExe('Winter_plus', 'g'), seasonExe('Winter_plus', 'b'));
  strokeWeight(generate('size'));
  //frameRate(10);
  noFill();
  pointDraw(generate('x'), generate('y'));




  if (keyIsDown(32)) {//key SPACE
    winterLight(x, y);
  }


}





//DATA
function brush() {
  strokeWeight(sizeCal(vilocity(pmouseX, pmouseY, mouseX, mouseY)));
  stroke(255);
  line(pmouseX, pmouseY, mouseX, mouseY);
}
function winterLight(x, y) {
  stroke(88, 67, 51);
  ellipse(x, y, 15, 15);
  stroke(225, 193, 99);
  ellipse(x, y, 10, 10);
  stroke(250, 241, 161);
  ellipse(x, y, 5, 5);

}
function lineDraw(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
}

function pointDraw(x, y) {
  point(x, y);
}
function triangleDraw(x1, x2, x3, y3) {
  triangle(x1, canvasHight + 50, x2, canvasHight + 50, x3, y3)
}
function arcDraw(x, y, r1, r2, start, stop) {

  arc(x, y, r1, r2, start, stop);

}

function squreDraw(x, y, s) {
  square(x, y, s);
}

function sinusoidDraw(x, y, xZoom, yZoom, counter) {//counter:the amount of basic arc


  var r = generate('radius');

  for (var i = 1; i < counter; i++) {
    //horizontal
    // arc((x - r * xZoom) + 2 * r * i * xZoom, y, r * xZoom, r * yZoom, 0, PI);
    // arc(x + 2 * r * i * xZoom, y, r * xZoom, r * yZoom, PI, TWO_PI);

    //vertical
    arc(x, (y - r * yZoom) + 2 * r * i * yZoom - 50, r * xZoom, r * yZoom, PI / 2, 3 * PI / 2);
    arc(x, y + 2 * r * i * yZoom - 50, r * xZoom, r * yZoom, 3 * PI / 2, PI / 2);
  }
}
function bezierDraw(x1, y1) {
  //y=kx+b
  x2 = generate('coordinate_x');
  k = generate('bezierK');
  y2 = k * x2 + generate('bezierB');

  x3 = generate('coordinate_x');
  y3 = k * x3 + generate('bezierB');

  x4 = generate('coordinate_x');
  y4 = k * x4 + generate('bezierB');

  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

}









function preSettings(clickNum) {
 background(0);
  switch (clickNum) {
    case 1:
      background(77,23,73);
      break;
    case 2:
      background(39,63,44);
      break;
    case 3:
      background(53,42,26);
      break;
    case 4:
      background(8,14,48);
      break;
  }

  frameRate(10);




  fill(19, 31, 37);
  stroke(126, 178, 204);

  textSize(20);
  textWrap(WORD);
  text('Lucia', canvasWidth - 80, canvasHight - 50, 100);
  textSize(10);
  textWrap(WORD);
  text('(MeiZhang)', canvasWidth - 80, canvasHight - 30, 25);
}
function seasonExe(season, rgb) {

  var results;
  if (season == 'Spring') {
    if (rgb == 'r') results = Math.floor(random(150, 255));
    else if (rgb == 'g') results = Math.floor(random(90, 200));
    else if (rgb == 'b') results = Math.floor(random(0, 120));

  }
  else if (season == 'Summer') {
    if (rgb == 'r') results = Math.floor(random(0, 170));
    else if (rgb == 'g') results = Math.floor(random(130, 2000));
    else if (rgb == 'b') results = Math.floor(random(150, 255));

  }
  else if (season == 'Autumn') {
    if (rgb == 'r') results = Math.floor(random(150, 255));
    else if (rgb == 'g') results = Math.floor(random(90, 200));
    else if (rgb == 'b') results = Math.floor(random(0, 120));
  }
  else if (season == 'Winter') {
    if (rgb == 'r') results = Math.floor(random(0, 50));
    else if (rgb == 'g') results = Math.floor(random(0, 160));
    else if (rgb == 'b') results = Math.floor(random(100, 200));
  }
  else if (season == 'Winter_plus') {
    if (rgb == 'r') results = Math.floor(random(200, 255));
    else if (rgb == 'g') results = Math.floor(random(200, 255));
    else if (rgb == 'b') results = Math.floor(random(200, 255));

  }
  return results;
}
function vilocity(pmouseX, pmouseY, mouseX, mouseY) {
  var delta;
  delta = sqrt(sq(mouseX - pmouseX) + sq(mouseY - pmouseY));
  var v = 1 / delta;
  return v;
}

function sizeCal(v) {
  var size;
  //y=kx+b
  size = brushSize * v;
  return size;
}

function nearMouse(mouse) {
  var near;
  near = mouse + generate('near');

  return near;
}

function generate(name) {
  switch (name) {
    //positions
    case 'coordinate_x':
      return Math.floor(random(-50, canvasWidth));
    case 'coordinate_y':
      return Math.floor(random(-50, canvasHight));
    case 'x':
      return Math.floor(random(0, canvasWidth));
    case 'y':
      return Math.floor(random(0, canvasHight));
    case "near"://nearMouse()
      return Math.floor(random(-25, 25));

    case 'leftX':
      return Math.floor(random(0, canvasWidth / 3));
    case 'upperY':
      return Math.floor(random(0, canvasHight / 3));

    case 'rightX':
      return Math.floor(random(2 * canvasWidth / 3, canvasWidth));
    case 'lowerY':
      return Math.floor(random(2 * canvasHight / 3, canvasHight));

    //spring
    case 'ellipse':
      return Math.floor(random(0, 2 * PI));
    case 'ellipseRadius':
      return Math.floor(random(1, 25));


    //summer
    case 'num':
      return Math.floor(random(1, 8));
    case 'radius':
      return Math.floor(random(20, 90));
    case 'amount':
      return Math.floor(random(50, 100));

    //autumn
    // case 'xPin':
    // return Math.floor(random(0, canvasWidth));
    // case 'yPin':
    // return Math.floor(random(0, canvasHight));



    //winter
    case 'size':
      return Math.floor(random(1, 5));
    case 'bezierK':
      return Math.floor(random(1, 10));
    case 'bezierB':
      return Math.floor(random(5, 500));

  }
}

