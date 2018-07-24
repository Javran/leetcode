/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = s => {
  const N = s.length
  const memoize = f => {
    const xs = Array(N)
    return x => {
      let ret
      if (x in xs) {
        ret = xs[x]
      } else {
        ret = f(x)
        xs[x] = ret
      }
      return ret
    }
  }
  // memoized search just in case that we end up doing palindrome testing repeatly
  const isPalindrome = memoize(i => memoize(j => {
    if (i >= j)
      return true
    return s.codePointAt(i) === s.codePointAt(j) && isPalindrome(i+1)(j-1)
  }))
  const ans = []
  const cur = []
  // DFS should work quite nicely. as we wanna output every combinating,
  // doing DP would just end up copying states and deal with list product,
  // which might not worth the effort
  const search = (beginInd, dep) => {
    if (beginInd === N) {
      ans.push(cur.slice(0, dep))
      return
    }
    for (let i = beginInd; i < N; ++i) {
      if (isPalindrome(beginInd)(i)) {
        cur[dep] = s.substring(beginInd, i+1)
        search(i+1, dep+1)
      }
    }
  }
  search(0, 0)
  return ans
}

console.log(partition("abababacaba"))
