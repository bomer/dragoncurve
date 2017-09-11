var peak = true;
var valley = false;
var length = 5*window.devicePixelRatio;

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

function Draw(arr,begindir) {
	// Getting
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
	  ctx.stroke();


  }
// Drawing
}

function Fold(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (i % 2 == 0) { //0 based odd
      arr.insert(i, valley);
      arr.insert(i + 2, peak);
      i += 2;
    }
  }
}

function start(){
  var it = iterations.value;
  (function myLoop (i) {          
   setTimeout(function () {   
     Fold(harry);
     Draw(harry,1);
    // Draw(harry,2);
    // Draw(harry,3);
    // Draw(harry,4);
    if (--i){ 
      myLoop(i);
      }      //  decrement i and call myLoop again if i > 0
    }, 500)
 })(it);  
}

// Draw(harry,1);;
ctx.strokeStyle="#FF0000";
//Draw(harry,3);
//ctx.strokeStyle="#0000FF";
//Draw(harry,2);
//ctx.strokeStyle="#00FF00";
//Draw(harry,4);