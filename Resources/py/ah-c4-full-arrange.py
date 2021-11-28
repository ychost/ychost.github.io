"""
   深度搜索实现全排列
   2017-10-18
"""


class Solution:
    def __init__(self, num_len):
        """
         0-len的全排列，不含len
        :param num_len: 长度
       """
        self.len = num_len
        self.array = [0 for _ in range(0, self.len)]
        self.mark = [0 for _ in range(0, self.len)]
        self.count = 0

    def full_arrange(self):
        self.dfs(0)
        return self.array

    def dfs(self, step):
        if step == self.len:
            print(self.array)
            self.count += 1
            return
        for i in range(0, self.len):
            if self.mark[i] == 0:
                self.array[step] = i
                self.mark[i] = 1
                self.dfs(step + 1)
                self.mark[i] = 0
        return None


if __name__ == "__main__":
    solution = Solution(5)
    solution.full_arrange()
    print(solution.count)
