//////////////////////
// Global Vars
///////////////////////

//////Slider

//state check
let dragging = false; // Is the slider being dragged?
let rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
let sliderx = 100;
let slidery = 50;
let barw = 10;
let barh = 50;
// Start and end of slider
let sliderStart = 0;
let sliderEnd = 1050;
let sliderLength = sliderEnd-sliderStart;
//console.log(sliderLength);

// Offset for dragging slider
let offsetX = 0;

///////Page elements
let brooklyn = sliderStart;
let bronx = sliderLength/5;
let manhat = sliderLength/5*2;
let queens = sliderLength/5*3;
let staten = sliderLength/5*4;
let borough = [0, bronx, manhat, queens, staten];
let boroughlabel = ["Brooklyn", "Bronx", "Manhattan", "Queens", "Staten Island"];
//console.log(borough);



//label dimensions
let labelw = sliderLength/5;
let labelh = 20;
let labelpad = sliderLength/10;

// Numbering

  //Community Boards
  //Bronx - 12
  //Brooklyn - 18
  //Manhattan - 12
  //Queens - 14
  //Staten Island - 3

let bkNum = 18;
let bxNum = 12;
let mNum = 12;
let qNum = 14;
let sNum = 3;

let bkTicks = labelw/bkNum;
let bxTicks = labelw/bxNum;
let mTicks = labelw/mNum;
let qTicks = labelw/qNum;
let sTicks = labelw/sNum;

let numArray = [bkNum, bxNum, mNum, qNum, sNum];
let ticksArray = [bkTicks, bxTicks, mTicks, qTicks, sTicks];


let currentB;
//console.log(currentB);
let boroughON;
//console.log(boroughON);
let currentTicks;
//console.log(currentTicks);
//add function to therefore get number of ticks
let radioStation;

//let boardInfo;
let data;
let website;
let boardnumber;
let boroughname;

///////////////////////
// Preload sounds
//////////////////////

function preload() {

  //preload the sounds
  soundFormats('m4a', 'mp3');
  //soundtest1 = loadSound('sounds/Nycb_test_1.m4a');
  //soundtest2 = loadSound('sounds/Nycb_test_2.m4a');
  //brooklyn_1a = loadSound('sounds/brooklyn_1a.m4a');
  brooklyn_1b = loadSound('sounds/brooklyn_1b.m4a');
  bronx_11 = loadSound('sounds/bonx_11.m4a');
  manhat_9 = loadSound('sounds/manhattan_9.mp3');
  manhat_12 = loadSound('sounds/manhattan_12.m4a');
  queens_6 = loadSound('sounds/queens_6.m4a');
  queens_9 = loadSound('sounds/queens_9.m4a');
  staten_3 = loadSound('sounds/staten_3.m4a');

  static = loadSound('sounds/static.mp3');

  //preload the data
  //boardInfo = loadTable('data/community_boards_upload.csv', 'csv', 'header');
  data = loadJSON('data/community_boards_formatted.json');

}


/////////////////////////
// Setup
////////////////////////

function setup() {
  createCanvas(1055, 150);

  //console.log(data.boards[0].Website);
  boroughname = select('#Boroughtext');
  boardnumber = select('#Numbertext');
  websitelabel = select('#Website');
  //console.log(boardnumber.value());



}

////////////////////////
// Draw
////////////////////////

function draw() {
  ////colors
  let teal = color('#3AB08B');
  let darkorange = color('#F36E44');
  let lightorange = color('#E09634');
  let purple = color('#7E81BE');
  let yellow = color('#DFD638');
  let blue = color('#3C558F');
  let lightgreen = color('#91B489');
  let darkgreen = color('#3E5F33');

  background(teal);
  // fill(0);
  // rect(sliderStart, slidery-barh, sliderLength, barh*4);

  //make rectangles for borough labels
  fill(purple);
  //stroke(0);
  strokeWeight(3);

  for (let i = 0; i < borough.length; i++){
    rect(sliderStart + borough[i], slidery-labelh, labelw, labelh);
  }

  //Add Text
  textAlign(CENTER, BOTTOM);
  noStroke();
  fill(0);

  for (let i = 0; i < boroughlabel.length; i++){
    text(boroughlabel[i], sliderStart+borough[i]+labelpad, slidery);
  }

  //Add number labels
  textSize(14);
  textStyle(NORMAL);
  noStroke();

  let numText = [1,".", ".", ".", 5, ".", ".", ".", ".", 10, ".", ".", ".", ".", 15, ".", ".", "."];
  //console.log(bkText);

  for (j = 0; j < numArray.length; j++){
    //stroke(0);
    fill(0);
    for (let i = 0; i < numArray[j]; i++){
      text(numText[i], sliderStart+borough[j]+ticksArray[j]*i, slidery+barh+15);
    }
  }

  //write out community board Number
  textAlign(LEFT);

  //add function to get borough you are in
  currentB = sliderx-sliderStart;
  //console.log(currentB);
  boroughON = (getBorough(currentB));
  //console.log(boroughON);
  currentTicks = (getTicks(boroughON));
  //console.log(currentTicks);
  //add function to therefore get number of ticks
  radioStation = getCB(boroughON, currentTicks)+1;
  //console.log(radioStation);


  //console.log(radioStation);
  //console.log(boroughON);


  //text("Community Board Number: " + (radioStation), sliderStart, slidery-labelh*4);
  let webNum = getWebsite(boroughON);
  boardnumber.html(radioStation);

  let bname = data.boards[(webNum-1)].Borough;
  boroughname.html(bname);

  let webaddress = data.boards[(webNum-1)].Website;
  websitelabel.html(webaddress);
  //text("Website: " + webaddress , sliderStart, slidery-labelh*3);
  //let readby = data.boards[(webNum-1)].Who?;


  ///////////////////////////
  // Make Slider Bars
  ///////////////////////////

  // Check to see if slider is being dragged
  if (dragging) {
    sliderx = mouseX + offsetX;
  }

  // Keep rectangle within limits of slider
  sliderx = constrain(sliderx, sliderStart, sliderLength-barw+sliderStart);

  // Draw a rect for bar
  stroke(0);
  fill(darkorange);
  rect(sliderStart, slidery, sliderLength, barh);
  //line(sliderStart, slidery + barh / 2, sliderEnd, slidery + barh / 2);

  // Draw rectangle for slider
  fill(blue);
  rect(sliderx, slidery, barw, barh);

  stroke(0);
  // Fill rectanngles according to state
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }

}


