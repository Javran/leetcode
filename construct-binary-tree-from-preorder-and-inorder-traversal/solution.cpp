struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

#include <vector>
#include <unordered_map>
#include <functional>

class Solution {
public:
    TreeNode* buildTree(std::vector<int>& preorder, std::vector<int>& inorder) {
        typedef decltype(inorder.begin()) It;
        // value to index iterator map, assuming uniqueness of values
        std::unordered_map<int, It> rev_inord;
        for (auto it = inorder.begin(); it < inorder.end(); ++it) {
            rev_inord[*it] = it;
        }
        std::function<TreeNode*(It, It, It, It)> buildAux =
            [&](It preL, It preR, It inL, It inR) -> TreeNode* {
            if (preL >= preR)
                return nullptr;
            // ranges: [inL, inPos), [inPos+1, inR)
            auto inPos = rev_inord[*preL];
            auto sizeL = inPos - inL, sizeR = inR - (inPos+1);
            auto ret = new TreeNode(*preL);
            ++preL;
            ret->left = buildAux(preL, preL+sizeL, inL, inPos);
            ret->right = buildAux(preR-sizeR, preR, inPos+1, inR);
            return ret;
        };
        return buildAux(
            preorder.begin(), preorder.end(),
            inorder.begin(), inorder.end()
        );
    }
};
