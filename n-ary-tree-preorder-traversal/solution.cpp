#include <vector>

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

// for easy cutting.
#include <vector>
#include <stack>

class Solution {
public:
    std::vector<int> preorder(Node* root) {
        /*
          idea: despite that we are doing the iterative approach,
          note that we always have a stack when doing traversal
          on thread-less trees: it's just the question of:

          (1) whether we would like the language to maintain a stack for us (recursive call stack)
          (2) or we would like to maintain a stack of our own and pretend it's iterative solution.

          since (1) looks trivial, we do (2).
         */
        std::vector<int> ans;
        // feel free to pack rootStack and itStack as a pair, it's totally fine
        std::stack<Node *> rootStack;
        std::stack<decltype(root->children.begin())> itStack;
        auto curRoot = root;
        /*
          let curRoot represent current focus, we either
          want to go a layer deeper, or it's not possible to
          go any further, at which point we check the stack
          to find the next focus to proceed.
         */
        while (curRoot || rootStack.size() > 0) {
            if (curRoot) {
                ans.emplace_back(curRoot->val);
                auto it = curRoot->children.begin();
                if (it < curRoot->children.end()) {
                    rootStack.push(curRoot);
                    itStack.push(it);
                    curRoot = *it;
                } else {
                    curRoot = nullptr;
                }
            } else {
                curRoot = rootStack.top();
                auto it = itStack.top();
                rootStack.pop();
                itStack.pop();
                ++it;
                if (it < curRoot->children.end()) {
                    rootStack.push(curRoot);
                    itStack.push(it);
                    curRoot = *it;
                } else {
                    curRoot = nullptr;
                }
            }
        }
        return ans;
    }
};
