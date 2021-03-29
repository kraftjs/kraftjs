# https://leetcode.com/problems/sort-array-by-parity/
# O(n) time complexity
# O(1) space complexity
def sort_array_by_parity(array):
    left, right = 0, len(array) - 1
    while left < right:
        if array[left] % 2 == 0:
            left += 1
        else:
            array[left], array[right] = array[right], array[left]
            right -= 1
    return array
