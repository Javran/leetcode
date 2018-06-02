const vowels = new Set("aeiouAEIOU")

// word should always be non-empty
const toGoat = (word, ind) => {
  const afterStr = new Array(ind+1).fill('a').join('')
  if (vowels.has(word[0])) {
    return word + 'ma' + afterStr
  }
  const left = word.substring(1)
  return left + word[0] + 'ma' + afterStr
}

/**
 * @param {string} S
 * @return {string}
 */
const toGoatLatin = xsRaw =>
  xsRaw.split(' ').map(toGoat).join(' ')

console.log(
  toGoatLatin("The quick brown fox jumped over the lazy dog") ===
    "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
)
