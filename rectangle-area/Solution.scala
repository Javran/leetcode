/*
 basic idea: figure out area of shared region,
 we will then have total area being: rectangle1 + rectangle2 - shared

 to figure out shared area is to find length of intersections
 in vertical and horizontal directions and combine them together.

 */
object Solution {
  // a segment is (a,b) where a <= b
  type Seg = (Int, Int)

  // smart constructor
  def mkSeg(a: Int, b: Int): Seg =
    if (a <= b)
      (a, b)
    else
      (b, a)

  def segSpan(a: Seg): Int = {
    val (l, r) = a
    return r - l
  }

  // whether segment a is fully covered by segment b?
  def segCovered(a: Seg, b: Seg): Boolean = {
    val (aL, aR) = a
    val (bL, bR) = b
    return bL <= aL && aR <= bR
  }

  def segIntersectLen(a: Seg, b: Seg): Int = {
    val (aL, aR) = a
    val (bL, bR) = b
    // don't worry if there are less than 4 unique elements,
    // as a segment of length 0 contributes nothing.
    val sorted = List(aL, aR, bL, bR).sorted
    // zip with an offset of one to create all smallest segments we can have
    val smallSegs = sorted.zip(sorted.tail)
    // pick only those in common
    val commonSegs = smallSegs.filter(seg =>
      segCovered(seg, a) && segCovered(seg,b)
    )
    // and figure out length of intersection
    return commonSegs.map(segSpan).sum
  }

  def computeArea(
    A: Int, B: Int, C: Int, D: Int,
    E: Int, F: Int, G: Int, H: Int
  ): Int = {
    val area1 = segSpan(mkSeg(A,C)) * segSpan(mkSeg(B,D))
    val area2 = segSpan(mkSeg(E,G)) * segSpan(mkSeg(F,H))
    val sharedW = segIntersectLen(mkSeg(A,C), mkSeg(E,G))
    val sharedH = segIntersectLen(mkSeg(B,D), mkSeg(F,H))
    return area1+area2-sharedW*sharedH
  }

  def main(args: Array[String]): Unit = {
    println(computeArea(-3, 0, 3, 4, 0, -1, 9, 2))
  }
}
