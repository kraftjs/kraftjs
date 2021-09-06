# https://leetcode.com/problems/number-of-islands/
# O(n * m) time complexity
# O(n * m) space complexity,
# where n is number of rows and m is number of columns
def num_islands(grid):
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    visited = [[False] * cols for _ in range(rows)]

    def explore_island(row, col):
        if row not in range(rows) or col not in range(cols):
            return

        if grid[row][col] == '0' or visited[row][col]:
            return

        visited[row][col] = True

        explore_island(row - 1, col)
        explore_island(row + 1, col)
        explore_island(row, col + 1)
        explore_island(row, col - 1)

    islands = 0
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == '1' and not visited[row][col]:
                islands += 1
                explore_island(row, col)
    return islands
