# https://leetcode.com/problems/squares-of-a-sorted-array/
# O(n) time complexity
# O(n) space complexity
def sorted_squares(nums):
    squares = []

    pos_neg_boundary = 0
    while pos_neg_boundary < len(nums) and nums[pos_neg_boundary] < 0:
        pos_neg_boundary += 1
    left = pos_neg_boundary - 1
    right = pos_neg_boundary

    while left >= 0 and right < len(nums):
        if abs(nums[left]) < abs(nums[right]):
            squares.append(nums[left] ** 2)
            left -= 1
        else:
            squares.append(nums[right] ** 2)
            right += 1
    while left >= 0:
        squares.append(nums[left] ** 2)
        left -= 1
    while right < len(nums):
        squares.append(nums[right] ** 2)
        right += 1

    return squares
