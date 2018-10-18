#include <vector>
#include <functional>

class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;

    Node() {}

    Node(
         bool _val, bool _isLeaf,
         Node* _topLeft, Node* _topRight, Node* _bottomLeft, Node* _bottomRight
    ) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};

class Solution {
public:
    Node* construct(std::vector<std::vector<int>>& grid) {
        size_t N = grid.size();
        std::function<Node*(size_t, size_t, size_t)> construct_aux = [&](
            size_t x0, size_t y0, size_t sz
        ) mutable -> Node* {
            auto ret = new Node();
            if (sz == 1) {
                ret->isLeaf = true;
                ret->val = grid[x0][y0] > 0;
                return ret;
            }
            size_t hfSz = sz / 2;
            // non-leaf nodes:
            ret->topLeft = construct_aux(x0, y0, hfSz);
            ret->topRight = construct_aux(x0, y0+hfSz, hfSz);
            ret->bottomLeft = construct_aux(x0+hfSz, y0, hfSz);
            ret->bottomRight = construct_aux(x0+hfSz, y0+hfSz, hfSz);

            // try collapsing
            bool canCollapse = ret->topLeft->isLeaf;
            bool commonVal = ret->topLeft->val;
            #define COL_TEST(X) \
                canCollapse = canCollapse && (\
                    ret->X->isLeaf && ret->X->val == commonVal \
                )
            COL_TEST(topRight);
            COL_TEST(bottomLeft);
            COL_TEST(bottomRight);
            #undef COL_TEST
            if (canCollapse) {
                #define CLR(X) delete ret->X; ret->X = nullptr
                CLR(topLeft); CLR(topRight);
                CLR(bottomLeft); CLR(bottomRight);
                #undef CLR
                ret->isLeaf = true;
                ret->val = commonVal;
                return ret;
            } else {
                ret->isLeaf = false;
                return ret;
            }
        };

        return construct_aux(0,0,N);
    }
};

