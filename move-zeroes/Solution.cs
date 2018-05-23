using System;

public class Solution {
    public void MoveZeroes(int[] nums) {
        int srcInd = 0, tgtInd = 0;
        while (srcInd < nums.Length) {
            // skipping zeroes
            while (srcInd < nums.Length && nums[srcInd] == 0)
                ++srcInd;

            // INVARIANT:
            // - either srcInd < nums.Length and nums[srcInd] is not zero
            //     or srcInd >= nums.Length
            // - nums from index 0 to index tgtInd-1 are all processed
            // - tgtInd <= srcInd
            if (srcInd < nums.Length) {
                if (tgtInd != srcInd) {
                    nums[tgtInd] = nums[srcInd];
                }
                ++srcInd;
                ++tgtInd;
            } 
        }
        // we have reached the array end, no more zeros to be copied
        // so we just continue and set all [tgtInd+1 ..] zero.
        for (int i = tgtInd; i < nums.Length; ++i) {
            nums[i] = 0;
        }
    }

    static void Main(string[] args) {
        int [] nums = {0,1,2,3};
        foreach (var n in nums)
            Console.WriteLine(n);
        new Solution().MoveZeroes(nums);
        foreach (var n in nums)
            Console.WriteLine(n);
    }
}
