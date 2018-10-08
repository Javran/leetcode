const re = /^(\d+) (.*)$/

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = cpdomains => {
  const counts = new Map()
  const reg = cpdRaw => {
    const matchResult = re.exec(cpdRaw)
    if (matchResult === null) {
      throw `unexpected raw: ${cpdRaw}`
    }
    const [_ignored, freqRaw, domRaw] = matchResult
    const freq = Number(freqRaw)
    const doms = domRaw.split('.')
  }
  cpdomains.forEach(reg)

  return [...counts.entries()]
}
