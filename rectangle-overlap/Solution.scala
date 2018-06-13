/*
 see: rectangle-area
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
    val sorted = List(aL, aR, bL, bR).sorted
    val smallSegs = sorted.zip(sorted.tail)
    val commonSegs = smallSegs.filter(seg =>
      segCovered(seg, a) && segCovered(seg,b)
    )
    commonSegs.map(segSpan).sum
  }

  def isRectangleOverlap(rec1: Array[Int], rec2: Array[Int]): Boolean = {
    val Array(ax1,ay1,ax2,ay2) = rec1
    val Array(bx1,by1,bx2,by2) = rec2
    val sharedW = segIntersectLen(mkSeg(ax1,ax2), mkSeg(bx1,bx2))
    val sharedH = segIntersectLen(mkSeg(ay1,ay2), mkSeg(by1,by2))
    return sharedH * sharedW != 0
  }

  def main(args: Array[String]): Unit = {
    println(isRectangleOverlap(Array(0,0,2,2), Array(1,1,3,3)))
    println(isRectangleOverlap(Array(0,0,1,1), Array(1,0,2,1)))
  }
}
