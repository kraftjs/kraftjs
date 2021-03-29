# https://leetcode.com/problems/flipping-an-image/
# O(N) time complexity, where N is the number of elements in the matrix
# O(1) space complexity
def flip_and_invert_image(matrix):
    for row in matrix:
        for i in range((len(row) + 1) // 2):
            row[i], row[~i] = row[~i] ^ 1, row[i] ^ 1
    return matrix
