const freqCount = xs => {
  const freqs = new Uint8Array(26)
  for (let i = 0; i < xs.length; ++i) {
    ++freqs[(xs.codePointAt(i) & 31) - 1]
  }
  return freqs
}

/**
 * @param {string[]} stickers
 * @param {string} target
 * @return {number}
 */
const minStickers = (stickers, target) => {
  // idea: the key is to encode state into efficient structures.
  // and perform search with memoization.

  // freq count on target
  const targetFC = freqCount(target)
  const freqEncode = sticker => {
    const ans = []
    const stickerFC = freqCount(sticker)
    for (let i = 0; i < 26; ++i)
      if (targetFC[i] !== 0)
        // since target len is only 15, we set it as max val
        // and this will turn out useful when encoding search states
        ans.push(stickerFC[i] > 15 ? 15 : stickerFC[i])
    return ans.some(x => x > 0) ? ans : null
  }
  /*
     encoding: freq count only on chars that we are interested in:

     thehat: ax1, ex1, hx2, tx2, therefore [1,1,2,2]
     with: tx1, hx1, therefore [0,0,1,1]

     we use this to encode both target and stickers
     (and remove those stickers that does not have anything we want)
   */

  const encTarget = freqEncode(target)
  const encStickers = []
  stickers.forEach(sticker => {
    const enc = freqEncode(sticker)
    if (enc)
      encStickers.push(enc)
  })

  // [1,2,1,3] => 'abac'
  // this choice of encoding is just to allow state to be more "readable"
  // when debugging. as freq can be at most 15, we are fine.
  const encodeState = st =>
    String.fromCodePoint.apply(null, st.map(x => x+97))

  const memo = new Map()
  const search = state => {
    if (state.every(freq => freq === 0))
      return 0
    const encodedSt = encodeState(state)
    if (memo.has(encodedSt))
      return memo.get(encodedSt)
    let ans = null
    // try to lower the target
    encStickers.forEach(encSticker => {
      // only proceed when the sticker actually contributes
      if (
        encSticker.some((sFreq, ind) =>
          state[ind] > 0 && sFreq > 0)
      ) {
        const newState = encSticker.map((sFreq, ind) => {
          const ret = state[ind] - sFreq
          return ret < 0 ? 0 : ret
        })
        let curAns = search(newState)
        if (curAns !== null) {
          if (ans === null || curAns + 1 < ans)
            ans = curAns + 1
        }
      }
    })
    memo.set(encodedSt, ans)
    return ans
  }

  const ans = search(encTarget)
  return ans === null ? -1 : ans
}

console.log(minStickers(["with", "example", "science", "zzz"], "thehat"))
console.log(minStickers(["notice", "possible"], "basicbasic"))
