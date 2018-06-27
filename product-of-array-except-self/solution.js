/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = xs => {
  const n = xs.length
  // we know that n > 1.
  /*
     prodLefts[i] store the products from index 0 to index i
     prodRights[i] the products from index n-1 downto index i

     so we can know the "except self" product at index i
     by computing prodLefts[i-1] * prodRights[i+1]
   */
  const prodLefts = new Array(n)
  const prodRights = new Array(n)
  prodLefts[0] = xs[0]
  prodRights[n-1] = xs[n-1]
  for (let i = 1; i < n; ++i) {
    // let j goes the same way but from the other side
    let j = n-1-i
    prodLefts[i] = prodLefts[i-1] * xs[i]
    prodRights[j] = prodRights[j+1] * xs[j]
  }
  const ans = new Array(n)
  ans[0] = prodRights[1]
  ans[n-1] = prodLefts[n-2]
  for (let i = 1; i+1 < n; ++i) {
    ans[i] = prodLefts[i-1] * prodRights[i+1]
  }
  return ans
}

console.log(
  productExceptSelf([1,2,3,4])
)
