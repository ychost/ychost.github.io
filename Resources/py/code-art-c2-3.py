'''
给定一个字符串 A,要求在 A 中查找一个子串 B。
如 A="ABCDF",要你在 A 中查找子串 B=“CD”。
    2017-10-11
'''

class Solution:

    def StrStr(self,str1,str2):
        len1=len(str1)
        len2=len(str2)
        if len1 < len2:
            return -1
        j =0
        for i,v in enumerate(str1):
            if v == str2[j]:
                j +=1
                if j == len2:
                    return i - len2 +1
            else:
                if len1 - i -i < len2:
                    return -1
                j = 0

        return -1
    
    def findFirstUniq(self,str):
        '''
            查找字符串中第一个只出现一次的字符
        '''
        strDict ={}
        for v in str:
            if not v in strDict:
                strDict[v] =0
            strDict[v] +=1
        
        for k,v in strDict.items():
            if v == 1:
                return v
        return None





if __name__ == "__main__":
    solution = Solution()
    # print(solution.StrStr("ABCDEF","CD"))
    print(solution.findFirstUniq("abaccdeff"))
