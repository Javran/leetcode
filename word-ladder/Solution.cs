using System;
using System.Collections.Generic;
using System.Diagnostics;

public class Solution {
    /*
      decide whether one word can be transformed into another
      by changing exactly one character
    */
    static bool CanTransform(string a, string b) {
        if (a.Length != b.Length)
            return false;
        int diff = 0;
        for (int i=0; i<a.Length && diff < 2; ++i) {
            if (a[i] != b[i])
                ++diff;
        }
        return diff == 1;
    }

    public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
        var nexts = new Dictionary<string, List<string>>();


        // create graph between elements of wordList
        //
        // INVARIANT: nexts[i] exists only when edges exist.
        // in other words, nexts[i], if exist, must be non-empty
        for (int i = 0; i < wordList.Count; ++i) {
            var w1 = wordList[i];
            for (int j = i+1; j < wordList.Count; ++j) {
                var w2 = wordList[j];
                if (CanTransform(w1,w2)) {
                    var w1Nexts = nexts.ContainsKey(w1) ? nexts[w1] : new List<string>();
                    var w2Nexts = nexts.ContainsKey(w2) ? nexts[w2] : new List<string>();
                    w1Nexts.Add(w2);
                    w2Nexts.Add(w1);
                    nexts[w1] = w1Nexts;
                    nexts[w2] = w2Nexts;
                }
            }
        }

        // as all edges we created so far are bi-directional,
        // if "nexts" does not have content for it, it is impossible to transform to this word.
        if (!nexts.ContainsKey(endWord))
            return 0;

        // if we don't have begin word in word list, we need to contain it in the graph,
        // but keep that in mind that this must only be one-directional
        if (!nexts.ContainsKey(beginWord)) {
            foreach (var w2 in wordList) {
                if (CanTransform(beginWord, w2)) {
                    var wbgNexts = nexts.ContainsKey(beginWord) ? nexts[beginWord] : new List<string>();
                    wbgNexts.Add(w2);
                    nexts[beginWord] = wbgNexts;
                }
            }
        }

        // standard BFS
        var queue = new LinkedList< Tuple<string, int> >();
        var visited = new HashSet<string>();
        queue.AddLast(Tuple.Create(beginWord, 1));
        while (queue.Count > 0) {
            var cur = queue.First.Value;
            queue.RemoveFirst();
            var curWord = cur.Item1;
            var curLen = cur.Item2;
            if (curWord == endWord)
                return cur.Item2;
            visited.Add(curWord);
            if (nexts.ContainsKey(curWord)) {
                foreach (var w in nexts[curWord]) {
                    if (!visited.Contains(w)) {
                        queue.AddLast(Tuple.Create(w, curLen+1));
                    }
                }
            }
        }

        return 0;
    }

    static void Main(string[] args) {
        var s = new Solution();
        string[] wordList = {"hot","dot","dog","lot","log","cog"};
        System.Console.WriteLine(s.LadderLength("hit", "cog", wordList));
    }
}
