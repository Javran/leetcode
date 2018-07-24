leetcode
========

[![Build Status](https://travis-ci.org/Javran/leetcode.svg?branch=master)](https://travis-ci.org/Javran/leetcode)

My LeetCode solutions, aiming at clear comments &amp; explanations.

Unless stated, all source codes in this repo are accepted.

Nowadays most source codes are available in JavaScript as I feel that's the language for prototyping.
Occasionally I'll use Scala to get some functional programming going
or simply for HashMap and stuff not easily available for LeetCode's JavaScript environment.

[leetcode-zwischenzug](https://www.npmjs.com/package/leetcode-zwischenzug),
which is a package I'm working on to improve testing & debugging LeetCode problems
locally. Please install this package if you want to run the code locally.

# Regarding CSharp Programs (mono)

Workaround for mono to work: `export TERM=xterm`

(see: https://github.com/mono/mono/issues/6752#issuecomment-365212655)

```shell
mcs Solution.cs && mono Solution.exe
```
