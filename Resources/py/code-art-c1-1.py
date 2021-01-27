'''    定义字符串的左旋转操作：把字符串前面的若干个字符移动到字符串的尾部。 如把字符串abcdef左旋转2位得到字符串cdefab。 请实现字符串左旋转的函数，要求对长度为n的字符串操作的时间复杂度为O(n)，空间复杂度为O(1)。    2017-10-10'''


class Solution:
    def leftShiftString(self,strs,shift):
        '''
            shift为移动的数量，正数：左移，负数：右移
        '''
        shift = shift % len(strs)
        strList = list(strs) 
        l1 = strList[0:shift][::-1]
        l2 = strList[shift:][::-1]
        l1.extend(l2)
        strs = ''.join(l1[::-1])
        return strs
    
    def leftShiftString2(self,strs,shift):
        '''
            shift为移动的数量，正数：左移，负数：右移
        '''
        shift = shift % len(strs)
        if shift < 0:
            shift = len(strs) - abs(shift)
        listStr = list(strs)
        self.reverse(listStr,0,shift)
        self.reverse(listStr,shift,len(listStr))
        self.reverse(listStr,0,len(listStr))
        return "".join(listStr)

    def leftShiftString3(self,strs,shift):
        lenStrs = len(strs)
        listStrs = list(strs)
        gcd = self.gcd(lenStrs,shift)
        eleSub= lenStrs / gcd
        for j in range(0,gcd):
            tmp = listStrs[j]
            for i in range(0,eleSub-1):
                listStrs[(j+i*shift) % lenStrs] = listStrs[(j+(i+1)*shift) % lenStrs]
            listStrs[(j+(eleSub * shift) % lenStrs)] = tmp
        return "".join()


    def reverse(self,listStr,start,over):
        begin = start
        end = over -1
        while begin < end:
            tmp = listStr[begin]
            listStr[begin] = listStr[end]
            listStr[end] = tmp
            begin +=1 
            end -=1

    def gcd(self,big,small):
        if big < small:
            big,small=small,big
        n = big % small
        if n == 0:
            return small
        return self.gcd(small,n)
        

if __name__ == "__main__":
    solution = Solution()
    strs="abcdefg"
    listStrs = list(strs)
    print(solution.leftShiftString2("abcdefg",-2))