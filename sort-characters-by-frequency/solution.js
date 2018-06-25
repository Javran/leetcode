/**
 * @param {string} s
 * @return {string}
 */
const frequencySort = s => {
  // freq count, sort and output
  const freq = new Uint16Array(256).fill(0)
  for (let i = 0; i < s.length; ++i) {
    ++freq[s.codePointAt(i)]
  }
  const freqArr = []
  for (let i = 0; i <= 255; ++i)
    if (freq[i])
      freqArr.push([i,freq[i]])
  freqArr.sort((x,y) => y[1] - x[1])
  return freqArr.map(([c, fq]) =>
    String.fromCodePoint.apply(
      null,
      new Array(fq).fill(c)
    )).join('')
}

console.log(frequencySort("aaaaCCCbbzzzzzzs"))
