#include <vector>
// Definition for a Node.
class Node {
public:
    int val;
    std::vector<Node*> children;

    Node() {}

    Node(int _val, std::vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};

#include <vector>
#include <functional>

class Solution {
public:
    int maxDepth(Node* root) {
        /*
          hm, for some unexplained reason c# does not work.
         */
        if (root == nullptr)
            return 0;
        int ans = 0;
        std::function<void(Node *, int)> visit = [&] (Node *n, int dep) mutable {
            if (ans < dep)
                ans = dep;
            for (auto c : n->children) {
                visit(c, dep+1);
            }
        };
        visit(root, 1);
        return ans;
    }
};
