# https://leetcode.com/problems/height-checker/
# O(n + k) time complexity
# O(k) space complexity
# n is the length of heights
# k is the max value in heights
def height_checker(heights):
    max_num = max(heights)
    frequencies = [0] * (max_num + 1)

    for height in heights:
        frequencies[height] += 1

    i = mismatches = 0
    for height in heights:
        while frequencies[i] == 0:
            i += 1
        if height != i:
            mismatches += 1
        frequencies[i] -= 1
    return mismatches
