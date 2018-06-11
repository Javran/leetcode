import scala.annotation.tailrec

object Solution {
  // get reversed running length.
  // but here we don't really care what exactly is the character
  // also it does not matter whether we count from left or right
  // so there is no need reversing the accumulated result.
  @tailrec def getRunLengthsRev(xs: List[Char], acc: List[Int]): List[Int] = xs match {
    case Nil => acc
    case y :: ys =>
      val (zs, xs1) = ys.span(_ == y)
      getRunLengthsRev(xs1, (zs.length + 1) :: acc)
  }

  def countBinarySubstrings(s: String): Int = {
    val runs = getRunLengthsRev(s.toList, Nil)
    // make pair by one-offset
    val paired = runs.zip(runs.tail)
    // now that we have all pairs, just take MIN of them.
    // this is because "111000" implies "1100" and "10",
    // so for things like "1111000" or "000111111", we have exactly 3 substrings
    // that satisfy the requirement.
    paired.map({ case (x,y) => math.min(x,y) }).sum
  }

  def main(args: Array[String]): Unit = {
    println(countBinarySubstrings("001100011"))
  }
}
