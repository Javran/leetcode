const dirs = [
  [-1,-1],[-1,0],[-1,1],
  [ 0,-1],[ 0,0],[ 0,1],
  [ 1,-1],[ 1,0],[ 1,1],
]

/**
 * @param {number[][]} M
 * @return {number[][]}
 */
const imageSmoother = M => {
  const rows = M.length
  const cols = M[0].length

  const ret = new Array(rows)
  for (let i = 0; i < rows; ++i)
    ret[i] = new Array(cols)

  const smooth = (x,y) => {
    let sum = 0
    let count = 0

    dirs.forEach(([dx,dy]) => {
      const x1 = x + dx
      const y1 = y + dy
      if (x1 >= 0 && x1 < rows && y1 >= 0 && y1 < cols) {
        sum += M[x1][y1]
        count += 1
      }
    })

    ret[x][y] = Math.floor(sum / count)
  }

  /*
     step 1: an O(rows + cols) step of smoothing "surrounding cells".
     yes the `smooth` function works for smoothing any cell within
     the bound, but it has bound checks which are not necessary for
     all inner cells
   */
  for (let i = 0; i < rows; ++i) {
    smooth(i,0)
  }
  if (cols > 1) {
    for (let i = 0; i < rows; ++i) {
      smooth(i,cols-1)
    }
  }
  for (let j = 1; j < cols-1; ++j) {
    smooth(0,j)
  }
  if (rows > 1) {
    for (let j = 1; j < cols-1; ++j) {
      smooth(rows-1,j)
    }
  }

  /*
     step 2: smooth all inner cells - we know they won't
     hit bounds so it's safe and faster if we don't do the bound check at all.
   */
  for (let i = 1; i < rows-1; ++i) {
    for (let j = 1; j < cols-1; ++j) {
      let sum = 0
      dirs.forEach(([dx,dy]) => { sum += M[i+dx][j+dy] })
      ret[i][j] = Math.floor(sum / 9)
    }
  }

  return ret
}

const {cTestFunc, genList} = require('leetcode-zwischenzug')
const f = cTestFunc(imageSmoother)

const gen = (rows, cols) => {
  const xs = []
  for (let i = 0; i < rows; ++i) {
    xs[i] = genList(cols, {l: 0, r: 255})
  }
  console.log(JSON.stringify(xs))
}

// gen(10,8)

f([[9,117,55,27,105],[104,186,48,4,198],[76,149,167,69,238]])(
  [[104,86,72,72,83],[106,101,91,101,106],[128,121,103,120,127]]
)
f(
  [[208,12,218,197,223,5,134,94],[18,58,191,192,18,126,238,226],[170,63,213,94,241,149,247,121],[235,144,249,191,24,197,111,195],[100,52,81,176,208,87,232,229],[111,83,229,181,53,60,244,102],[11,26,95,47,116,140,50,200],[251,47,66,148,119,49,221,108],[163,81,211,65,230,61,65,239],[67,218,186,222,179,74,65,107]]
)(
  [[74,117,144,173,126,124,137,173],[88,127,137,176,138,153,148,176],[114,149,155,157,136,150,178,189],[127,145,140,164,151,166,174,189],[120,142,154,154,130,135,161,185],[63,87,107,131,118,132,149,176],[88,102,102,117,101,116,130,154],[96,105,87,121,108,116,125,147],[137,143,138,158,127,118,109,134],[132,154,163,182,138,112,101,119]]
)
