# https://leetcode.com/problems/reorder-data-in-log-files/
# O(n * klog(k)) time complexity where n is number of logs and k is length of logs
# O(n * K) space complexity
def reorder_log_files(logs):
    def comparator(log):
        (_id, contents) = log.split(' ', maxsplit=1)
        return (0, contents, _id) if contents[0].isalpha() else (1, )

    return sorted(logs, key=comparator)