//////////////////////////
// Functions
/////////////////////////

function mousePressed() {
  // Did I click on slider?
  if (mouseX > sliderx && mouseX < sliderx + barw && mouseY > slidery && mouseY < slidery + barh) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = sliderx - mouseX;
    //play static
    static.setVolume(0.1);
    static.play();
  }

  //stop playing sounds
  //brooklyn_1a.stop();
  brooklyn_1b.stop();
  bronx_11.stop();
  queens_6.stop();
  queens_9.stop();
  manhat_9.stop();
  manhat_12.stop();
  staten_3.stop();

}

function mouseReleased() {
  // Stop dragging
  dragging = false;
  static.pause();

  //brooklyn
  if (radioStation == 1 & boroughON == brooklyn) {
  //  brooklyn_1a.setVolume(0.1);
  //  brooklyn_1a.play();
    brooklyn_1b.setVolume(0.1);
    brooklyn_1b.play();
  }

  //brooklyn
  if (radioStation == 11 & boroughON == bronx) {
  //  brooklyn_1a.setVolume(0.1);
  //  brooklyn_1a.play();
    bronx_11.setVolume(0.2);
    bronx_11.play();
  }

  //queens
  if (boroughON == queens) {

    if (radioStation == 6){
      queens_6.setVolume(0.1);
      queens_6.play();
    }

    if (radioStation == 9){
      queens_9.setVolume(0.1);
      queens_9.play();
    }
  }

  //manhattan
  if (boroughON == manhat){

    if (radioStation == 9){
      manhat_9.setVolume(0.1);
      manhat_9.play();
    }

    if (radioStation == 12){
      manhat_12.setVolume(0.3);
      manhat_12.play();
    }
  }

  if (radioStation == 3 & boroughON == staten){
    staten_3.setVolume(0.1);
    staten_3.play();
  }
}

//get communnity board number from
//number returned will be one less than actual community board number
//this makes it easer to use in an array
function getCB (cb, ticks){
  let cbNum;

  if (cb == brooklyn) {
    cbNum = floor((sliderx-cb)/ticks);
  }
  else {
    cbNum = floor((sliderx - cb - sliderStart)/ticks);
  }
  return cbNum;
}


//function to get borough
function getBorough (currentB){

  if(currentB >= brooklyn & currentB < bronx){
    return brooklyn;
  }
  else if (currentB >= bronx & currentB < manhat){
    return bronx;
  }
  else if (currentB >=manhat & currentB < queens){
    return manhat;
  }
  else if (currentB >=queens & currentB <staten){
    return queens;
  }
  else if (currentB >= staten){
    return staten;
  }

}

function getTicks (boroughON) {

  if (boroughON == brooklyn) {
    return(ticksArray[0]);
  }
  else if (boroughON == bronx) {
    return(ticksArray[1]);
  }
  else if (boroughON == manhat) {
    return(ticksArray[2]);
  }
  else if (boroughON == queens) {
    return(ticksArray[3]);
  }
  else if (boroughON == staten) {
    return(ticksArray[4]);
  }
}

function getWebsite (boroughON){

  if (boroughON == brooklyn){
    website = radioStation;
    return website;
  }
  if (boroughON == bronx){
    website = radioStation + bkNum;
    return website;
  }
  if (boroughON == manhat){
    website = radioStation + bkNum + bxNum;
    return website;
  }
  if (boroughON == queens){
    website = radioStation + bkNum + bxNum + mNum;
    return website;
  }
  if (boroughON == staten){
    website = radioStation + bkNum + bxNum + mNum +qNum;
    return website;
  }
}
