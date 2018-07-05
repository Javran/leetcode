/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = n => {
  if (n === 0)
    return false
  // 10 digits * 9^2 = 810, having a capacity of 1000 should be sufficient
  const visited = new Uint8Array(1000)
  const nextNum = num => {
    let sum = 0
    while (num > 0) {
      const lo = num % 10
      sum += lo * lo
      num = Math.floor(num/10)
    }
    return sum
  }

  let num = nextNum(n)
  for (/* NOOP */; num !== 1; num = nextNum(num)) {
    if (visited[num])
      return false
    visited[num] = 1
  }
  return num === 1
}

for (let i = 1; i < 100; ++i)
  if (isHappy(i))
    console.log(i)
