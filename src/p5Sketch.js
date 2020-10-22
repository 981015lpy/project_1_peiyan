import React from 'react'
import Sketch from "react-p5"
import './App.scss'

let pointArray = []

export default class P5Sketch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // create a person
  createPerson = (p5, head_radius, position, pointArray, stepCount) => {
    let body_width = head_radius - 10
    let body_height = head_radius + 5

    let arm1 = {
      startPoint: { x: position.x - 9, y: position.y + head_radius - 10},
      endPoint: { x: position.x - 15, y: position.y+ head_radius }
    }

    let arm1_1 = {
      startPoint: arm1.endPoint,
      endPoint: { x: arm1.endPoint.x + 16, y: arm1.endPoint.y - 5 }
    }

    let arm2 = {
      startPoint: { x: position.x + 9, y: position.y + head_radius - 10},
      endPoint: { x: position.x + 25, y: position.y + head_radius - 15 }
    }

    let leg1 = {
      startPoint: { x: position.x - 5, y: position.y + body_height + 10},
      endPoint: { x: position.x - 15, y: position.y + body_height + 33 }
    }

    let leg2 = {
      startPoint: { x: position.x + 5, y: position.y + body_height + 10},
      endPoint: { x: position.x + 15, y: position.y + body_height + 5 }
    }

    let leg2_1 = {
      startPoint: leg2.endPoint,
      endPoint: { x: leg2.endPoint.x - 10, y: leg2.endPoint.y + 15 }
    }
    // p5.noStroke()
    p5.fill('#ff0')
    p5.stroke('#000')
    p5.ellipse(position.x, position.y + head_radius, body_width, body_height) // body
    p5.ellipse(position.x, position.y, head_radius, head_radius) // head

    // arm group
    
    p5.line(arm1.startPoint.x,arm1.startPoint.y,arm1.endPoint.x,arm1.endPoint.y) 
    p5.line(arm1_1.startPoint.x, arm1_1.startPoint.y, arm1_1.endPoint.x, arm1_1.endPoint.y) 
    p5.line(arm2.startPoint.x, arm2.startPoint.y, arm2.endPoint.x, arm2.endPoint.y) 
    
    // leg group
    p5.line(leg1.startPoint.x, leg1.startPoint.y, leg1.endPoint.x, leg1.endPoint.y) 
    p5.line(leg2.startPoint.x, leg2.startPoint.y, leg2.endPoint.x, leg2.endPoint.y) 
    p5.line(leg2_1.startPoint.x, leg2_1.startPoint.y, leg2_1.endPoint.x, leg2_1.endPoint.y) 

    if (pointArray.length > 0 && stepCount > 0) this.movement(p5, position, { x: pointArray[stepCount - 1].x, y: pointArray[stepCount - 1].y - 60 }, 1)
  }

  // create a mountain
  createMountain = (p5, startPoint) => {
    pointArray = [startPoint]

    let stepArray = [200, 100, 250, 100, 400, 100, 200]
    for (let i = 0; i < 8; i++) {
      pointArray.push(getTargetPoint(pointArray[i], stepArray[i], i % 2 === 0))
      if ( i > 0) drawLine(pointArray[i - 1], pointArray[i])
    }

    function getTargetPoint (point, step, upFlag) {
      if(upFlag) return { x: point.x + step, y: point.y - step}
      else return { x: point.x + step, y: point.y + step}
    }

    function drawLine(point1, point2) {
      p5.stroke('#000')
      p5.line(point1.x, point1.y, point2.x, point2.y)
    }
  }

  createRainLine = (p5, startPoint) => {
    p5.line(startPoint.x, startPoint.y, getRainEndPoint(startPoint, 40).x, getRainEndPoint(startPoint, 40).y)

    function getRainEndPoint(point, length) {
      return {x: point.x + length ?? 100, y: point.y + length ?? 100}
    }
  }

  createOneCloud = (p5, cloud, radius) => {
    p5.fill('#acacac')
    p5.stroke('#acacac')
    p5.ellipse(cloud.x, cloud.y, radius)
    p5.ellipse(cloud.x - 40, cloud.y, radius - 15)
    p5.ellipse(cloud.x + 40, cloud.y, radius - 15)
    p5.ellipse(cloud.x - 70, cloud.y, radius - 35)
    p5.ellipse(cloud.x + 70, cloud.y, radius - 35)
  }

  createRaining = (p5, cloudArray, rainArr, speed, stepCount) => {
    cloudArray.map(item => {
      this.createOneCloud(p5, item.point, item.r)
      return null
    })
    rainArr.map(item => {
      this.createRainLine(p5, item)
      return null
    })
    if (stepCount === 2 || stepCount === 3 || stepCount === 4) {
      cloudArray.map(item => {
        this.movement(p5, item.point, {x: item.point.x + 1000, y: item.point.y}, speed)
        return null
      })
      rainArr.map(item => {
        this.movement(p5, item, {x: item.x + 1000, y: item.y}, speed)
        return null
      })
    }
  }

  // movement animation
  movement = (p5, startPoint, targetPoint, speed) => {
    if (startPoint.x > targetPoint.x) startPoint.x -= speed
    if (startPoint.x < targetPoint.x) startPoint.x += speed
    if (startPoint.y < targetPoint.y) startPoint.y += speed
    if (startPoint.y > targetPoint.y) startPoint.y -= speed
    p5.translate(startPoint.x,startPoint.y)
  }

  render() {
    let stepCount = 0
    let stepWords = [
      "I WILL CONQUER THIS MOUNTAIN!",
      "Let's start the journery right now!",
      "HAPPPPY! FIGHTING!",
      "Oh! I am falling! But it is only a small trouble!",
      "Come On! Even it is quite hard, but I am close to WINNING!",
      "Too Upset!!!! Why this is not the final peak!!!",
      "THANKS TO My Dear friends, I will keep moving, never give up!",
      "I am not afraid of any failure now! I am aheading to the higher peak! ",
      "KEEP CLIMBING! NEVER GIVE UP!"
    ]
    let button, greeting

    let canvasWidth = 1450
    let canvasHeight = 780

    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

      button = p5.createButton('GO AHEAD!');
      button.position(50, 50);
      button.mousePressed(() => {
        console.log(pointArray)
        stepCount++
        greeting.html(stepWords[stepCount] ?? 'THANKS FOR WATCHING');
      });

      greeting = p5.createElement('h2', stepWords[stepCount] ?? 'no word');
      greeting.position(200, 20)
      p5.textSize(20)
    };

    let personPostion = { x: 50, y: canvasHeight - 60 }
    
    let cloudArray = [
      { point: {x: -900, y: 50}, r: 70 },
      { point: {x: -700, y: 150}, r: 60 },
      { point: {x: -500, y: 100}, r: 90 },
      { point: {x: -200, y: 130}, r: 65 }
    ]

    let rainArr = [
      { x: -700, y: 200 },
      { x: -670, y: 230 },
      { x: -670, y: 330 },
      { x: -470, y: 800 },
      { x: -270, y: 300 },
      { x: -370, y: 400 },
      { x: -180, y: 210 },
      { x: -500, y: 200 },
      { x: -450, y: 210 },
      { x: -520, y: 310 },
      { x: -580, y: 110 },
      { x: -390, y: 180 },
      { x: -600, y: 500 },
      { x: -570, y: 460 },
      { x: -450, y: 480 },
      { x: -120, y: 280 },
      { x: -50, y: 180 },
      { x: -50, y: 250 },
      { x: -20, y: 200 },
      { x: -180, y: 350 },
    ]

    const draw = (p5) => {
      p5.background(230);

      // create mountain
      let mountainStartPoint = { x: 200, y: canvasHeight}
      p5.push()
      this.createMountain(p5, mountainStartPoint)
      p5.pop()
      
      // create person
      p5.push()
      this.createPerson(p5, 30, personPostion, pointArray, stepCount)
      
      p5.pop()

      // create raining cloud
      p5.push()
      this.createRaining(p5, cloudArray, rainArr, 4, stepCount)
      p5.pop()
    };

    return (
      <div className="App">
        <Sketch setup={setup} draw={draw} />
      </div>
    )
  }
}
