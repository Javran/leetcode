/**
 * @param {function} read4()
 * @return {function}
 */
const solution = read4 => {
  /*
     idea: just do what we are asked.
     make use of Array.prototype.slice, which deals with min-max stuff quite nicely
   */
  let cache = []
  let endFlag = false

  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Maximum number of characters to read
   * @return {number} The number of characters read
   */
  return (buf, n) => {
    let xs = []
    if (cache.length > 0) {
      // consume whatever in the cache first.
      const cacheConsumed = cache.slice(0, n)
      const cacheRemained = cache.slice(n)
      xs = xs.concat(cacheConsumed)
      n -= cacheConsumed.length
      cache = cacheRemained
    }
    if (n > 0) {
      // INVARIANT: cache.length === 0
      while (n >= 4 && !endFlag) {
        const buf = []
        const loaded = read4(buf)
        if (loaded < 4)
          endFlag = true
        xs = xs.concat(buf)
        n -= loaded
      }
      if (n > 0 && !endFlag) {
        cache = []
        const loaded = read4(cache)
        if (loaded < 4)
          endFlag = true
        const cacheConsumed = cache.slice(0, n)
        const cacheRemained = cache.slice(n)
        xs = xs.concat(cacheConsumed)
        n -= cacheConsumed
        cache = cacheRemained
      }
    }
    for (let i = 0; i < xs.length; ++i)
      buf[i] = xs[i]
    return xs.length
  }
}

const content = "abcde"
let offset = 0
const read4 = buf => {
  let i
  for (i = 0; i <= 3 && offset < content.length; ++i) {
    buf[i] = content[offset]
    ++offset
  }
  return i
}

const read = (() => {
  const f = solution(read4)
  return n => {
    const xs = []
    console.log(`read(${n})`, f(xs, n), xs)
  }
})()

read(1)
read(4)
