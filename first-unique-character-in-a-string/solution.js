/**
 * @param {string} s
 * @return {number}
 */
const firstUniqChar = s => {
  const visited = new Uint8Array(26).fill(0)
  // first pass for freq count
  for (let i = 0; i < s.length; ++i) {
    const code = s.codePointAt(i) - 97
    if (visited[code] <= 1)
      ++visited[code]
  }
  // second pass for discovering first non-repeating
  for (let i = 0; i < s.length; ++i) {
    const code = s.codePointAt(i) - 97
    if (visited[code] === 1)
      return i
  }
  return -1
}
