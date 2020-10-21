# https://leetcode.com/problems/two-sum/
# O(n) time complexity
# O(n) space complexity
def two_sum(nums, target):
    dictionary = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in dictionary:
            return [dictionary[complement], i]
        dictionary[num] = i
