using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    // generate a stream of reversed digits for number v (in decimal)
    IEnumerable<int> RevDigits(int v) {
        var cur = v;
        while (cur > 0) {
            yield return cur % 10;
            cur /= 10;
        }
    }

    public IList<int> SelfDividingNumbers(int left, int right) {
        return Enumerable.Range(left, right - left + 1).Where(x => {
            // test values in range and require all digits to be non-zero and divisible
            return RevDigits(x).All(d => d != 0 && x % d == 0);
        }).ToList();
    }

    static void Main(string[] args) {
        var s = new Solution();
        Console.WriteLine(s.SelfDividingNumbers(1,22));
    }
}
