#include <iostream>
#include <cassert>

// TODO

class Solution {
    int divide_aux(int a, int b) {
        /*
          - q = a/b, r = a%b
          - (a/b) * b + a%b is equal to a
          - q * b + r = a
         */
        /*
          - positive cases
          - non-overflowing
          - maybe some other corner cases
         */
        if (a < b)
            return 0;
        unsigned int a1 = a, b1 = b;
        int shift = 0;
        while ((b1 << 1) <= a1) {
            b1 <<= 1;
            ++shift;
        }
        unsigned int q = 0;
        for (/* NOOP */; shift >= 0; --shift) {
            q <<= 1;
            if (a1 >= b1) {
                a1 -= b1;
                ++q;
            }
            b1 >>= 1;
        }
        return q;
    };

public:
    int divide(int a, int b) {
        return divide_aux(a,b);
    }
};

int main() {
    auto s = Solution();
    for (int i = 0; i < 10000; ++i) {
        for (int j = 1; j < 10000; ++j) {
            int expected = i / j;
            int actual = s.divide(i, j);
            assert(expected == actual);
        }
    }
    return 0;
}
