import React from 'react'
import './App.scss'

//TODO: CREATE A SUN
//TODO: CREATE THE croud/audience
//TODO: CREATE THE RAINBOW
export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      clickNum: 0,
      statement: "I WILL CONQUER THIS MOUNTAIN!",
      loading: false
    }
  }

  componentDidMount() {
    this.createPerson()
    this.createMountain()
    this.createRainingCloudGroup()
  }

  // create the mountain figure
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
    // this.createLine('mountain', point8, point8)
  }

  // create the person figure
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

    this.createCircle('person', headX, headY, headRadius, '#ff0')
    this.createLine('person', bodyStartPoint, bodyStopPoint)
    this.createLine('person', armStartPoint, rightArmStopPoint)
    this.createLine('person', armStartPoint, leftArmStopPoint)
    this.createLine('person', leftArmStartPoint2, leftArmStopPoint2)
    this.createLine('person', leftLegStartPoint, leftLegStopPoint)
    this.createLine('person', rightLegStartPoint, rightLegStopPoint)
    this.createLine('person', rightLegStartPoint2, rightLegStopPoint2)
  }

  // create cloud group
  createRainingCloudGroup = () => {
    let cloudDOM = document.getElementById('cloud')
    // cloudDOM.style.left = 0
    cloudDOM.style.top = '50px'
    cloudDOM.style.left = '-1000px'

    let cloud1 = { x: 150, y: 50, r: 40}
    let cloud2 = { x: 350, y: 150, r: 40}
    let cloud3 = { x: 550, y: 100, r: 40}
    let cloud4 = { x: 850, y: 130, r: 50}

    this.createOneCloud(cloud1)
    this.createOneCloud(cloud2)
    this.createOneCloud(cloud3)
    this.createOneCloud(cloud4)
    
    this.createRain()
  }
  // create one cloud
  createOneCloud = (cloud) => {
    this.createCircle('cloud', cloud.x, cloud.y, cloud.r, '#acacac', '#acacac')
    this.createCircle('cloud', cloud.x - 40, cloud.y, cloud.r - 5, '#acacac', '#acacac')
    this.createCircle('cloud', cloud.x + 40, cloud.y, cloud.r - 5, '#acacac', '#acacac')
    this.createCircle('cloud', cloud.x - 80, cloud.y, cloud.r - 15, '#acacac', '#acacac')
    this.createCircle('cloud', cloud.x + 80, cloud.y, cloud.r - 15, '#acacac', '#acacac')
  }

  // create the rain
  createRain = () => {
    const pointArr = [
      { x: 200, y: 200 },
      { x: 230, y: 230 },
      { x: 230, y: 330 },
      { x: 430, y: 800 },
      { x: 630, y: 300 },
      { x: 530, y: 400 },
      { x: 720, y: 210 },
      { x: 400, y: 200 },
      { x: 450, y: 210 },
      { x: 380, y: 310 },
      { x: 580, y: 110 },
      { x: 510, y: 180 },
      { x: 300, y: 500 },
      { x: 330, y: 460 },
      { x: 450, y: 480 },
      { x: 780, y: 280 },
      { x: 900, y: 180 },
      { x: 850, y: 250 },
      { x: 880, y: 200 },
      { x: 720, y: 350 },
    ]
    
    function getEndPoint(point, length) {
      return {x: point.x + length ?? 100, y: point.y + length ?? 100}
    }
    
    pointArr.map(item => {
      this.createLine('cloud', item, getEndPoint(item, 40))
    })
  }

  /**
   * @name: create circle line
   * @param {ReactDOM} domID
   * @param {Number} x : circle center point positionX 
   * @param {Number} y: circle center point positionY
   * @param {Number} r: circle radius
   */
  createCircle = (domID, x, y, r, color, lineColor) => {
    var c = document.getElementById(domID);
    if (c) {
      var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle=color;
      ctx.fill();
      ctx.strokeStyle=lineColor ? lineColor : "black";
      ctx.stroke();
    }
  }

  /**
   * @name: create straight line
   * @param {ReactDOM} domID
   * @param {object} startPoint: start position object, example: {x: 10, y: 10}
   * @param {object} stopPoint: stop position object, example: {x: 20, y: 30}
   */
  createLine = (domID, startPoint, stopPoint) => {
    var c = document.getElementById(domID);
    if (c) {
      var ctx=c.getContext("2d");
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(stopPoint.x, stopPoint.y);
      ctx.stroke();
    }
  }

  // click to moving
  goAhead = () => {
    const personObj = document.getElementById("person")

    const point1 = { x: 80, y: 729 }
    const point2 = { x: point1.x + 200, y: point1.y - 200 }
    const point3 = { x: point2.x + 100, y: point2.y + 100 }
    const point4 = { x: point3.x + 250, y: point3.y - 250 }
    const point5 = { x: point4.x + 100, y: point4.y + 100 }
    const point6 = { x: point5.x + 400, y: point5.y - 400 }
    const point7 = { x: point6.x + 100, y: point6.y + 100 }
    const point8 = { x: point7.x + 200, y: point7.y - 200 }

    this.setState({ clickNum: this.state.clickNum + 1 }, () => {
      if (this.state.clickNum === 1) {
        this.climbingAnimation(personObj, point1, 1)
        this.setState({ statement: "Let's start the journery right now!"})
      }

      else if (this.state.clickNum === 2) {
        this.climbingAnimation(personObj, point2, 1)
        this.setState({ statement: "HAPPPPY! FIGHTING!"})
      }

      else if (this.state.clickNum === 3) {
        this.climbingAnimation(personObj, point3, 2)
        this.setState({ statement: "Oh! I am falling! But it is only a small trouble!"})
      }

      else if (this.state.clickNum === 4) {
        this.climbingAnimation(personObj, point4, 1)
        this.setState({ statement: "Come On! Even it is quite hard, but I am close to WINNING!"})
      }

      else if (this.state.clickNum === 5) {
        this.climbingAnimation(personObj, point5, 2)
        this.climbingAnimation(document.getElementById('cloud'), {x: 0, y: this.getXY(document.getElementById('cloud')).y}, 20)
        this.setState({ statement: "Too Upset!!!! Why this is not the final peak!!!"})
      }

      else if (this.state.clickNum === 6) {
        this.climbingAnimation(document.getElementById('cloud'), {x: -1000, y: this.getXY(document.getElementById('cloud')).y}, 20)
        this.climbingAnimation(personObj, point6, 1)
        this.setState({ statement: "THANKS TO My Dear friends, I will keep moving, never give up!"})
      }

      else if (this.state.clickNum === 7) {
        this.climbingAnimation(personObj, point7, 1)
        this.setState({ statement: "I am not afraid of any failure now! I will try to stand on higher peak to see the better view "})
      }

      else if (this.state.clickNum === 8) {
        this.climbingAnimation(personObj, point8, 2)
        this.setState({ statement: "KEEP CLIMBING! NEVER GIVE UP!"})
      }
    })
  }

  /**
   * @name: walking/climbing animation
   * @param {ReactDOM} obj
   * @param {object} destination: {x: 100, y: 100}
   * @param {Number} step
   */
  climbingAnimation = (obj, destination, step) => {
    let xy = this.getXY(obj)
  
    let left = xy.x
    let bottom = xy.y

    function renderPerson() {
      if (left !== destination.x) obj.style.left = `${left += step}px`
      if (bottom < destination.y ) obj.style.top = `${bottom += step}px` 
      if (bottom > destination.y) obj.style.top = `${bottom -= step}px` 
    }

    (function animloop() {
      renderPerson();
      let animateId = window.requestAnimationFrame(animloop);
      // stop animation
      if (left === destination.x && bottom === destination.y) {
        cancelAnimationFrame(animateId)
      }
    })();
  }

  /**
   * @name: get the DOM object axis point
   * @param {ReactDOM} obj
   * @return {object} {x, y}
   */
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
          <button onClick={() => this.goAhead()} disabled={this.state.loading}>CLIMBING</button>

          <span>{this.state.statement}</span>
        </div>
        <canvas id="cloud" width="1440" height="762"/>
        <canvas id="person" width="50" height="60"/>
        <canvas id="mountain" width="1440" height="762" />
      </div>
    )
  }
}
