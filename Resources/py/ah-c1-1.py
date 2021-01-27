'''
    小哼卖书
    2017-10-17
'''


class Student:

    def __init__(self,name,isbn):
        self.name = name
        self.book = isbn


class PurchaseBook:

    def buy(self,isbns):
        self.quickSort(isbns)
        tmp = ""
        uniqueIsbns=[]
        for i,v in enumerate(isbns):
            if tmp != v:
                uniqueIsbns.append(v)
            tmp=v
        return uniqueIsbns



    def quickSort(self,isbns):
        return self.quckSortDetail(isbns,0,len(isbns)-1)

    def quckSortDetail(self,nums,left,right):
        if left > right:
            return
        mark = nums[left]
        i,j = left,right
        while i!=j:
            while nums[j] >= mark and j > i:
                j-=1
            while nums[i] <= mark and j >i:
                i+=1
            nums[i],nums[j]=nums[j],nums[i]

        nums[left],nums[i] =nums[i],nums[left]

        self.quckSortDetail(nums,left,i-1)
        self.quckSortDetail(nums,i+1,right)




if __name__ == "__main__":
    pb = PurchaseBook()
    nums = [1,2,4,9,9,8,0,3,1,0,-1]
    nums= pb.buy(nums)
    print(nums)


