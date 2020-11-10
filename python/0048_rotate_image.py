# https://leetcode.com/problems/rotate-image/
# O(r * c) where r is the length or rows and c is the length of columns
# O(1) space complexity
def rotate(matrix):
    for i, row in enumerate(matrix):
        for j in range(len(row) - i):
            size = len(matrix) - 1
            matrix[i][j], matrix[size - j][size - i] = matrix[size - j][size - i], matrix[i][j]
    matrix.reverse()
