// https://leetcode.com/problems/median-of-two-sorted-arrays/
// O(log(min(m, n))) time complexity
// O(1) space complexity, where
// m and n are the length of the two sorted input arrays
function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }
  let [x, y] = [nums1.length, nums2.length];
  let [left, right] = [0, x];
  while (left <= right) {
    const partitionX = Math.floor((left + right) / 2);
    const partitionY = Math.floor((x + y + 1) / 2) - partitionX;

    let x1 = partitionX === 0 ? Number.MIN_SAFE_INTEGER : nums1[partitionX - 1];
    let x2 = partitionX === x ? Number.MAX_SAFE_INTEGER : nums1[partitionX];

    let y1 = partitionY === 0 ? Number.MIN_SAFE_INTEGER : nums2[partitionY - 1];
    let y2 = partitionY === y ? Number.MAX_SAFE_INTEGER : nums2[partitionY];

    if (x1 <= y2 && y1 <= x2) {
      if ((x + y) % 2 === 0) {
        return (Math.max(x1, y1) + Math.min(x2, y2)) / 2;
      } else {
        return Math.max(x1, y1);
      }
    } else if (x1 > y2) {
      right = partitionX - 1;
    } else {
      left = partitionX + 1;
    }
  }
}
