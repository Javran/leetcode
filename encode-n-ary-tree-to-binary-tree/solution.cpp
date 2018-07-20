#include <vector>
// Definition for a Node.
class Node {
public:
    int val = 0;
    std::vector<Node*> children;

    Node() {}

    Node(int _val, std::vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

#include <vector>

// https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree

class Codec {
public:
    // Encodes an n-ary tree to a binary tree.
    TreeNode* encode(Node* root) {
        if (root == nullptr)
            return nullptr;
        auto ret = new TreeNode(root->val);
        if (root->children.size() == 0)
            return ret;
        auto it = root->children.begin();
        ret->left = encode(*it);
        ++it;
        for (auto cur = ret->left; it < root->children.end(); ++it, cur = cur->right) {
            cur->right = encode(*it);
        }
        return ret;
    }

    // Decodes your binary tree to an n-ary tree.
    Node* decode(TreeNode* root) {
        if (root == nullptr)
            return nullptr;
        auto ret = new Node(root->val, std::vector<Node*>(0));
        for (auto cur = root->left; cur; cur = cur->right) {
            ret->children.emplace_back(decode(cur));
        }
        return ret;
    }
};
