/**
 * @param {number[]} machines
 * @return {number}
 */
const findMinMoves = ms => {
  if (ms.length <= 1)
    // trivial case which requires no move.
    return 0
  const N = ms.length
  const accSum = new Uint32Array(N+1)
  for (let i = 0; i < N; ++i)
    accSum[i+1] = accSum[i] + ms[i]
  if (accSum[N] % N !== 0)
    // it's quite obvious when this would be impossible.
    return -1
  const target = accSum[N] / N
  /*
     idea: for each washing machine, we figure out
     how many "traffic" it needs in order to balance between its two sides:

     for machine i: its two sides are machines in [0..i-1] and machines in [i+1,N-1],
     and for each side, we need a total of count(<range>)*target dresses
     transferred to (if negative) or from (if positive) to them,
     which means machine i has to do the "transfer out" move for each negative sides.

     and since all machines work in parallel, the answer is the max of total # of moves
     among all machines
   */
  const getSum = (i,j) => i > j ? 0 : accSum[j+1] - accSum[i]
  let max = -Infinity
  for (let i = 0; i < N; ++i) {
    // left part from 0 to i-1
    const lDiff = getSum(0,i-1) - i*target
    // right part from i+1 to N-1
    const rDiff = getSum(i+1, N-1) - (N-i-1)*target
    const moves = (lDiff < 0 ? -lDiff : 0) + (rDiff < 0 ? -rDiff : 0)
    if (moves > max)
      max = moves
  }
  return max
}

console.assert(findMinMoves([1,2,2]) === -1)
console.assert(findMinMoves([1000,80,50,500,75]) === 659)
console.assert(findMinMoves([1000,80,50,50000,75]) === 39759)
console.assert(findMinMoves([1,0,5]) === 3)
console.assert(findMinMoves([0,3,0]) === 2)
console.assert(findMinMoves([0,2,0]) === -1)
