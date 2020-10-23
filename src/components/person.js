export default function person(p5, position) {
  p5.fill(140)
  p5.stroke(140)
  // p5.ellipse(position.x, position.y + head_radius, body_width, body_height) // body
  let headPosition = { x: position.x, y: position.y - 20 }
  
  p5.ellipse(position.x, position.y, 30, 40, 10) // body
  p5.ellipse(headPosition.x, headPosition.y, 30) // head
}
