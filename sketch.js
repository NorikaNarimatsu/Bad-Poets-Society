let natural;

function setup() {
  natural = require('natural')
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}


function draw() {
  background(220);

  console.log('Hold Tight! Generating poem(s)')
  
  const generatedPoems = generatePoem(inspirationSet);
  let lines = '';
  for (let i = 0; i < generatedPoems.length; i++) {
    console.log(`%c Generated poem ${i+1}:`, 'background: #222; color: #bada55');
    console.log(`%c${generatedPoems[i]}`, 'background: #fff; color: #0000FF');
    lines += generatedPoems[i] + '\n' + '**************************' +  '\n';
  }

  text(lines, width/2, height/2);
  

  
  frameRate(0.2)
}