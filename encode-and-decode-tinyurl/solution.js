// comment: no comment.
const {encode, decode} = (() => {
  const HEAD = "http://wtfisinternalerrordamnit.com/"
  const pool = new Array()
  let size = 0
  /**
   * Encodes a URL to a shortened URL.
   *
   * @param {string} longUrl
   * @return {string}
   */
  const encode = longUrl => {
    const ret = size
    pool[size] = longUrl
    ++size
    return `${HEAD}${String(ret)}`
  }

  /**
   * Decodes a shortened URL to its original URL.
   *
   * @param {string} shortUrl
   * @return {string}
   */
  const decode = shortUrl => {
    const left = shortUrl.substr(0, HEAD.length)
    if (left.toLowerCase() !== HEAD)
      throw "decode error: unexpected url"
    const right = parseInt(shortUrl.substr(HEAD.length), 10)
    return pool[right]
  }

  return {encode, decode}
})()

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
