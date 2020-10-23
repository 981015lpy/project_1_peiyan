import React from 'react'
import Sketch from 'react-p5'

// components
import mountain from './components/mountain'
import ground from './components/ground'
import tree from './components/tree'
import sun from './components/sun'
import person from './components/person'

const canvasWidth = document.body.clientWidth
const canvasHeight = document.body.clientHeight

export default class Assignment extends React.Component {
  
   movement = (p5, startPoint, targetPoint, speed) => {
    if (startPoint.x > targetPoint.x) startPoint.x -= speed
    if (startPoint.x < targetPoint.x) startPoint.x += speed
    if (startPoint.y < targetPoint.y) startPoint.y += speed
    if (startPoint.y > targetPoint.y) startPoint.y -= speed
    p5.translate(startPoint.x,startPoint.y)
   }
  
  render() {

    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef)
      p5.resizeCanvas(canvasWidth, canvasHeight)
    }

    let mountainMoveSpeed = 1
    let mountainPoint = Math.random()

    let personPosition = { x: canvasWidth / 2, y: canvasHeight - 100}
    
    const draw = (p5) => {
      p5.background(210)
      
      
      // create the sun
      sun(p5, 400, 250, 150)

      // create the mountain group
      setTimeout(() => {
        mountainPoint -= mountainMoveSpeed
      }, 10)
      mountain(p5, canvasWidth, canvasHeight, 600, 5, mountainPoint)

      // create the black ground
      ground(p5, { x: 0, y: canvasHeight - 50 }, canvasWidth, 50)

      // create person
      person(p5, personPosition)
    }

    return (
      <div className="App">
        <Sketch setup={setup} draw={draw} />
      </div>
    )
  }
}
