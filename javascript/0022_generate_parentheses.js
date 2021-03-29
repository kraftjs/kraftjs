// https://leetcode.com/problems/generate-parentheses/
// O(4**n / sqrt(n)) time complexity
// O(4**n / sqrt(n)) space complexity
function generateParenthesis(n) {
  const backtrack = (generated = '', left = 0, right = 0) => {
    if (generated.length === n * 2) {
      output.push(generated);
      return;
    }
    if (left < n) {
      backtrack(generated + '(', left + 1, right);
    }
    if (right < left) {
      backtrack(generated + ')', left, right + 1);
    }
  };

  let output = [];
  backtrack();
  return output;
}
