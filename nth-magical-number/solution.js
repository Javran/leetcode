const gcd = (a,b) => {
  if (b === 0)
    return a
  return gcd(b, a % b)
}

const M = 10 ** 9 + 7

// console.log(gcd(1234,16))
/**
 * @param {number} N
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
const nthMagicalNumber = (N, A, B) => {
  // gcd and lcm
  const g = gcd(A,B)
  const l = A / g * B
  const xs = []
  let i = 1, j = 1
  /*
     turns out this works for A === B,
     this is because LCM(A,B) = A = B
     so both A*i < l and B*j < l are never met
     and we end up with xs = [l], which leads to the correct answer.
   */
  while (A*i < l && B*j < l) {
    if (A*i <= B*j) {
      xs.push(A*i)
      ++i
    } else {
      xs.push(B*j)
      ++j
    }
  }
  for (/* */; A*i < l; ++i)
    xs.push(A*i)
  for (/* */; B*j < l; ++j)
    xs.push(B*j)
  xs.push(l)
  const K = Math.floor(N / xs.length)
  const Kr = N % xs.length
  return (((K * xs[xs.length-1]) % M) + (Kr === 0 ? 0 : xs[Kr-1]) % M) % M
}

const fSlow = (N, A, B) => {
  const xs = []
  for (let i = 2; xs.length < N; ++i) {
    if (i % A === 0 || i % B === 0)
      xs.push(i)
  }
  return xs[xs.length-1]
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(nthMagicalNumber)
f(100, 39989, 39983)()
f(1,2,3)(2)
f(4,2,3)(6)
f(5,2,4)(10)
f(3,6,4)(8)

for (let A = 2; A <= 100; ++A)
  for (let B = 2; B <= 100; ++B)
    for (let N = 1; N <= 100; ++N)
      console.assert(nthMagicalNumber(N,A,B) === fSlow(N,A,B))
