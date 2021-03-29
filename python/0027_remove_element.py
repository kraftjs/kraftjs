# https://leetcode.com/problems/remove-element/
# O(n) time complexity
# O(1) space complexity
def remove_element(nums, val):
    left, right = 0, len(nums) - 1
    while left <= right:
        if nums[left] == val:
            nums[left], nums[right] = nums[right], nums[left]
            right -= 1
        else:
            left += 1
    return left
