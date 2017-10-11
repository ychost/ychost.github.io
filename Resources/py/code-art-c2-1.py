'''假设这有一个各种字母组成的字符串，假设这还有另外一个字符串，而且这个字符串里的字母数相对少一些。从算法是讲，什么方法能最快的查出所有小字符串里的字母在大字符串里都有？
    2017-10-11
'''
import math

class Solution:

    def IsStrContains(self, bigStrs, smallStrs):
        strDict = {}
        ans = True
        for i, v in enumerate(bigStrs):
            strDict[v] = True
        for i, v in enumerate(smallStrs):
            if not v in strDict:
                ans = False
                break
        return ans

    def IsStrContains2(self,bigStrs,smallStrs):
        # 大小写字母一共52个
        primerList = self.GetPrimer(ord('z'))
        bigProd = 1
        for v in bigStrs:
            bigProd *= primerList[ord(v)-ord('A')]
        for v in smallStrs:
            if bigProd % primerList[ord(v)-ord('A')] != 0:
                return False
        return True
            

    def GetPrimer(self, count):
        if count <=0 :
            return []
        end = math.sqrt(count)
        primerList =[2]
        primerSize =1
        i = 3
        while primerSize != count:
            if self.IsPrimder(i):
                primerList.append(i)
                primerSize +=1
            i+=2
        return primerList
    
    def IsPrimder(self,num):
        end = int(math.sqrt(num)) +1
        for i in range(2,end):
            if num % i ==0:
                return False
        return True



if __name__ == "__main__":
    solution = Solution()
    print(solution.IsStrContains2("ABCdE", "ABC"))
    print(solution.GetPrimer(26))
