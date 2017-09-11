var peak = true;
var valley = false;
var length = 3*window.devicePixelRatio;

// var canvas = document.getElementById("canvas");
var height = window.innerHeight * window.devicePixelRatio;
var width=window.innerWidth * window.devicePixelRatio;

canvas.width=width;
canvas.height=height;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

ctx = canvas.getContext("2d");

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

var harry = [valley];
var lastDraw;
var lastFold;

function Draw(arr,begindir) {  
	// Getting
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var t0 = performance.now();
  if(scale.value)
    length = scale.value*window.devicePixelRatio;
  var pos = {x:width/2, y:height/2};
  var direction = begindir;
  

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  
  for (var i = 0; i < arr.length; i++) {
	  // getting
   if (arr[i]) {
     direction++;
   } else {
    direction--;
  }

    // wrapping around
    if (direction>4) {
     direction=1;
   }
   if (direction<1) {
     direction=4;
   }

    // Drawing
    if (direction==1) { // up
    	pos.y+=length;
    }
    if (direction==2) { // right
    	pos.x+=length;
    }
    if (direction==3) { // down
    	pos.y-=length;
    }
    if (direction==4) { // left
    	pos.x-=length;
    }
    
    ctx.lineTo(pos.x, pos.y);
  }
  ctx.stroke();
// Drawing
var t1 = performance.now();
lastDraw = ("Draw: " + (t1 - t0).toFixed(2) + " milliseconds.");
}

function Fold(arr) {
  var t0 = performance.now();
  var newArray = [];
  var index=0;
  //Based on a new forumla, goes straight into new array, every even number adds a Valley plus peak before
  //and the odd based ones remain as they are (the previous folds). untouched.
  for (var i = 0; i < arr.length; i++) {
    if (i % 2 == 0) { //0 based odd
      newArray[index+1]=arr[i];
      newArray[index]=valley;
      newArray[index+2]=peak;
      index+=3;      
    }else{
      newArray[index++]=arr[i];
    }
  }
  harry=newArray;

  var t1 = performance.now();
  lastFold = ("Fold: " + (t1 - t0).toFixed(2) + " milliseconds.");
}

function asyncFold(iteration){
  var promise = new Promise(function(resolve, reject) {
    console.log("Harry is " + harry.length + " years old" );
    Fold(harry);
    Draw(harry,1);
    debug.innerHTML = "LastFold: " + lastFold + "   LastDraw : " +lastDraw;
    resolve("Stuff worked!");    
  });
  return promise;
}

function start(val){  

  if(val == null || val == undefined)
   it = iterations.value;

 asyncFold(it).then(function(result) {     
  console.log(result);
  it--;
  console.log("it is at " + it);
  if(it>0)
    start(it);
}, function(err) {

  console.log(err); 
});



}

ctx.strokeStyle="#FF0000";
