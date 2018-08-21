/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
const exclusiveTime = (n, logs) => {
  /*
     idea: assume that logs are always correct,
     we can solve this problem by running a simulation by maintaining
     the call stack.
   */
  const ans = new Array(n).fill(0)
  // let cur indicate begin of time
  let cur = null
  const st = []
  let stSize = 0
  for (let i = 0; i < logs.length; ++i) {
    const [funcIdRaw, se, timeRaw] = logs[i].split(':')
    const funcId = Number(funcIdRaw)
    const time = Number(timeRaw)
    if (se === 'start') {
      if (stSize > 0) {
        // have to pause the previous running function
        // we now accumulate time - cur to function on top of the stack
        ans[st[stSize-1]] += time - cur
      }
      st[stSize] = funcId
      ++stSize
      cur = time
    } else {
      // end
      // notice that "end" time is different from "start" time
      // as it indicates the end of time `time` and beginning of time `time+1`
      // so everything below is like "start" but with +1 involved.
      ans[st[stSize-1]] += time - cur + 1
      --stSize
      cur = time + 1
    }
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(exclusiveTime)

f(2,["0:start:0","1:start:2","1:end:5","0:end:6"])([3,4])
