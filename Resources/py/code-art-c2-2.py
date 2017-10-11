'''
    假设两个字符串中所含有的字符和个数都相同我们就叫这两个字符串匹配，比如：abcda和adabc, 由于出现的字符个数都是相同，只是顺序不同，所以这两个字符串是匹配的。实现一个高效的匹配函数
    2017-10-11
'''

class Solution:
    def IsMatched(self,str1,str2):
        lenStr1 = len(str1)
        lenStr2 = len(str2)
        if lenStr1  != lenStr2:
            return False
        strDict ={}
        
        for v in str1:
            if not v in strDict:
                strDict[v] =0
            strDict[v] +=1

        for v in str2:
            if not v in strDict:
                return False
            strDict[v] -=1
            if strDict[v] < 0:
                return False
        return True

if __name__ == "__main__":
    solution = Solution()
    print(solution.IsMatched("abbac","babaa"))