/**
 * @param {string} path
 * @return {string}
 */
const simplifyPath = pathRaw => {
  /*
     rather than considering how to simplify a path,
     why don't we just interpret the raw path as a sequence of commands
     separated by "/":

     - command ".." goes up a directory (if it's possible)
     - command "." does nothing
     - all other commands lead us a layer deeper

     by simluating a stack of sub-dirs (ys below) we can always keep track of this
   */
  const xs = pathRaw.split(/\/+/).filter(x => x !== '')
  const ys = []
  xs.map(x => {
    if (x === "..") {
      // JS's pop is already taken care of stack underflow
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
