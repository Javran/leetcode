/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = xs => {
  const ans = []
  const st = []
  for (let i = 0; i < xs.length; ++i) {
    const x = xs[i]
    if (x < 0) {
      while (st.length > 0) {
        if (st[st.length-1] < -x) {
          st.pop()
        } else {
          break
        }
      }
      if (st.length === 0) {
        ans.push(x)
      } else if (st[st.length-1] === -x) {
        st.pop()
      } else {
        // NOOP
      }
    } else {
      // x > 0
      st.push(x)
    }
  }
  return [...ans, ...st]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(asteroidCollision)
f([5,10,-5])([5,10])
f([8,-8])([])
f([10,2,-5])([10])
f([-2,-1,1,2])([-2,-1,1,2])
f([1,2,1,2,1,1])([1,2,1,2,1,1])
f([-1,-1,-2,-1])([-1,-1,-2,-1])
