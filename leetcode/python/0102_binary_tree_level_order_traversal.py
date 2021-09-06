# https://leetcode.com/problems/binary-tree-level-order-traversal/
# O(n) time complexity
# O(n) space complexity
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def level_order(root):
    queue = deque([root])
    result = []

    while queue:
        level = []

        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
            level.append(node.val)

        result.append(level)

    return result
