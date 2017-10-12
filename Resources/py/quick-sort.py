'''
    http://developer.51cto.com/art/201403/430986.htm
    快速排序
    2017-10-12'''

class Sort:
    def quickSort(self,nums):
        self.quickSortDetail(nums,0,len(nums)-1)
        return nums

    def quickSortDetail(self,nums,left,right):
        if left > right:
            return None
        #基准数
        stdMark = nums[left]
        i,j = left,right
        #右边[小于]基准的数据与左边[大于]基准的数据进行交换，递增
        #反之，递减
        while i !=j:
            while nums[j] >= stdMark and j > i:
                j -=1
            while nums[i] <= stdMark and j > i:
                i +=1
            nums[i],nums[j] = nums[j],nums[i]            
        #基准归位
        nums[left],nums[i] = nums[i],nums[left]
        #基准左边进行排序
        self.quickSortDetail(nums,left,j-1)
        #基准右边进行排序
        self.quickSortDetail(nums,i+1,right)



if __name__=="__main__":
    sort = Sort()
    nums =[45,9,2,19,2,4,0,2,6,8,33]
    sort.quickSort(nums)
    print(nums)