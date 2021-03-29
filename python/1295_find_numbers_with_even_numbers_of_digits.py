# https://leetcode.com/problems/find-numbers-with-even-number-of-digits/
# O(n) time complexity
# O(1) space complexity
import math


def find_numbers(nums):
    # Note: math.log10(num) is more accurate than math.log(num, 10)
    # math.log10(1000) == 3
    # math.log(1000, 10) == 2.9999999999999996
    return sum(math.trunc(math.log10(num) + 1) % 2 == 0 for num in nums)
