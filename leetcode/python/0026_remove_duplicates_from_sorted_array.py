# https://leetcode.com/problems/remove-duplicates-from-sorted-array/
# O(n) time complexity
# O(1) space complexity
def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1
