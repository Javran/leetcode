#include <vector>

class Solution {
public:
    int removeDuplicates(std::vector<int>& nums) {
        int sz = 0;
        for (auto i = 0U; i < nums.size(); ++i) {
            // as we want to keep at most 2 duplicates,
            // the trick is to test for sz-2 rather than usual sz-1
            if (sz-2 < 0 || nums[i] != nums[sz-2]) {
                nums[sz] = nums[i];
                ++sz;
            }
        }
        return sz;
    }
};
