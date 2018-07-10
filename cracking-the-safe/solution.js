/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const crackSafe = (n, k) => {
  const visited = new Set()
  // expected length
  const totalLen = (k ** n) - 1 + n
  const cur = []
  let solved = false
  for (let i = 0; i < n; ++i)
    cur.push(0)
  visited.add(cur.join(''))
  const search = dep => {
    // to determine cur[dep]
    if (dep === totalLen) {
      solved = true
      return
    }
    const prefix = cur.slice(dep-n+1, dep)
    for (let i = 0; i < k; ++i) {
      prefix[n-1] = i
      const encoded = prefix.join('')
      if (!visited.has(encoded)) {
        visited.add(encoded)
        cur[dep] = i
        search(dep+1)
        if (solved)
          return
        visited.delete(encoded)
      }
    }
  }
  search(n)
  return solved ? cur.join('') : "???"
}

for (let n = 1; n <= 4; ++n) {
  for (let k = n; k <= 10; ++k) {
    if (k ** n <= 4096) {
      console.log(n,k, crackSafe(n,k))
    }
  }
}
