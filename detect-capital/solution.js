/**
 * @param {string} word
 * @return {boolean}
 */
const detectCapitalUse = word => {
  /* note that rule can be re-stated in this way:
     - if we have less than 2 chars, always proper capital.
     - if we have every char except first one being lower case, it's proper.
     - otherwise this has to be a word consisting of all upper case chars.
   */
  if (word.length <= 1)
    return true
  const tl = word.substr(1)
  if (tl.toLowerCase() === tl)
    return true
  return tl.toUpperCase() === tl && word[0].toUpperCase() === word[0])
}
