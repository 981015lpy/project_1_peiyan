export default function person(p5, position) {
  p5.push()
  
  let headPosition = { x: position.x, y: position.y - 20 }
  let body = {
    startPoint: { x: position.x, y: position.y - 20 },
    endPoint: { x: headPosition.x, y: headPosition.y + 50}
  }
  let arm_front = {
    startPoint: { x: position.x, y: position.y + 10 },
    endPoint: { x: position.x + 35, y: position.y + 25 }
  }
  let arm_back = {
    startPoint: { x: position.x, y: position.y + 10 },
    endPoint: { x: position.x - 25, y: position.y + 35 }
  }

  let leg_front = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x + 25, y: position.y + 20 + 45 }
  }

  let leg_back = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x - 25, y: position.y + 20 + 45 }
  }

  // create front arm
  createLine(arm_front, 100, 5)

  // create front leg
  createLine(leg_front, 100, 5)

  // create body
  p5.fill(140)
  createLine(body, 140, 15)
  
  // create head
  p5.strokeWeight(5)
  p5.ellipse(headPosition.x, headPosition.y, 30) // head

  // create back arm
  createLine(arm_back, 100, 5)

  // create back leg
  createLine(leg_back, 100, 5)


  p5.pop()

  function createLine(lineObj, stroke, weight) {
    p5.strokeWeight(weight)
    p5.stroke(stroke)
    p5.line(lineObj.startPoint.x, lineObj.startPoint.y, lineObj.endPoint.x, lineObj.endPoint.y)
  }
}
