import React from "react";
import Sketch from "react-p5";

const Mandala = (props) => {

  const { mandala, } = props;

  let p5Instance = null;


  const setup = (p5, canvasParentRef) => {
    // let width = window.innerWidth;
    // let height = window.innerHeight;

    p5Instance = p5;

    var canvasDiv = document.getElementById('myCanvas');


    let width = canvasDiv.clientWidth;
    let height = canvasDiv.clientHeight;

    // let height = window.innerHeight;
    // let canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    let canvas = p5.createCanvas(width, height).parent("myCanvas");
    p5.background(255); // color the background
    p5.angleMode(p5.DEGREES); // use degrees
    p5.translate(width / 2, height / 2); // center the drawing

    let ang = 360 / mandala.pedals;

    for (let j = mandala.layers; j > 0; j--) {
      
      // const config = getConfig(j);
      let x1 = mandala.list[j][0];
      let x2 = mandala.list[j][1];
      let x3 = mandala.list[j][2];
      let x4 = mandala.list[j][3];
      let y2 = mandala.list[j][4];
      let y3 = mandala.list[j][5];

      // fullConfig.push(config)
      // console.log(j, config);

      p5.fill(255, 255, 255)

      // draw the pedals for each layer
      for (let i = 0; i < mandala.pedals; i++) {
        p5.strokeWeight(1);
        p5.beginShape();
        p5.curveVertex(x1, 0);
        p5.curveVertex(x1, 0);
        p5.curveVertex(x2, y2);
        p5.curveVertex(x3, y3);
        p5.curveVertex(x4, 0);
        p5.curveVertex(x4, 0);
        p5.endShape();
        p5.beginShape();
        p5.curveVertex(x1, 0);
        p5.curveVertex(x1, 0);
        p5.curveVertex(x2, -y2);
        p5.curveVertex(x3, -y3);
        p5.curveVertex(x4, 0);
        p5.curveVertex(x4, 0);
        p5.endShape();
        p5.strokeWeight(5);
        p5.rotate(ang);
      } p5.rotate(ang / 2);
    }
    

    // mandala.push(fullConfig)
    // console.log(fullConfig)

    // console.log(">>>", activeStep)

    // p5.saveCanvas(canvas, 'myCanvas', 'png');
  };

  const draw = (p5) => {
  };

  const handleCanvasClick = (p5) => {
    p5Instance.saveCanvas('myCanvas', 'png');
  };
  
  return (
    <div id="myCanvas" style={{width: "100vw", height: 500,}}>
      <Sketch setup={setup} draw={draw} />
      <button onClick={handleCanvasClick}>Save Canvas</button>
    </div>
    );
};

export default Mandala