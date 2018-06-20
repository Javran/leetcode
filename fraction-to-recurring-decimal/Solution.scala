import scala.collection.immutable.Map
import scala.math.Integral.Implicits._
import scala.annotation.tailrec

object Solution {
  /* 
   the only reason that we are using Long here
   is because the fucking problem setter is being very fucking smart
   and want to see if abs val of MIN_INT gives something funny.
   well played, FUCK YOU.
   */
  @tailrec def fracToDec(
    numer: Long, denum: Long,
    // some bookkeeper
    visited: Map[Long, Int],
    ds: List[Int],
    dsLen: Int
  ): (List[Int], Option[Int]) = {
    val (quotL, remL) = (numer*10) /% denum
    val (quot, rem) = (quotL.toInt, remL.toInt)
    val p: (Long, Int) = (numer, dsLen)
    // keep track to see if we have met the same numer call somewhere before
    val newVisited = visited + p
    if (rem == 0)
      ((quot :: ds).reverse, None)
    else
      newVisited.get(rem) match {
        case None =>
          fracToDec(rem, denum, newVisited, quot :: ds, dsLen+1)
        case Some(v) =>
          ((quot :: ds).reverse, Some(v))
      }
  }

  def fractionToDecimal(numer: Int, denom: Int): String = {
    if (numer == 0)
      return "0"
    // by keeping signs somewhere else, we can assume always having 
    // positive nums
    val sign = numer.signum * denom.signum
    val signS = if (sign == 1) "" else "-"
    val numer1 = numer.toLong.abs
    val denom1 = denom.toLong.abs

    // whether a int part is needed
    val (intPart, numer2) = numer1 /% denom1
    val intPartS =
      if (intPart != 0)
        Some(intPart.toString)
      else
        None

    // fraction part
    val fracPartS: Option[String] =
      if (numer2 == 0)
        None
      else {
        val (ds, optNonLoop) = fracToDec(numer2, denom1, Map.empty, Nil, 0)
        optNonLoop match {
          case None =>
            Some(ds mkString "")
          case Some(v) =>
            val (lS, rS) = ds.splitAt(v)
            val lPart = lS mkString ""
            val rPart = rS mkString ""
            Some(s"${lPart}(${rPart})")
        }
      }
        
    (intPartS, fracPartS) match {
      case (None, None) =>
        "0"
      case (Some(l), None) =>
        signS + l
      case (None, Some(r)) =>
        s"${signS}0.${r}"
      case (Some(l), Some(r)) =>
        s"${signS}${l}.${r}"
    }
  }

  def main(args: Array[String]): Unit = {
    println(fractionToDecimal(16,8))
    println(fractionToDecimal(1,8))
    println(fractionToDecimal(1,6))
    println(fractionToDecimal(1,3))
    println(fractionToDecimal(2,3))
    println(fractionToDecimal(170447,499500))
    println(fractionToDecimal(0,17))
    println(fractionToDecimal(572,4995))
    println(fractionToDecimal(20576111, 166666500))
    println(fractionToDecimal(-1, -2147483648))
  }
}
