/**
 * @param {string} word
 * @return {boolean}
 */
const detectCapitalUse = word => {
  if (word.length <= 1)
    return true
  const tl = word.substr(1)
  if (tl.toLowerCase() === tl)
    return true
  return tl.toUpperCase() === tl && word[0].toUpperCase() === word[0])
}
