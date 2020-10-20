import React from 'react'
import './App.scss'

export default class App extends React.Component {
  state = {
    
  }

  componentDidMount() {
    this.createPerson()
    this.createMountain()
  }

  createMountain = () => {
    const point1 = { x: 100, y: document.getElementById('mountain').height }
    const point2 = { x: point1.x + 200, y: point1.y - 200 }
    const point3 = { x: point2.x + 100, y: point2.y + 100 }
    const point4 = { x: point3.x + 250, y: point3.y - 250 }
    const point5 = { x: point4.x + 100, y: point4.y + 100 }
    const point6 = { x: point5.x + 400, y: point5.y - 400 }
    const point7 = { x: point6.x + 100, y: point6.y + 100 }
    const point8 = { x: point7.x + 200, y: point7.y - 200 }
    
    this.createLine('mountain', point1, point2)
    this.createLine('mountain', point2, point3)
    this.createLine('mountain', point3, point4)
    this.createLine('mountain', point4, point5)
    this.createLine('mountain', point5, point6)
    this.createLine('mountain', point6, point7)
    this.createLine('mountain', point7, point8)
  }

  createPerson = () => {
    const headRadius = 10
    const headX = headRadius + 10
    const headY = headRadius + 10

    const bodyStartPoint = { x: headX, y: headRadius * 2 + 10 }
    const bodyStopPoint = { x: headX, y: headY * 2.4 }

    const armStartPoint = {x: bodyStartPoint.x, y: bodyStartPoint.y + 10}
    const rightArmStopPoint = { x: bodyStartPoint.x + 20, y: bodyStartPoint.y - 1 }
    const leftArmStopPoint = { x: bodyStartPoint.x - 10, y: bodyStartPoint.y + 9 }

    const leftArmStartPoint2 = { x: leftArmStopPoint.x, y: leftArmStopPoint.y}
    const leftArmStopPoint2 = { x: rightArmStopPoint.x - 10, y: rightArmStopPoint.y}
    
    const leftLegStartPoint = {x: bodyStopPoint.x, y: bodyStopPoint.y}
    const leftLegStopPoint = { x: bodyStopPoint.x - 20, y: bodyStopPoint.y + 20 }
    
    const rightLegStartPoint = {x: bodyStopPoint.x, y: bodyStopPoint.y}
    const rightLegStopPoint = { x: bodyStopPoint.x + 15, y: bodyStopPoint.y - 5 }
    
    const rightLegStartPoint2 = {x: rightLegStopPoint.x, y: rightLegStopPoint.y}
    const rightLegStopPoint2 = {x: rightLegStopPoint.x - 10, y: rightLegStopPoint.y + 15 }

    this.createCircle('person', headX, headY, headRadius)
    this.createLine('person', bodyStartPoint, bodyStopPoint)
    this.createLine('person', armStartPoint, rightArmStopPoint)
    this.createLine('person', armStartPoint, leftArmStopPoint)
    this.createLine('person', leftArmStartPoint2, leftArmStopPoint2)
    this.createLine('person', leftLegStartPoint, leftLegStopPoint)
    this.createLine('person', rightLegStartPoint, rightLegStopPoint)
    this.createLine('person', rightLegStartPoint2, rightLegStopPoint2)
  }

  createCircle = (domID, x, y, r) => {
    var c = document.getElementById(domID);
    if (c) {
      var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2*Math.PI);
      ctx.stroke();
    }
  }

  createLine = (domID, startPoint, stopPoint) => {
    var c = document.getElementById(domID);
    if (c) {
      var ctx=c.getContext("2d");
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(stopPoint.x, stopPoint.y);
      ctx.stroke();
    }
  }

  goAhead = () => {
    const personObj = document.getElementById("person")
    var xy = this.getXY(personObj)

    var flag = true;
    var left = xy.x;

    function renderPerson() {
      if (flag) {
        if (left - xy.x >= 10) flag = false
        personObj.style.left = ` ${left++}px`
      }
    }

    // requestAnimationFrame效果
    (function animloop() {
        renderPerson();
        window.requestAnimationFrame(animloop);
    })();
  }


  getXY = (obj) => {
    var x = 0,y = 0;
    if (obj.getBoundingClientRect) {
        var box = obj.getBoundingClientRect();
        var D = document.documentElement;
        x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
        y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop
    }
    else{
        for (; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent) {}
        }
        return {
        x: x,
        y: y
    }
  }

  render() {
    return (
      <div className="App">
        <div className="operationBar">
          <button onClick={() => this.goAhead()}>KEEP MOVING</button>
        </div>
        <canvas id="person" width="50" height="60"/>
        <canvas id="mountain" width="1440" height="762"/>
      </div>
    )
  }
}
