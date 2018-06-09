import scala.annotation.tailrec

object Solution {
  // aux only accept non-negative numbers
  @tailrec def myPowAux(x: Double, n: Int, acc: Double): Double = n match {
    case 0 => acc
    case _ if x == 1 => acc
    case _ if (n & 1) == 1 =>
      // for odd n
      // x^n = (x^2)^floor(n/2) * x
      myPowAux(x*x, n >> 1, acc*x)
    case _ =>
      myPowAux(x*x, n >> 1, acc)
  }

  def myPow(x: Double, n: Int): Double = n match {
    case -2147483648 =>
      // to test setter: FUCK YOU
      1 / myPowAux(x, 2147483647, x)
    case _ if n < 0 =>
      1 / myPowAux(x, -n, 1)
    case _ =>
      myPowAux(x, n, 1)
  }

  def main(args: Array[String]): Unit = {
    println(myPow(2.1, 3))
    println(myPow(2.1, -3))
    for (
      i <- -10 to 10
      if i != 0;
      j <- -10 to 10
      if myPow(i,j) != scala.math.pow(i,j)
    ) yield println(s"violated: $i $j")
    println(myPow(1.00000, -2147483648))
  }
}
