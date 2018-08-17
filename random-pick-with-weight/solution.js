/*
   idea: we want to utilize Math.random,
   which gives a uniform distribution rather than weighted.

   in order to achieve a weighted distribution,
   we do accumulated weight and maintain a virtual range for
   each weighted value.

   as weights are accumulated, we'll get a monotonic array,
   which allows the use of binary search to speed up.
 */

/**
 * @param {number[]} w
 */
const Solution = function(w) {
  const N = w.length
  const xs = new Uint16Array(N)
  const accW = new Uint16Array(N)
  accW[0] = w[0]
  for (let i = 1; i < N; ++i) {
    xs[i] = i
    accW[i] = accW[i-1] + w[i]
  }
  /*
     now that accW[i] stands for range [accW[i-1] .. accW[i]-1] (i > 0)
     and accW[0] stands for range [0.. accW[0]-1]
   */
  this.N = N
  this.xs = xs
  this.accW = accW
  // for generating a value in [0.. accW[N-1]-1]
  this.gen = () => Math.floor(Math.random() * accW[N-1])
}

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
  const {N, xs, accW, gen} = this
  const x = gen()
  let l = 0, r = N - 1
  while (l < r) {
    const mid = (l+r) >>> 1
    if (x < accW[mid]) {
      r = mid
    } else {
      l = mid+1
    }
  }
  return xs[l]
}

const s = new Solution([2,3,1,4])
const count = [0,0,0,0]
for (let i = 0; i < 10000; ++i)
  ++count[s.pickIndex()]
console.log(count)
