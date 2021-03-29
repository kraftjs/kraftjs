# https://leetcode.com/problems/single-number/
# O(n) time complexity
# O(1) space complexity
def single_number(nums):
    ans = 0
    for num in nums:
        ans ^= num
    return ans
