/**
 * @param {string} input
 * @return {number}
 */
const lengthLongestPath = raw => {
  // strategy: simulate.
  const lines = raw.split('\n')
  const parseLine = rawLine => {
    let level = 0
    for (let i = 0; i < rawLine.length && rawLine[i] === '\t'; ++i)
      ++level
    const name = rawLine.substring(level)
    return {
      level,
      name,
      isFile: name.indexOf('.') !== -1,
    }
  }

  let maxLen = 0
  let curLevel = -1
  let path = []
  for (let i = 0; i < lines.length; ++i) {
    l = lines[i]
    const {level, name, isFile} = parseLine(l)
    if (isFile) {
      while (curLevel >= level) {
        path.pop()
        --curLevel
      }
      let len
      // determine length
      if (path.length === 0) {
        // xxxx without path
        len = name.length
      } else {
        // a/b/c/d/filename.ext
        len = name.length + path.reduce((acc, i) => acc + i.length + 1, 0)
      }
      if (maxLen < len)
        maxLen = len
    } else {
      if (curLevel + 1 === level) {
        path.push(name)
        ++curLevel
      } else if (curLevel >= level) {
        while (curLevel >= level) {
          path.pop()
          --curLevel
        }
        path.push(name)
        ++curLevel
      } else {
        throw new Exception('unexpected input level')
      }
    }
  }
  return maxLen
}

false && console.log(lengthLongestPath(
  "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
))

false && console.log(lengthLongestPath(
  [
    "fdasf.ext",
    "dir",
    "\tsubdir1",
    "\taaaaa.txt",
    "\t\tfile1.ext",
    "\t\tsubsubdir1",
    "\tsubdir2",
    "\tsubdir3",
    "\t\tsubsubdir2",
    "\t\t\tfile2.ext",
  ].join('\n')
))

console.log(lengthLongestPath("dir\n\tfile.txt"))
console.log(lengthLongestPath("dir\n\    file.txt"))
