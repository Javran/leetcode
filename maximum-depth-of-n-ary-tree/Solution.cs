using System;
using System.Dynamic;
using System.Collections.Generic;

// Definition for a Node.
public class Node {
    public int val;
    public IList<Node> children;

    public Node(){}
    public Node(int _val,IList<Node> _children) {
        val = _val;
        children = _children;
    }
}

public class Solution {
    delegate void Visit(Node n, int dep);

    public int MaxDepth(Node root) {
        if (root == null)
            return 0;
        int ans = 0;
        Visit go = null;
        go = delegate (Node n, int dep) {
            if (ans < dep) {
                ans = dep;
            }
            foreach (var c in n.children)
                go(c, dep+1);
        };
        go(root, 1);
        return ans;
    }

    static void Main(string[] args) {
        Console.WriteLine("placeholder");
    }
}
