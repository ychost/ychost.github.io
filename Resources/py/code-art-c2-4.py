'''
    字符串转整形
    2017-10-11
'''


class Solution:

    def StrToInt(self, strVal):
        intVal = 0
        symbol = 1
        lenStr = len(strVal)
        for i, v in enumerate(strVal):
            ordV = ord(v)
            if i != 0 and (ordV < ord('0') or ordV > ord('9')):
                raise "字符串中含有非整形"
            if i == 0:
                if ordV == ord('+'):
                    symbol = 1
                elif ordV == ord('-'):
                    symbol = -1
                else:
                    intVal = intVal *10 + ordV - ord('0')
            if i != 0:
                intVal = intVal*10 + ordV -ord('0')
        if symbol == -1:
            intVal = -intVal

        return int(intVal)

        


if __name__ == "__main__":
    solution = Solution()
    print(solution.StrToInt("+12355598"))