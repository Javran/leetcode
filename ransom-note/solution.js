/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
const canConstruct = function(ransomNote, magazine) {
  const rs = new Array(256).fill(0)
  const ms = new Array(256).fill(0)
  for (let i = 0; i < ransomNote.length; ++i)
    ++rs[ransomNote[i].codePointAt(0)]
  for (let i = 0; i < magazine.length; ++i)
    ++ms[magazine[i].codePointAt(0)]
  return rs.every((r, ind) => {
    const m = ms[ind]
    return r <= m
  })
}
