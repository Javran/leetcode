#include <vector>
#include <set>
#include <utility>

class Solution {
public:
    // preprocess the array in O(n)
    // so that we can query the number of negative numbers
    // in O(1)
    std::vector<int> prepareNegativeCount(int A[], int n) {
        // negCount[x] means the number of negative numbers within index [0..x]
        std::vector<int> negCount(n,0);
        // it is guarantedd that n >= 1, which means A[0] is always valid.
        negCount[0] = !! ( A[0] < 0 );
        for (int i = 1; i < n; ++i)
            negCount[i] = negCount[i-1] + !! (A[i] < 0);
        return negCount;
    }

    // query the number of negative numbers in a given range
    int negCountBetween(int i, int j, const std::vector<int> & negCount) {
        return negCount[j] - ((i == 0) ? 0 : negCount[i-1]);
    }

    bool isOdd(int x) {
        return !!(x & 1);
    }

    int getProductBetween (int A[], int fromInd, int toInd) {
        int prod = 1;
        for (int i = fromInd; i <= toInd; ++i)
            prod *= A[i];
        return prod;
    }

    // find the maxProduct in a given consecutive zone
    // where it is guaranteed that there is no zero in this particular zone
    // and this zone contains at least one element
    // runs in O(n) since it's just linear scans
    int maxProductNonzeros(int A[], int fromInd, int toInd,
                           const std::vector<int> & negCount) {
        int negCountInRange = negCountBetween(fromInd, toInd, negCount);
        // there are 2 cases depending on the number of negative numbers

        // 1. if negCountInRange is even, then we just take the product
        // in this range, this should be positive and maximum.
        if (! isOdd(negCountInRange) )
            return getProductBetween(A,fromInd,toInd);

        // 2. else the number of negative numbers is odd,
        // meaning at least one negative number should be present
        // in this very range
        // in this case there are two cases
        // 2.1. exactly one positive number is present
        // we divide this part into 3 pieces:
        // a | p | b
        // here a and b are nullable, but p can always be found
        // NOTE: an important thing about nullablilty (emptiness)
        // is that if we know there is an array whose product is 1
        // and the array is empty, the product 1 is not actually
        // "reachable". So we do care about the emptiness of a and b
        if (negCountInRange == 1) {
            int pInd = fromInd;
            while (A[pInd] > 0)
                ++pInd;

            // if a and b are both null, then
            // this array is of size 1, the result is obvious
            if (fromInd == toInd)
                return A[pInd];
            int aProd = getProductBetween(A,fromInd,pInd-1);
            int cProd = getProductBetween(A,pInd+1,toInd);

            // otherwise either part is empty,
            // we recognize this by telling if the index of p
            // is equal to either ends of this very range
            if (pInd == fromInd)
                return cProd;
            if (pInd == toInd)
                return aProd;
            // if none of the above applies,
            // then a and b should both be non-empty
            return aProd > cProd ? aProd : cProd;
        }

        // 2.2: we divide this part into 5 pieces:
        // a | p | c | q | b
        // where a and b are all positive numbers,
        // p and q are negative numbers,
        // now we need to figure out:
        // a * p * c and c * q * b (these two products are both positive numbers)
        // which one is larger
        // since we've known that negCountInRange > 1
        // its value is at least 3, so c is always non-empty
        // which means a*p*c and c*q*b are always "reachable",
        // the emptiness of a and b doesn't matter

        int pInd = fromInd;
        while (A[pInd] > 0)
            ++pInd;
        int qInd = toInd;
        while (A[qInd] > 0)
            --qInd;

        int aProd = getProductBetween(A,fromInd,pInd-1);
        int bProd = getProductBetween(A,qInd+1,toInd);
        int cProd = getProductBetween(A,pInd+1,qInd-1);

        int apc = aProd * A[pInd] * cProd;
        int cqb = cProd * A[qInd] * bProd;

        return apc>cqb? apc:cqb;
    }

    bool hasZero(int A[], int n) {
        for (int i = 0; i < n; ++i)
            if (A[i] == 0)
                return true;
        return false;
    }

    int maxProduct(int A[], int n) {
        // the general idea is to break the array into consecutive pieces
        // where zeros can be excluded
        // once we have a solution working with maxProduct on nonzeros,
        // we accumulate results on these consecutive pieces to yield the final result

        // initialize the current max to an always-possible value O(n)
        int currentMax = A[0];
        std::vector<int> negCount = prepareNegativeCount(A,n);
        int i = 0;
        // find non-zero zones O(n)
        while (i < n) {
            while (i < n && A[i] == 0)
                ++i;
            // all the remaining parts are zeros, nothing to do
            if (i >= n)
                break;
            // or otherwise we've found a starting point
            int j = i;
            while (j < n && A[j] != 0)
                ++j;
            // either A[j] == 0 && A[j-1] != 0
            // or j >= n && A[j-1] != 0
            // we just try j-1
            int result = maxProductNonzeros(A,i,j-1,negCount);
            if (result > currentMax)
                currentMax = result;
            i = j;
        }

        // if we have bad luck that
        // solving every non-zero range results in
        // negative numbers, our last resort is to check
        // whether our array contains zeros
        // at least zero is better than negatives
        if (hasZero(A,n))
            if (currentMax < 0)
                currentMax = 0;

        return currentMax;
    }
};

#define COUNT_OF(x) ((sizeof(x)/sizeof(0[x])) / ((size_t)(!(sizeof(x) % sizeof(0[x])))))

#include <gtest/gtest.h>

namespace {

#define MY_TEST(TN,T,E,...) TEST(TN,T) {                        \
        int a [] = { __VA_ARGS__ };                             \
        EXPECT_EQ(E,Solution().maxProduct(a,COUNT_OF(a)));      \
    }

    MY_TEST(MaxProduct, Example, 6,
            2,3,-2,4)
    MY_TEST(MaxProduct, ExampleMod1, 48,
            2,3,-2,-4)
    MY_TEST(MaxProduct, Singleton, -2,
            -2)
    MY_TEST(MaxProduct, CaseSingleOdd1, 24,
            2,3,4,-5)
    MY_TEST(MaxProduct, CaseSingleOdd2, 2,
            -5,1,2);
    MY_TEST(MaxProduct, CaseMoreOdd, 378,
            2,3,-2,-9,-6,7,1)
    MY_TEST(MaxProduct, ResultAccum, 10,
            1,0,2,3,0,10)
    MY_TEST(MaxProduct, Unlucky, 0,
            -1,0,-2)

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
