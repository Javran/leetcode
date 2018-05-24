object Solution {
  /*
   TYPE INVARIANT:

   - every number in range [0..99999999], starting from
     least significant digits to most significant digits

   - all auxiliary functions (with "Aux") are not required to normalize their outputs

   */
  type BigNum = List[Int]

  val zero: BigNum = 0 :: Nil
  val bgBase: Long = 100000000

  def splitNum(tmp: Long): (Int, Int) = {
    val lo = (tmp % bgBase).toInt
    val hi = (tmp / bgBase).toInt
    (lo, hi)
  }

  def rawToBigNum(raw: String): BigNum = {
    val padLen = 8 - (raw.length % 8)
    // padding raw input
    val paddedRaw =
      if (padLen == 8)
        raw
      else
        "0"*padLen + raw
    // break into chunks
    val grouped = paddedRaw.grouped(8)
      .map(_.toInt)
      .dropWhile(_ == 0)
      .toList
    if (grouped.length == 0)
      zero
    else
      grouped.reverse
  }

  // to normalized representation:
  // - must be non-empty
  // - no leading 0s (no trailing 0s in representation)
  def normBigNum(a: BigNum): BigNum = {
    // to remove trailing 0s in representation by
    //   breaking list into zero groups and non-zero groups
    //   then determining to either keep current group of zeros
    //   or drop it if it happens to be the trailing one
    def normBigNumAux(a: BigNum): BigNum = a.span(_ == 0) match {
      case (_, Nil) =>
        // all zeroes
        Nil
      case (zeros, nonZeros) =>
        val (nonZeros1, zeros1) = nonZeros.span(_ != 0)
        zeros ::: nonZeros1 ::: normBigNumAux(zeros1)
    }

    // step 2: all Nils should be [0]s so that we keep a non-empty rep
    normBigNumAux(a) match {
      case Nil => zero
      case _ => a
    }
  }

  def multiplyAux(xs: BigNum, v: Int, carry: Int): BigNum = xs match {
    case Nil =>
      if (carry > 0)
        carry :: Nil
      else
        Nil
    case _ if v == 0 =>
      // observation: only number causing number size to shrink
      // is by multiplying zero
      if (carry > 0)
        carry :: Nil
      else
        Nil
    case y :: ys =>
      // need Long so it won't overflow
      val tmp : Long = y.toLong * v.toLong + carry.toLong
      val (lo, hi) = splitNum(tmp)
      lo :: multiplyAux(ys, v, hi)
  }

  def addAux(a: BigNum, b: BigNum, carry: Int): BigNum = (a, b) match {
    case (x :: xs, y :: ys) =>
      val tmp = x.toLong + y.toLong + carry.toLong
      val (lo, hi) = splitNum(tmp)
      lo :: addAux(xs, ys, hi)
    case (Nil, Nil) =>
      if (carry > 0)
        carry :: Nil
      else
        Nil
    case (Nil, _) =>
      addAux((0 : Short) :: Nil, b, carry)
    case (_, Nil) =>
      addAux(a, (0 : Short) :: Nil, carry)
  }

  def multiplyBN(a: BigNum, b: BigNum) = {
    val components : List[BigNum] = a.map(multiplyAux(b, _, 0))
    // put components together, padding 0s as needed
    def combine(cs: List[BigNum]): BigNum = cs match {
      case Nil => Nil
      case x :: xs =>
        addAux(x, combine(xs.map(0 :: _)), 0)
    }
    normBigNum(combine(components))
  }

  def bigNumToString(xs: BigNum) = xs.reverse match {
    case Nil =>
      "0"
    case y :: ys =>
      y.toString + ys.map(x => f"${x}%08d").mkString("")
  }

  def multiply(numRaw1: String, numRaw2: String): String = {
    val a = rawToBigNum(numRaw1)
    val b = rawToBigNum(numRaw2)
    return bigNumToString(multiplyBN(a,b))
  }

  def main(args: Array[String]) = {
    val a = "00066615516655"
    val b = "0114514810893"
    println(rawToBigNum(a))
    println(multiplyAux(rawToBigNum(b), 1234 : Int, 0 : Int))
    println(addAux(rawToBigNum("0"), rawToBigNum("9999"), 1))
    println(multiply(a,b))
    println(multiply(b,a))
    println(multiply("0",a))
    println(multiply(a,"0"))
  }
}
