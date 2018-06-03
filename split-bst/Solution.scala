class TreeNode(var _value: Int) {
  var value: Int = _value
  var left: TreeNode = null
  var right: TreeNode = null

  override def toString: String = {
    val lStr = if (left == null) "-" else left.toString
    val rStr = if (right == null) "-" else right.toString
    s"TreeNode(${value}, ${lStr}, ${rStr})"
  }
}

/*
 */
object Solution {
  sealed trait Dir
  final case class Left() extends Dir
  final case class Right() extends Dir

  type SplitResult = (TreeNode, TreeNode)
  type Breadcrumb = List[(Dir, TreeNode)]

  def untrace(bc: Breadcrumb)(r: SplitResult): SplitResult = bc match {
    case Nil =>
      r
    case (dir, root) :: tl =>
      val (newL, newR) = r
      val newResult = dir match {
        case Left() =>
          /*
           We were taking left path:
              root
             /   \
            T     ?
           and now T has been split into (newL, newR).

           which means we should recover context on newR and keep newL intact
           */
          root.left = newR
          (newL, root)
        case Right() =>
          // was going right.
          root.right = newL
          (root, newR)
      }
      untrace(tl)(newResult)
  }

  def splitBSTAux(V: Int, root: TreeNode, bc: Breadcrumb): SplitResult = {
    if (root == null) {
      untrace(bc)((null, null))
    } else if (root.value == V) {
      val oldRight = root.right
      root.right = null
      untrace(bc)((root, oldRight))
    } else if (root.value < V) {
      splitBSTAux(V, root.right, (Right(), root) :: bc)
    } else {
      // root.value > V
      splitBSTAux(V, root.left, (Left(), root) :: bc)
    }
  }

  def splitBST(root: TreeNode, V: Int): Array[TreeNode] = {
    val (l, r) = splitBSTAux(V, root, Nil)
    Array(l,r)
  }

  def main(args: Array[String]) = {
    val n1 = new TreeNode(1)
    val n2 = new TreeNode(2)
    val n3 = new TreeNode(3)
    val n4 = new TreeNode(4)
    val n5 = new TreeNode(5)
    val n6 = new TreeNode(6)
    val n7 = new TreeNode(7)
    val root = n4
    n4.left = n2
    n4.right = n6
    n2.left = n1
    n2.right = n3
    n6.left = n5
    n6.right = n7
    println(root)
    println(splitBST(root, 5).mkString(", "))
  }
}
