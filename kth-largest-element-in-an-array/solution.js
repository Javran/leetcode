/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function(xs, kLarge) {
  // ref: https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  // Lomuto partition allows us to determine the sorted element at index p,
  // if p == k we are done, otherwise, this insight allows us to
  // pick (hopefully) half of the array to sort and find k-th element
  const partition = (l, r) => {
    const x = xs[r]
    let i = l-1
    for (let j = l; j < r; ++j) {
      if (xs[j] < x) {
      ++i
        const tmp = xs[i]
        xs[i] = xs[j]
        xs[j] = tmp
      }
    }
    const tmp = xs[i+1]
    xs[i+1] = xs[r]
    xs[r] = tmp
    return i+1
  }

  // convert to k - the k-th (zero-based) smallest element
  // this is unnecessary but it feels more intuitive to me.
  const k = xs.length - kLarge
  // l,r are element indices
  // INVARIANT: l <= r
  const findKthLargestAux = (l, r) => {
    if (l == r)
      return xs[l]
    const p = partition(l, r)
    if (p === k)
      return xs[p]
    else if (p > k)
      return findKthLargestAux(l,p-1)
    else
      // p < k
      return findKthLargestAux(p+1,r)
  }
  return findKthLargestAux(0,xs.length-1)
}

const test = () => {
  const l = Math.floor(1000 * Math.random())
  const xs = new Array(l)
  for (let i = 0; i < l; ++i)
    xs[i] = Math.floor(100 * Math.random())
  const ys = xs.slice().sort((x,y) => x - y)
  for (let i = 0; i < l; ++i) {
    console.assert(findKthLargest(xs, l-i) === ys[i])
  }
}

for (let i = 0; i < 20; ++i)
  test()
