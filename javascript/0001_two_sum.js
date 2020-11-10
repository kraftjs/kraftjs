// https://leetcode.com/problems/two-sum/
// O(n) time complexity
// O(n) space complexity
function twoSum(nums, target) {
  let mappedToIndex = new Map();
  for (const [idx, num] of nums.entries()) {
    const complement = target - num;
    if (mappedToIndex.has(complement)) {
      return [mappedToIndex.get(complement), idx];
    }
    mappedToIndex.set(num, idx);
  }
}
