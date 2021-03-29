# https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/
# O(n) time complexity
# O(1) space complexity
def replace_elements(nums):
    max_num = -1
    for i in reversed(range(len(nums))):
        max_num, nums[i] = max(nums[i], max_num), max_num
    return nums
