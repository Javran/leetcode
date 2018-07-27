const N = 10 ** 8

/**
 * @param {number} radius
 * @param {number} x_center
 * @param {number} y_center
 */
const Solution = function(radius, x_center, y_center) {
  this.radius = radius
  this.x_center = x_center
  this.y_center = y_center
  const W = Math.PI * this.radius / N
  const H = this.radius * Math.sqrt(N*N - Math.PI*Math.PI) / N
  this.constants = {W, H}
}

/**
 * @return {number[]}
 */
Solution.prototype.randPoint = function() {
  const {W, H} = this.constants
  const x0 = Math.random() * W
  const y0 = Math.random() * H
  let x1, y1
  if (y0 <= H * x0 / W) {
    x1 = -(W-x0)
    y1 = -(H-y0)
  } else {
    x1 = x0
    y1 = -y0
  }
  const n = Math.floor(Math.random() * N) // [0..N-1]
  const phi = n * 2 * Math.PI / N
  const x2 = x1*Math.cos(phi) - y1*Math.sin(phi)
  const y2 = x1*Math.sin(phi) + y1*Math.cos(phi)
  return [x2 + this.x_center, y2 + this.y_center]
}

const s = new Solution(10,20,90)
for (let i = 0; i < 5000; ++i) {
  const t = s.randPoint()
  console.log(`${t[0]},${t[1]}`)
}
