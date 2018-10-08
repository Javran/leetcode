const re = /^(\d+) (.*)$/

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = cpdomains => {
  /*
     idea: freq count but with one key being split into multiple of them.
   */
  const counts = new Map()
  const reg = cpdRaw => {
    const matchResult = re.exec(cpdRaw)
    if (matchResult === null) {
      throw `unexpected raw: ${cpdRaw}`
    }
    const [_ignored, freqRaw, domRaw] = matchResult
    const freq = Number(freqRaw)
    // could do something smarter using Array.reduce, not going to though,
    // as I like the simplicity below.
    const doms = domRaw.split('.')
    for (let i = 0; i < doms.length; ++i) {
      const curDom = doms.slice(i).join('.')
      if (counts.has(curDom)) {
        counts.set(curDom, counts.get(curDom) + freq)
      } else {
        counts.set(curDom, freq)
      }
    }
  }
  cpdomains.forEach(reg)
  return [...counts.entries()].map(([d,q]) => `${q} ${d}`)
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(subdomainVisits)

f(["9001 discuss.leetcode.com"])()
f(["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"])()
