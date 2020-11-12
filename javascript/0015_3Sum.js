// https://leetcode.com/problems/3sum/
// O(n^2) time complexity
// O(log(n))
function threeSum(nums) {
  function twoSum(idx) {
    let [left, right] = [idx + 1, nums.length - 1];
    while (left < right) {
      const sum = nums[idx] + nums[left] + nums[right];
      if (sum > 0) {
        right -= 1;
      } else if (sum < 0) {
        left += 1;
      } else {
        output.push([nums[idx], nums[left++], nums[right--]]);
        while (left < right && nums[left - 1] === nums[left]) {
          left += 1;
        }
      }
    }
  }

  nums.sort((a, b) => a - b);
  const output = [];
  for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
    if (i === 0 || nums[i - 1] !== nums[i]) {
      twoSum(i);
    }
  }
  return output;
}
