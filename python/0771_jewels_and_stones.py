# https://leetcode.com/problems/jewels-and-stones/
# O(j+s) time complexity where j is number of jewels and s is number of stones
# O(j) space complexity
def jewels_in_stones(jewels, stones):
    jewelry = set(jewels)
    occurrences = 0
    for stone in stones:
        if stone in jewelry:
            occurrences += 1
    return occurrences
