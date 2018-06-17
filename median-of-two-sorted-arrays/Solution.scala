import scala.annotation.tailrec

object Solution {
  type RangeInd = (Int, Int)
  type ArrView = (Array[Int], RangeInd)

  def findKthAux(k: Int, aView: ArrView, bView: ArrView): Int = {
    val (as, (aL, aR)) = aView
    val (bs, (bL, bR)) = bView
    if (aL == aR)
      return bs(k)
    if (bL == bR)
      return as(k)
    // now both aView and bView cannot be empty
    if (k == 0)
      return math.min(as(aL), bs(bL))
    // println(s"a,b ranges: ${(aL, aR)}, ${(bL,bR)}, k = ${k}")
    @tailrec def searchCut(aCutL: Int, aCutR: Int): Int =
      if (aCutL > aCutR) {
        throw new Exception("Unreachable")
      } else if (aCutL == aCutR) {
        aCutL
      } else {
        // aCutL < aCutR
        // println(s"range: ${aCutL}, ${aCutR}")
        val aCut: Int = (aCutL + aCutR) / 2
        val bCut = k - (aCut - aL) + bL
        if (bCut < bL) 
          // cutting too much of as.
          searchCut(aCutL, aCut-1)
        else if (bCut > bR)
          // cutting too less of as.
          searchCut(aCut+1, aCutR)
        else {
          // note that it could be case where aCut == aR
          if (aCut == aL) {
            if (bs(bCut-1) <= as(aCut))
              aCut
            else
              searchCut(aCut+1, aCutR)
          } else {
            // aCut > aL
            if (bCut == bL) {
              if (as(aCut-1) <= bs(bCut))
                aCut
              else
                // cutting too much
                searchCut(aCutL, aCut-1)
            } else {
              // bCut > bL
              if (bCut == bR) {
                if (bs(bCut-1) <= as(aCut))
                  aCut
                else
                  searchCut(aCut+1, aCutR)
              } else (
                // bL < bCut < bR
                if (as(aCut-1) <= bs(bCut)) {
                  if (aCut == aR || bs(bCut-1) <= as(aCut))
                    aCut
                  else
                    searchCut(aCut+1, aCutR)
                } else
                  // cutting too much
                  searchCut(aCutL, aCut-1)
              )
            }
          }
        }
    }
    val aCut = searchCut(aL, aR)
    val bCut = k - (aCut - aL) + bL
    if (aCut == aR)
      return bs(bCut)
    if (bCut == bR)
      return as(aCut)
    return math.min(as(aCut), bs(bCut))
  }

  def findKth(k: Int, aView: ArrView, bView: ArrView): Int = {
    val (as, (aL, aRInp)) = aView
    val (bs, (bL, bRInp)) = bView
    val aR = math.min(aRInp, aL+k+1)
    val bR = math.min(bRInp, bL+k+1)
    if (aR - aL < bR - bL)
      findKthAux(k, (as, (aL, aR)), (bs, (bL, bR)))
    else
      findKthAux(k, (bs, (bL, bR)), (as, (aL, aR)))
  }

  def findMedianSortedArrays(nums1: Array[Int], nums2: Array[Int]): Double = {
    /*
     if we can find k-th smallest element among two sorted list,
     this problem is as good as solved:
     depending on the length of the array, we can do two things:
     - if the length of the array l is even, need to take two middle values
       and take their average
     - otherwise we just need to find the element in the middle.
     */
    val l = nums1.length + nums2.length
    val view1 = (nums1, (0, nums1.length))
    val view2 = (nums2, (0, nums2.length))
    if ((l & 1) == 0) {
      // even
      val lo = findKth(l/2 - 1, view1, view2)
      val hi = findKth(l/2, view1, view2)
      (lo + hi).toDouble / 2
    } else {
      // odd
      findKth(l/2, view1, view2).toDouble
    }
  }

  def main(args: Array[String]): Unit = {
    println(findMedianSortedArrays(Array(1,3), Array(2)))
    println(findMedianSortedArrays(Array(1,2), Array(3,4)))
  }
}
