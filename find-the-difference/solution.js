/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
const findTheDifference = (s, t) => {
  // freq count.
  const freqs = new Int8Array(26).fill(0)
  for (let i = 0; i < s.length; ++i)
    ++freqs[s.codePointAt(i) - 97 /* 'a' */]
  for (let i = 0; i < t.length; ++i)
    --freqs[t.codePointAt(i) - 97 /* 'a' */]
  for (let i = 0; i < 26; ++i)
    if (freqs[i])
      return String.fromCodePoint(i+97)
}
