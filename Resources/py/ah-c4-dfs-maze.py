"""
深度搜索走迷宫
2017-10-18
"""

import random


class Solution:
    def __init__(self, maze_map):
        self.maze_map = maze_map
        # 右下左上，对应的 x y 的变化
        self.next = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        self.mazeY = len(maze_map)
        self.mazeX = len(maze_map[0])
        self.mark = [0 for _ in range(0, self.mazeY)]
        for i in range(0, 10):
            self.mark[i] = [0 for _ in range(0, self.mazeX)]
        self.find = False

    def solve(self):
        self.dfs(0, 0)
        return

    def dfs(self, x, y):
        if self.find:
            return
        if x == self.mazeX - 1 and y == self.mazeY - 1:
            self.find = True
            # 打印路径
            for _, v in enumerate(self.mark):
                print(v)
            return
        # 四种走法
        for k in range(0, 4):
            tx = x + self.next[k][0]
            ty = y + self.next[k][1]
            if tx < 0 or ty >= self.mazeY or ty < 0 or tx >= self.mazeX:
                continue
            # 只走未标记和能走的路
            if self.maze_map[tx][ty] == "_" and self.mark[tx][ty] == 0:
                self.mark[tx][ty] = 1
                self.dfs(tx, ty)
                # 没有对上个点进行遍历，所以这里要置位
                self.mark[tx][ty] = 0


if __name__ == "__main__":
    maze_map = []
    # 生成一个10*10的迷宫
    for i in range(0, 10):
        maze_map.append([])
        varray = maze_map[i]
        for j in range(0, 10):
            rand = random.randint(1, 5)
            # | 表示墙[不可走]，_表示路[可走]
            point = "|"
            if rand > 1:
                point = "_"
            varray.append(point)
        print(varray)
    # 入口
    maze_map[0][0] = "_"

    solution = Solution(maze_map)
    solution.solve()
