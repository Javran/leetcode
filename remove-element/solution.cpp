#include <vector>

class Solution {
public:
    int removeElement(std::vector<int>& nums, int val) {
        int newSz = 0;
        // as we know newSz is always less or equal to i (implicit here)
        // the write access should be fine
        for (int n : nums) {
            if (n != val) {
                nums[newSz] = n;
                ++newSz;
            }
        }
        return newSz;
    }
};
