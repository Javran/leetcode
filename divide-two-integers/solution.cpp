#include <iostream>
#include <cassert>
#include <climits>

class Solution {
    /*
      this function assumes that:
      - a > 0 && b > 0
     */
    int divide_aux(int a, int b) {
        if (a < b)
            return 0;
        unsigned int a1 = a, b1 = b;
        int shift = 0;
        // should be safe to do the shift, given b1 <= INT_MAX
        // we know (b1 << 1) < UINT_MAX
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
        if (a == 0)
            return 0;
        short resultSign = 1;
        int p_a, p_b;
        if (a > 0) {
            p_a = a;
        } else {
            resultSign = -1;
            p_a = -a;
        }
        if (b > 0) {
            p_b = b;
        } else {
            // it's guaranteed that b cannot be 0
            resultSign *= -1;
            p_b = -b;
        }
        if (b == INT_MIN) {
            // INT_MIN = -2^31 whose positive counterpart
            // cannot be represented in 32 bits and
            // is larger than any signed 32 bit int.
            // so unless we have a == INT_MIN, we should always return 0
            return a == INT_MIN ? 1 : 0;
        }
        int result;
        if (a == INT_MIN) {
            // a is INT_MIN and b is not INT_MIN.
            // two things might be of interest:
            // b == 1 or b == -1
            if (b == 1)
                return INT_MIN;
            if (b == -1)
                // this overflows
                return INT_MAX;
            result = divide_aux(INT_MAX, p_b);
            int r = INT_MAX - p_b*result;
            /*
                 p_b*result + r = (1 << 31) - 1
              => p_b*result + (r+1) = (1 << 31)
            */
            if (r+1 >= p_b)
                ++result;
            return resultSign * result;
        } else {
            result = divide_aux(p_a, p_b);
            return resultSign * result;
        }
    }
};

int main() {
    auto s = Solution();

    for (int i = -1000; i < 1000; ++i) {
        for (int j = -1000; j < 1000; ++j) {
            if (j == 0)
                continue;
            int expected = i / j;
            int actual = s.divide(i, j);
            assert(expected == actual);
        }
    }
    for (int i = -1000; i < 1000; ++i) {
        if (i > -2 && i < 2)
            continue;
        long expected = ((long)INT_MIN) / i;
        int actual = s.divide(INT_MIN, i);
        if (actual != expected) {
            std::cout << s.divide(INT_MIN, i) << ", " << expected << '\n';
        }
    }
    assert(s.divide(INT_MIN, -1109186033) == 1);
    return 0;
}
