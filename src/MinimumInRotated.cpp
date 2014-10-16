#include <vector>
#include <algorithm>
#include <cassert>

class Solution {
public:
    int binarySearch(std::vector<int> &num, int indFrom, int indTo) {
        // here we use the first element in range as a pivot
        // to search through all the rest elements in range
        int size = indTo - indFrom + 1;
        // deal with trivial cases
        if (size == 1)
            return num[indFrom];
        if (size == 2)
            return std::min(num[indFrom],num[indTo]);

        // search in zone: [indL .. indR]
        int indP = indFrom;
        int indL = indFrom + 1;
        int indR = indTo;
        // middle index
        int indMid = indL + (indR-indL+1)/2 -1;

        // suppose we visualize the vector
        // in the following way:
        //    .
        //   ..
        //  ...
        // ....
        // ....  .
        // .... ..
        // .......
        // PL    R

        // if num[P] > num[M]:
        //    .
        //   ..
        //  ...
        // ....
        // ....  .
        // .... ..
        // .......
        // PL  M R
        // we then search in range [P .. M]
        if (num[indP] > num[indMid])
            return binarySearch(num,indP,indMid);
        // if num[P] < num[M]
        //    .
        //   ..
        //  ...
        // ....
        // ....  .
        // .... ..
        // .......
        // PLM   R
        // we then search in range [M .. R]
        if (num[indP] < num[indMid])
            return binarySearch(num,indMid,indR);
        // the last case is num[P] == num[M]
        // but we know this is impossible because
        // there is no way that P == M, and every number
        // in this array is unique
        assert( num[indFrom] != num[indMid] );
        return -1;

        // a final check to make sure this binary search
        // won't get stuck somewhere:
        // suppose n is the length of the search range:
        // if n is odd: next search range must be (n+1)/2
        // the only case where n <= (n+1)/2 is n == 1
        // which end up in a trivial case
        // if n is even: next search range must be either:
        // n/2 or n/2 +1
        // * there is no such a "n" that satisfies n <= n/2
        // * n <= n/2 +1 has only one possible solution: n == 2,
        //   which goes to a trivial case
        // so this binary search won't get stuck
    }

    int findMin(std::vector<int> &num) {
        // there are two cases:
        return (num.front() < num.back())
            // if the array isn't rotated at all,
            // then the minimum is the first element
            ? num.front()
            // otherwise the minimum is somewhere else,
            // we start a binary search in this whole range
            // (the first element is included as a pivot)
            : binarySearch(num, 0, num.size() - 1);
    }
};

#define COUNT_OF(x) ((sizeof(x)/sizeof(0[x])) / ((size_t)(!(sizeof(x) % sizeof(0[x])))))

#include <gtest/gtest.h>

namespace {

#define MY_TEST(TN,T,E,...) TEST(TN,T) {                                \
        int a[] = { __VA_ARGS__ };                                      \
        std::vector<int> b(a,a+COUNT_OF(a));                            \
        EXPECT_EQ(E,Solution().findMin(b));                             \
    }

    MY_TEST(MinInRotated, Singleton, 1,
            1)
    MY_TEST(MinInRotated, TwoElems1, 1,
            1,5)
    MY_TEST(MinInRotated, TwoElems2, 2,
            6,2)
    MY_TEST(MinInRotated, Three, 1,
            2,4,1)
    MY_TEST(MinInRotated, Four, -1,
            1,2,3,-1)
    MY_TEST(MinInRotated, FourNoRotate, 1,
            1,2,3,4)
#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
