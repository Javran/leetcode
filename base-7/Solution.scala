import scala.math.Integral.Implicits._
import scala.annotation.tailrec

object Solution {
  // assume n is always non-negative number
  @tailrec def toBase7(n: Int, ds: List[Int]): List[Int] =
    if (n == 0)
      ds
    else {
      val (q, r) = n /% 7
      toBase7(q, r :: ds)
    }

  def convertToBase7(n: Int): String = {
    if (n == 0)
      return "0"
    val signS = if (n.signum > 0) "" else "-"
    val s = toBase7(n.abs, Nil) mkString ""
    s"${signS}${s}"
  }

  def main(args: Array[String]): Unit = {
    println(convertToBase7(100))
    println(convertToBase7(0))
    println(convertToBase7(-1000))
    println(convertToBase7(123456))
  }
}
