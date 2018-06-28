/**
 * @param {number[][]} people
 * @return {number[][]}
 */
const reconstructQueue = xs => {
  /*
     don't worry about uniqueness of reconstruction,
     the problem doesn't ask for it.
     so as long as we can find a way to construct an array that meets the requirement,
     we are fine.
   */
  if (xs.length <= 1)
    return xs

  /*
     observation: k in element [h,k] is only considered for all numbers >= h
     so what we gonna do is to sort h in descending order, and insert using k as index.
     because all elements greater or equal to current element x = [h, k] is already in the
     resulting list, we won't get stuck in a situation that we don't know how to proceed.
   */
  xs.sort((a,b) => {
    // desc for height
    const diff = b[0] - a[0]
    // asc for k
    return diff === 0 ? a[1] - b[1] : diff
  })
  const ys = new Array(xs.length)
  ys[0] = xs[0]
  for (let i = 1; i < xs.length; ++i) {
    // assumed last index of ys (at this iteration): i
    const x = xs[i]
    ys[i] = x
    const [_ignored, ind] = x
    for (let j = i; j-1 >= ind; --j) {
      const tmp = ys[j]
      ys[j] = ys[j-1]
      ys[j-1] = tmp
    }
  }
  return ys
}

console.log(reconstructQueue([[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]))
console.log(reconstructQueue([[1,0], [9,0], [2,1], [8,1], [3,2], [7,2], [4,3]]))
