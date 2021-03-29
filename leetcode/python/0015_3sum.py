# https://leetcode.com/problems/3sum/
# O(n^2) time complexity
# O(n) space complexity for worst case python sort implementation
def three_sum(nums):
    def two_sum(array, index, output):
        left, right = index + 1, len(array) - 1
        while left < right:
            total = array[index] + array[left] + array[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                output.append([array[index], array[left], array[right]])
                left += 1
                right -= 1
                while left < right and array[left] == array[left - 1]:
                    left += 1

    triplets = []
    nums.sort()
    for i, _ in enumerate(nums):
        if nums[i] > 0:
            break
        if i == 0 or nums[i] != nums[i - 1]:
            two_sum(nums, i, triplets)
    return triplets
