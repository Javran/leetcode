/**
 * @param {string} path
 * @return {string}
 */
const simplifyPath = pathRaw => {
  const xs = pathRaw.split(/\/+/).filter(x => x !== '')
  const ys = []
  xs.map(x => {
    if (x === "..") {
      ys.pop()
    } else if (x === ".") {
      // NOOP
    } else {
      ys.push(x)
    }
  })

  return '/' + ys.join('/')
}

console.log(simplifyPath("/home/"))
console.log(simplifyPath("/home"))
console.log(simplifyPath("/a/./b/../../c/"))
console.log(simplifyPath("/../"))
console.log(simplifyPath("/home//foo/"))
console.log(simplifyPath("/"))
