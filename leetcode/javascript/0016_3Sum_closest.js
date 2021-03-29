// https://leetcode.com/problems/3sum-closest/
// O(n^2) time complexity
// O(log(n)) space complexity
function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let difference = Infinity;
  for (let i = 0; i < nums.length && difference !== 0; i++) {
    let [left, right] = [i + 1, nums.length - 1];
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (Math.abs(sum - target) < Math.abs(difference)) {
        difference = sum - target;
      }
      if (sum > target) {
        right -= 1;
      } else {
        left += 1;
      }
    }
  }
  return difference + target;
}
