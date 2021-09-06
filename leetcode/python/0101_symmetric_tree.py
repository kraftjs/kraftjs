# https://leetcode.com/problems/symmetric-tree/
# O(n) time complexity
# O(n) space complexity
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def is_symmetric(root):
    def is_mirrored(node1, node2):
        if node1 is None and node2 is None:
            return True
        if node1 is None or node2 is None:
            return False

        check1 = is_mirrored(node1.left, node2.right)
        check2 = is_mirrored(node1.right, node2.left)

        return node1.val == node2.val and check1 and check2

    return is_mirrored(root, root)
