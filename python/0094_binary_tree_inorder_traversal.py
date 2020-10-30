# https://leetcode.com/problems/binary-tree-inorder-traversal/
# O(n) time complexity
# O(n) space complexity
def inorder_traversal(root):
    def traversal_helper(node):
        if node is None:
            return

        traversal_helper(node.left)
        output.append(node.val)
        traversal_helper(node.right)

    output = []
    traversal_helper(root)
    return output
