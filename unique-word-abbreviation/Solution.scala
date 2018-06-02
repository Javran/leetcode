/*
 
 just do groupBy with proper projection.

 */
class ValidWordAbbr(_dictionary: Array[String]) {
  def toKey(w: String): (Int, Char, Char) = w.length match {
    case 0 =>
      // to THE VERY CLEVER test case setter:
      // is word with zero length seems FUCKING POSSIBLE to you?
      (0, '?', '?')
    case _ => (w.length, w.head, w.last)
  }

  val dict: Map[(Int, Char, Char), Set[String]] =
    _dictionary.groupBy(toKey).mapValues(_.toSet)

  def isUnique(word: String): Boolean = {
    val k = toKey(word)
    dict.get(k) match {
      case None =>
        // the abbr is not found in dict, in which it is unique.
        true
      case Some(s) =>
        val uniqFlag = s.size == 1
        // otherwise we have some abbr using that already
        uniqFlag && s.contains(word)
    }
  }
}

object Solution {
  def main(args: Array[String]) = {
    val obj = new ValidWordAbbr(Array("deer", "door", "cake", "card"))
    println(obj.isUnique("cane") == false)
    println(obj.isUnique("cart") == true)
    println(obj.isUnique("door") == false)
  }
}
