// let's do rational numbers
//   instead of imprecise floating ones
//   just for fun XD
// RU: short for Ratio Utils
object RU {
  // hopefully numerator and denominator won't blow up
  // as we are dealing with just 4 numbers
  // all values with denominator being 0 is NaN and should never be used
  // as input to any of the following functions
  type Ratio = (Int, Int)

  def fromInt(a: Int): Ratio = (a, 1)

  def add(a: Ratio, b: Ratio): Ratio = {
    val ((n1, d1), (n2, d2)) = (a, b)
    (n1*d2+n2*d1, d1*d2)
  }

  def sub(a: Ratio, b: Ratio): Ratio = {
    val ((n1, d1), (n2, d2)) = (a, b)
    (n1*d2-n2*d1, d1*d2)
  }

  def mul(a: Ratio, b: Ratio): Ratio = {
    val ((n1, d1), (n2, d2)) = (a, b)
    (n1*n2, d1*d2)
  }

  def div(a: Ratio, b: Ratio): Ratio = {
    val ((n1, d1), (n2, d2)) = (a, b)
    if (n2 == 0 || d2 == 0)
      (0, 0)
    else
      (n1*d2, n2*d1)
  }

  def isNaN(v: Ratio): Boolean = v._2 == 0

  def simplify(v: Ratio): Ratio = {
    val (a,b) = v
    if (b == 0)
      return (0,0)
    if (a == 0)
      return (0,1)

    def gcd(a: Int, b: Int): Int = {
      if (b == 0)
        a
      else
        gcd(b, a % b)
    }

    val sign: Int = a.signum * b.signum
    val (a1, b1) = (a.abs , b.abs)
    val c = gcd(a1, b1)
    (sign * (a1/c), b1/c)
  }

  // non-determinisitically perform one operation of +,-,*,/
  // and return all distinct results
  def combine(a: Ratio, b: Ratio): List[Ratio] = (
    for (
      op <- List[(Ratio, Ratio) => Ratio](add, sub, mul, div);
      result = op(a,b);
      if !isNaN(result)
    ) yield simplify(result)
  ).distinct
}

object Solution {
  type Ratio = RU.Ratio
  type Nums = List[Ratio]

  // non-determinisitically pick one value from existing list
  // returns list of (<picked>, <all other elements)
  def chooseOne[T](xs: List[T]): List[(T, List[T])] = xs match {
    case Nil => Nil
    case y :: ys =>
      val results = chooseOne(ys)
      (y, ys) :: results.map({case (z, zs) => (z, y :: zs)})
  }

  def judgePoint24(numsArr: Array[Int]): Boolean = {
    val nums: Nums = numsArr.toList.map(RU.fromInt)
    val initStates = nums :: Nil

    def step(states: List[Nums]): List[Nums] =
      for (
        st <- states;
        (n1, remained1) <- chooseOne(st);
        (n2, remained2) <- chooseOne(remained1);
        result <- RU.combine(n1,n2)
      ) yield result :: remained2

    val results = for (
      // 3 steps to combine 4 numbers into one
      rs <- step(step(step(initStates)))
      if rs.length == 1 && rs.head == (24, 1)
    ) yield rs.head

    results.length > 0
  }

  def main(args: Array[String]) = {
    println(judgePoint24(Array(1,2,3,4)) == true)
    println(judgePoint24(Array(4,1,8,7)) == true)
    println(judgePoint24(Array(1,5,5,5)) == true)
    println(judgePoint24(Array(1,2,1,2)) == false)
  }
}
