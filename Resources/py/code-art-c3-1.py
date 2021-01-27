'''
题目描述:5.查找最小的 k 个元素
题目:输入 n 个整数,输出其中最小的 k 个。
例如输入 1,2,3,4,5,6,7 和 8 这 8 个数字,则最小的 4 个数字为 1,2,3 和 4。
    2017-10-12'''

class Solution:

    def findKsmallNums(self,nums,k):
        if k >= len(nums):
            return nums
        self.findDetail(nums,0,len(nums)-1,k)
        return nums[0:k]
    
    def findDetail(self,nums,left,right,k):
        if left >= right or left >= k-1:
            return None
        stdMark = nums[left]
        i,j=left,right
        while i!=j:
            while nums[j] >= stdMark and j > i:
                j -=1
            while nums[i] <= stdMark and j > i:
                i +=1
            nums[i],nums[j]=nums[j],nums[i]
        nums[left],nums[i]=nums[i],nums[left]
        self.findDetail(nums,i+1,right,k)
        self.findDetail(nums,left,i-1,k) 

if __name__ == "__main__":
    solution = Solution()
    nums = [3,4,10,8,0,-9,5,10,-3,4,2,5,8]
    kNums = solution.findKsmallNums(nums,5)
    print(kNums)