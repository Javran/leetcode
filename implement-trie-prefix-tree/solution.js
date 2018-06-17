const mkNode = () => ({
  dict: new Array(26).fill(null),
  word: null,
})

const Trie = function() {
  this.root = mkNode()
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let curTrie = this.root
  for (let i = 0; i < word.length; ++i) {
    const w = word.codePointAt(i) - 97 /* code point of 'a' */
    if (curTrie.dict[w] === null) {
      curTrie.dict[w] = mkNode()
    }
    curTrie = curTrie.dict[w]
  }
  curTrie.word = word
}

Trie.prototype.getTrie = function(word) {
  let curTrie = this.root
  for (let i = 0; i < word.length; ++i) {
    const w = word.codePointAt(i) - 97 /* code point of 'a' */
    if (curTrie.dict[w] === null)
      return null
    curTrie = curTrie.dict[w]
  }
  return curTrie
}

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  const trie = this.getTrie(word)
  return Boolean(trie && trie.word !== null)
}

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  const trie = this.getTrie(prefix)
  return Boolean(trie)
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = Object.create(Trie).createNew()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

var obj = new Trie()
obj.insert('ab')
obj.insert('ac')
obj.insert('a')

console.log(obj.root.dict[0])
