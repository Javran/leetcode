struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

#include <vector>

using TyVec = std::vector<TreeNode*>;

class Solution {
    void gen(int l, int r, TyVec & out) {
        if (l > r) {
            out.push_back(nullptr);
            return;
        }
        TyVec ls, rs;
        for (auto i = l; i <= r; ++i, ls.clear(), rs.clear()) {
            gen(l,i-1,ls);
            gen(i+1,r,rs);
            for (auto l : ls) {
                for (auto r : rs) {
                    auto t = new TreeNode(i);
                    t->left = l, t->right = r;
                    out.push_back(t);
                }
            }
        }
    }
public:
    TyVec generateTrees(int n) {
        TyVec out;
        /*
          someone, someone thinks oneself is very smart
          and decide to test for 0,
          which does not make any sense with "... that store values 1 ... n."
          what's worse is that, this one can't understand why null is a valid solution.

          so, we'll have to give back an empty container for n = 0,
          for which we are thankful for the pure stupidity of the problem setter.
         */
        if (n > 0) {
            gen(1,n,out);
        }
        return out;
    }
};
