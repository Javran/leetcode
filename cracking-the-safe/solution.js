/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const crackSafe = (n, k) => {
  /*
     there could be systematic way of doing this,
     but I'll just assume that a solution can be worked out
     by starting with all 0s and extend one digit at a time
     to cover any unvisited combination, which is a scenario for DFS.
   */
  const combCount = k ** n
  const prefixMod = combCount / k
  // actually just store booleans.
  const visited = new Int8Array(combCount)
  // expected length
  const totalLen = combCount - 1 + n
  const cur = []
  let solved = false
  for (let i = 0; i < n; ++i)
    cur.push(0)
  visited[0] = 1
  const search = (dep, encodedPref) => {
    /*
       encodedPref is a representation of the prefix:
       we have processed cur[0..dep-1]

       and we want to determine cur[dep] by
       allowing reusing the last n-1 digits of cur[0..dep-1].
       therefore encodedPref is numeric representation of cur[dep-n..dep-1]
     */

    if (dep === totalLen) {
      solved = true
      return
    }
    // equivalent to `*10` for decimal and `<<1` for binary
    const encodedPrefK = encodedPref*k
    for (let i = 0; i < k; ++i) {
      const encoded = encodedPrefK + i
      if (!visited[encoded]) {
        visited[encoded] = 1
        cur[dep] = i
        // `% prefixMod` removes the most significant digit
        search(dep+1, encoded % prefixMod)
        if (solved)
          return
        visited[encoded] = 0
      }
    }
  }
  search(n, 0)
  return solved ? cur.join('') : "???"
}

for (let n = 1; n <= 4; ++n) {
  for (let k = n; k <= 10; ++k) {
    if (k ** n <= 4096) {
      console.log(n,k, crackSafe(n,k))
    }
  }
}
