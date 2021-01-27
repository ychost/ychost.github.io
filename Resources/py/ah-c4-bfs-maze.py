"""
    利用广度优先走迷宫
    2017-10-20
"""
import random
from queue import Queue


class Note:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.s = 0
        self.f = None


class Solution:
    def __init__(self, map_maze):
        self.maze_map = maze_map
        # 右下左上，对应的 x y 的变化
        self.next = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        self.mazeY = len(maze_map)
        self.mazeX = len(maze_map[0])
        self.mark = [0 for _ in range(0, self.mazeY)]
        self.minStep = 99999
        for i in range(0, self.mazeY):
            self.mark[i] = [0 for _ in range(0, self.mazeX)]
        self.que = Queue(-1)

    def solve(self):
        self.bfs()

    def bfs(self):
        # 初始化，入口为 (0,0) 可以自行更改
        start = Note()
        self.que.put(start)
        self.mark[0][0] = 1
        while not self.que.empty():
            vv = self.que.get()
            for k in range(0, 4):
                tx = vv.x + self.next[k][0]
                ty = vv.y + self.next[k][1]
                # 抵达终点
                if tx == self.mazeX - 1 and ty == self.mazeY - 1:
                    print("到达终点")
                    continue
                    # 以队列中的下一个点为起点开始进行广度搜索
                # 越界判断
                if tx < 0 or tx >= self.mazeX or ty < 0 or ty >= self.mazeY:
                    continue
                # 标记和墙判断
                if self.maze_map[tx][tx] == "_" and self.mark[tx][ty] == 0:
                    self.mark[tx][ty] = 1
                    # 加入队列中
                    vw = Note()
                    vw.x = tx
                    vw.y = ty
                    vw.f = vv
                    vw.s = vv.s + 1
                    self.que.put(vw)


if __name__ == "__main__":
    maze_map = []
    # 生成一个10*10的迷宫
    for i in range(0, 10):
        maze_map.append([])
        varray = maze_map[i]
        for j in range(0, 10):
            rand = random.randint(1, 3)
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
