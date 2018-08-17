/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = xs => {
  /*
     idea:

     attempt #1:

     - it's easy to figure out that:
       - all leftmost negative numbers can move directly into answer
       - similarly, all rightmost positive numbers can move into answer
     - so we'll just need to deal with cases that a postive chunk of numbers on left
       colliding with negative ones on right. but things get complicated.

     observation:
     - we can process asteroids from left to right:
       note that given a row of asteroids, no matter how you process
       collisions, when the state becomes stable, the result will always be the same.

       I actually find it hard to persuade myself of this because of the possibility of
       simultaneous collisions. but one this property presents itself, it looks good.

     this then becomes a simulation:

     - all leftmost negative numbers still goes right into the answer
     - positive numbers are kept onto the stack to present a "breakable wall" of asteroids
       - any incoming negative number will either (1) penetrate the wall or (2) break itself
       - act accordingly.
       - note that (1) and (2) can happen at the same time.

   */
  const ans = []
  const st = []
  let stSize = 0
  for (let i = 0; i < xs.length; ++i) {
    const x = xs[i]
    if (x < 0) {
      const y = -x
      // let incoming asteroids destroy the wall of asteroids.
      while (stSize > 0 && st[stSize-1] < y) {
        --stSize
      }
      if (stSize === 0) {
        // current asteroid has managed to penetrate the wall
        ans.push(x)
      } else if (st[stSize-1] === y) {
        // current asteroid happens to be of the same size as the top of the wall,
        // in which case both got destroyed.
        --stSize
      }
    } else {
      // x > 0, join the wall.
      st[stSize] = x
      ++stSize
    }
  }
  return [...ans, ...st.slice(0,stSize)]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(asteroidCollision)
f([5,10,-5])([5,10])
f([8,-8])([])
f([10,2,-5])([10])
f([-2,-1,1,2])([-2,-1,1,2])
f([1,2,1,2,1,1])([1,2,1,2,1,1])
f([-1,-1,-2,-1])([-1,-1,-2,-1])
f([-2,-2,1,-2])([-2,-2,-2])
