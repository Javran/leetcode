const MIN = -(2 ** 31)
const MAX = (2 ** 31) - 1

/**
 * @param {number} x
 * @return {number}
 */
const reverse = x => {
  if (x === 0)
    return 0
  const sign = Math.sign(x)
  let n = Math.abs(x)
  const ds = []
  while (n > 0) {
    ds.push(n % 10)
    n = Math.floor(n / 10)
  }
  const ans = sign * ds.reduce((x,y) => x*10+y, 0)
  return ans >= MIN && ans <= MAX ? ans : 0
}

console.log(reverse(123456666))
console.log(reverse(8463847412))
