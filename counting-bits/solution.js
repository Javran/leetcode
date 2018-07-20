/**
 * @param {number} num
 * @return {number[]}
 */
const countBits = num => {
  /*
     idea: since we are dealing with multiple numbers,
     let's see if we can use some previous results.

     turns out we can: if xs[i] is the popcount for i,
     we can know popcount for (i << 1)+0 and (i << 1)+1 right away since
     we only need to count the last bit in
   */
  const xs = new Array(num + 1)
  xs[0] = 0
  for (let i = 1; i <= num; ++i) {
    xs[i] = xs[i >>> 1] + (i & 1)
  }
  

  return xs
}
