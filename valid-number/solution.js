/**
 * @param {string} s
 * @return {boolean}
 */
const isNumber = s => {
  /*
     honestly this problem is poorly described
     and is literally impossible to get it correct first time
     because of this intentional ambiguous bullshit.
     this might be perfect for an interactive situation like phone interview,
     but it is in no shape of being fun for OJ.
   */
  /*
     format:
     - optional: [+ or -]
     - required: [digits][.][digits]
       this part should not be empty or just a single "."
     - optional: [e or E][+ or -][digits (non-empty)]
   */
  const re = /^\s*[+-]?(\d*\.?\d*)([eE][+-]?\d+)?\s*$/
  const result = re.exec(s)
  if (!result)
    return false
  const [_ignored, bd] = result
  return bd !== '' && bd !== '.'
}

console.assert(isNumber('  +123.456e-789  '))
console.assert(!isNumber('.'))
console.assert(isNumber('1.'))
console.assert(isNumber('.1'))
console.assert(!isNumber('e'))
console.assert(!isNumber('0e'))
