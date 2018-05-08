object Solution {
  // Magic numbers are sometimes justified! Face int overflow & underflow
  val partLim = 214748364
  val minVal = -2147483648
  val maxVal =  2147483647

  // split input, consume sign (if any)
  // Bool: true: positive, false: negative
  def getSign(s: String): (Boolean, String) = {
    if (s.length == 0)
      return (true, s)
    return s(0) match {
      case '+' => (true, s.tail)
      case '-' => (false, s.tail)
      case _ => (true, s)
    }
  }

  // for combining parsed sign and accumulated digits
  // "part" should never overflow / underflow
  def toNum(positive: Boolean, part: Int) =
    if (positive) part else -part
  
  def myAtoi(str: String): Int = {
    // strip heading spaces
    val str1 = str.dropWhile(_ == ' ')
    // get sign & remaining parts
    val (positive, str2) = getSign(str1)
    // parse digits
    // Note: don't be smart and just take 10 digits out of it -
    // this won't cover cases with left padding 0s (e.g. "00000012345")
    val digits = str2
      .takeWhile(_.isDigit) // take max amount of digits
      .dropWhile(_ == '0') // remove padding 0s
      .map(_.asDigit) // convert to digits
    // note that we are taking an advantage that
    // 0 is returned when input is an empty string or a string of all 0s
    if (digits.length == 0)
      return 0
    // no special handling for first 9 digits
    // things get complicated when int overflow & underflow is concerned
    digits.splitAt(9) match {
      case (ls, lastV) =>
        val part1 = ls.foldLeft(0)((acc, i) => acc*10+i)
        // no leftover, done here.
        if (lastV.length == 0)
          return toNum(positive, part1)
        val last = lastV(0)
        // Note: be careful about 20000000000 (11 digits) - part1 looks innocent.
        if (part1 < partLim && lastV.length == 1)
          return toNum(positive, part1*10+last)
        if (part1 > partLim || lastV.length > 1)
          return (if (positive) maxVal else minVal)
        // at this point only remaining case is when part1 == partLim && lastV.length == 1
        if (last <= 7)
          return toNum(positive, part1*10+last)
        else
          return (if (positive) maxVal else minVal)
    }
  }
  
  def main(args: Array[String]) = {
    println(myAtoi("     "))
    println(myAtoi(" -aa"))
    println(myAtoi("  +22345678901123af"))
    println(myAtoi("  -22345678901123af"))
    println(myAtoi("  -00000000022345678901"))
    println(myAtoi("2147483647"))
    println(myAtoi("-2147483647"))
    println(myAtoi("2147483649"))  
    println(myAtoi("-2147483648"))
    println(myAtoi("-2147483649"))
    println(myAtoi("200000000000"))
  }
}
