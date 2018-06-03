import scala.collection.mutable.ArrayBuffer

class TreeNode(var _value: Int) {
  var value: Int = _value
  var left: TreeNode = null
  var right: TreeNode = null

  override def toString: String = {
    val lStr = if (left == null) "-" else left.toString
    val rStr = if (right == null) "-" else right.toString
    s"(${lStr}|${value}|${rStr})"
  }
}

object TreeTool {
  def isEqual(x: TreeNode, y: TreeNode): Boolean = (x,y) match {
    case (null, null) => true
    case (null, _) => false
    case (_, null) => false
    case _ =>
      x.value == y.value &&
      isEqual(x.left,y.left) &&
      isEqual(x.right,y.right)
  }

  def mkTree(xsRaw: String): TreeNode = {
    val xs: Array[Option[Int]] = xsRaw.split(",").map(x =>
      if (x == "null")
        None
      else
        Some(x.toInt)
    )
    if (xs.length == 0)
      return null

    var i = 0
    def next(): Option[Option[Int]] = {
      if (i >= xs.length)
        return None
      val v = xs(i)
      i += 1
      return Some(v)
    }

    val root = new TreeNode(next().get.get)
    var currentLevel = new ArrayBuffer[TreeNode]()
    currentLevel.append(root)
    var nextLevel = new ArrayBuffer[TreeNode]()
    while (currentLevel.length > 0) {
      for (curNode <- currentLevel) {
        next() match {
          case None => return root
          case Some(None) => ()
          case Some(Some(v)) =>
            val newNode = new TreeNode(v)
            curNode.left = newNode
            nextLevel.append(newNode)
        }
        next() match {
          case None => return root
          case Some(None) => ()
          case Some(Some(v)) =>
            val newNode = new TreeNode(v)
            curNode.right = newNode
            nextLevel.append(newNode)
        }
      }
      currentLevel = nextLevel
      nextLevel = new ArrayBuffer()
    }
    return root
  }
}

object Solution {
  def main(args: Array[String]) = {
    println(TreeTool.mkTree("5,4,7,3,null,2,null,-1,null,9"))
  }
}
