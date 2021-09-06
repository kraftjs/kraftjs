# https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
# O(n) time complexity
# O(n) space complexity
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def zigzag_level_traversal(root):
    result = []
    if not root:
        return result

    def dfs(node, depth=0):
        if len(result) == depth:
            result.append(deque())

        if depth % 2 == 0:
            result[depth].append(node.val)
        else:
            result[depth].appendleft(node.val)

        for child_node in [node.left, node.right]:
            if child_node is not None:
                dfs(child_node, depth + 1)

    dfs(root)
    return result
