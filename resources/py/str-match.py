class Solution:
    def match(self, pattern, strs):
        words = strs.split()
        patterns = list(pattern)
        patternList = self.getPattern(patterns)
        wordList = self.getPattern(words)
        return patternList == wordList

    def getPattern(self, strList):
        index = 1
        tmpDict = {}
        ptnList = []
        for i, v in enumerate(strList):
            if not v in tmpDict:
                tmpDict[v] = index
                index += 1
            ptnList.append(tmpDict[v])
        return ptnList


if __name__ == "__main__":
    solution = Solution()
    print(solution.match("1212c", "hello    world hello world ychost"))
