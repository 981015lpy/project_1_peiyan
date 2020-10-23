export default function person(p5, position) {
  p5.push()

  let t = p5.millis() / 1000
  // let t = 1
  let speed = 2
  
  let headPosition = { x: position.x, y: position.y - 20 }

  let body = {
    startPoint: { x: position.x, y: position.y - 20 },
    endPoint: { x: headPosition.x, y: headPosition.y + 50}
  }
  let arm_front = {
    startPoint: { x: position.x, y: position.y + 10 },
    endPoint: { x: position.x  + 30 * Math.sin( -speed * t), y: position.y + 25 }
  }
  let arm_back = {
    startPoint: { x: position.x, y: position.y + 10 },
    endPoint: { x: position.x - 30 * Math.sin( -speed * t), y: position.y + 25 }
  }

  let leg_front_1 = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x + 5 * Math.sin( -speed * t), y: position.y + 20 + 25 }
  }
  let leg_front_2 = {
    startPoint: { x: leg_front_1.endPoint.x, y: leg_front_1.endPoint.y },
    endPoint: { x: leg_front_1.endPoint.x - 10, y: leg_front_1.endPoint.y + 20 }
  }

  let leg_back_1 = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x + 15, y: position.y + 40 - 5 * Math.sin( speed * t) }
  }

  let leg_back_2 = {
    startPoint: { x: leg_back_1.endPoint.x, y: leg_back_1.endPoint.y },
    endPoint: { x: leg_back_1.endPoint.x - 10 , y: leg_front_1.endPoint.y + 20 + Math.sin( 2 * speed * t) }
  }

  // create front arm
  createLine(arm_front, 140, 5)

  // create front leg
  createLine(leg_front_1, 140, 5)
  createLine(leg_front_2, 140, 5)

  // create body
  createLine(body, 140, 10)
  
  // create head
  p5.fill(140)
  p5.strokeWeight(2)
  p5.ellipse(headPosition.x, headPosition.y, 30) // head

  // create back arm
  createLine(arm_back, 140, 5)

  // create back leg
  createLine(leg_back_1, 140, 5)
  createLine(leg_back_2, 140, 5)


  p5.pop()

  function createLine(lineObj, stroke, weight) {
    p5.strokeWeight(weight)
    p5.stroke(stroke)
    p5.line(lineObj.startPoint.x, lineObj.startPoint.y, lineObj.endPoint.x, lineObj.endPoint.y)
  }
}
