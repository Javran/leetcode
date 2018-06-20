/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
  /*
     let dist[i][j] be the edit distance between
     string word1[0..i) and word2[0..j) (using positional index)

     - dist[0][j] = j (delete all chars)
     - dist[i][0] = i (insert all chars)
     - dist[i][j] = min of:
       + dist[i-1][j] + 1 (delete char)
       + dist[i][j-1] + 1 (insert char)
       + dist[i-1][j-1] (if word1[i-1] == word2[j-1])
         or dist[i-1][j-1] + 1 (otherwise we need to replace)

   */
  const m = word1.length
  const n = word2.length
  if (m === 0)
    return n
  if (n === 0)
    return m

  const dist = new Array(m+1)
  for (let i = 0; i <= m; ++i)
    dist[i] = new Uint16Array(n+1)
  for (let i = 0; i <= m; ++i)
    dist[i][0] = i
  for (let j = 1; j <= n; ++j)
    dist[0][j] = j
  for (let i = 1; i <= m; ++i)
    for (let j = 1; j <= n; ++j) {
      let replaceOrKeep =
        (word1[i-1] === word2[j-1]) ? dist[i-1][j-1] : dist[i-1][j-1] + 1
      const min = Math.min(
        dist[i-1][j] + 1,
        dist[i][j-1] + 1,
        replaceOrKeep
      )
      dist[i][j] = min
    }
  return dist[m][n]
}

console.log(minDistance("horse", "ros"))
console.log(minDistance("intention", "execution"))
