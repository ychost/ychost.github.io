'''
    http://developer.51cto.com/art/201403/430986.htm
    常见的排序算法
    2017-10-12
'''


class QuickSort:
    def quickSort(self, nums):
        '''
            快速排序
        '''
        self.quickSortDetail(nums, 0, len(nums) - 1)
        return nums

    def quickSortDetail(self, nums, left, right):
        if left > right:
            return None
        # 基准数
        stdMark = nums[left]
        i, j = left, right
        # 右边[小于]基准的数据与左边[大于]基准的数据进行交换，递增
        # 反之，递减
        while i != j:
            while nums[j] >= stdMark and j > i:
                j -= 1
            while nums[i] <= stdMark and j > i:
                i += 1
            nums[i], nums[j] = nums[j], nums[i]
        # 基准归位
        nums[left], nums[i] = nums[i], nums[left]
        # 基准左边进行排序
        self.quickSortDetail(nums, left, j - 1)
        # 基准右边进行排序
        self.quickSortDetail(nums, i + 1, right)


class HeapSort:
    def heapSort(self, nums):
        '''
            堆排序
        '''
        n = len(nums)
        # 创最大堆
        self.heapCreate(nums, n)
        while n > 0:
            # 将最大值放到最后一片叶子
            nums[0], nums[n - 1] = nums[n - 1], nums[0]
            # 除去最大点
            n -= 1
            # 保持堆特性
            self.heapCreate(nums, n)
        return nums

    def heapCreate(self, nums, n):
        '''
            将nums改变成一个最大堆
            最大堆比最小堆效率更高，不需要额外的空间来存临时输值
        '''
        # 叶子节点忽略，因为他们没有儿子
        # 从最后一片叶子向根节点保持最大堆特性
        i = n // 2
        while i >= 0:
            self.heapShift(nums, i, n)
            i -= 1

    def heapShift(self, nums, i, n):
        '''
           交换父子节点
        '''
        t = 0
        if i * 2 < n:
            # 左边儿子>父节点
            if nums[i * 2] > nums[i]:
                t = i * 2
            else:
                t = i
            # 右边儿子>父节点
            if i * 2 + 1 < n and nums[i * 2 + 1] > nums[t]:
                t = i * 2 + 1
            if t != i:
                # 交换父节点与儿子
                nums[t], nums[i] = nums[i], nums[t]


if __name__ == "__main__":
    quickSort = QuickSort()
    heapSort = HeapSort()
    nums = [45, 9, 2, 19, 2, 4, 0, 2, 6, 8, 33]
    quickSortNumsStr = ",".join([str(i) for i in quickSort.quickSort(nums[:])])
    print("quickSort: "+quickSortNumsStr)
    heapStortStr = ",".join([str(i) for i in heapSort.heapSort(nums[:])])
    print("heapSort: "+heapStortStr)


