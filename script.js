let wheel = document.getElementById('wheel');
let resetBtn = document.getElementsByClassName('reset-btn')[0];
let rotation = 0;
let scale = 1;
let slowingDown = false;
let pressed = {};

window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);

function handleKeyDown(e) {
  if (e.keyCode === 32 && slowingDown === false) {
    animateKeyOut();
    if (pressed[e.which]) return;
    pressed[e.which] = e.timeStamp;
  }
};

function handleKeyUp(e) {
  if (e.keyCode === 32) {
    animateKeyIn();
    spinThatWheel(e);
  }
};

function animateKeyOut() {
  scale -= 0.03;
  if (scale < 0.5) return;
  TweenMax.to(resetBtn, 0.5, {ease: Sine.easeOut, scale: scale});
}

function animateKeyIn() {
  scale = 1;
  TweenMax.to(resetBtn, 0.25, {scale: scale});
}

function spinThatWheel(e) {
  if ( !pressed[e.which] ) return;
  let duration = Math.floor((e.timeStamp - pressed[e.which]) / 75);
  
  if (duration > 100) duration = 100;
  
  animateWheel(duration);
  slowingDown = true;
 
  pressed[e.which] = 0;
};

function animateWheel(duration) {
  let randomNum = Math.floor((Math.random() * 10));
  rotation += (30 * duration) + (30 * randomNum);
   
  TweenMax.to(wheel, 20, {
    ease: Power4.easeOut,
    rotation: rotation,
    onComplete: guess
  });
}

function guess() {
  var x = prompt('Enter your guess:');
  var x = x.toUpperCase();
  if(x =='H' || x=='A' || x =='P' || x =='Y' || x =='S' || x=='T' || x=='D' || x=='F' || x=='R' || x=='O' || x=='M' || x=='W' || x=='N'){
    updateGameBoard(x);
  } 
  else{
    alert('Sorry wrong answer, try again!');
  }
  
 resetWheel();
}

 function updateGameBoard(x) {
  var store = document.querySelectorAll('.inner ' +'.' +x);
  for(var i=0; i<store.length; i++){
    store[i].innerHTML = '<p>' + x +'</p>';
  }
  
   //document.querySelectorAll('.inner .P').innerHTML = '<p>P</p>';
  
} 

function resetWheel() {
  slowingDown = false;
};