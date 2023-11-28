import random
part2 = "L1F3"
part5 = "1S"
part7 = "3V3R"
part9 = "34S13ST"
part10 = "duCTF{TH3"
part11 = "Y0UR"
part12 = "W1LL"
part18 = "CH4LL3NG3"
part19 = "4ND"
part20 = "R3V3RS1NG"
part38 = "1S"
part41 = "H3R3"
part68 = "1T"
part73 = "4W3S0M3}"
part76 = "1N"
part77 = "S0LV3"
part92 = "Y0U"

data = {
    "part2" : "L1F3",
    "part5" : "1S",
    "part7" : "3V3R",
    "part9" : "34S13ST",
    "part10" : "duCTF{TH3",
    "part11" : "Y0UR",
    "part12" : "W1LL",
    "part18" : "CH4LL3NG3",
    "part19" : "4ND",
    "part20" : "R3V3RS1NG",
    "part38" : "1S",
    "part41" : "H3R3",
    "part68" : "1T",
    "part73" : "4W3S0M3}",
    "part76" : "1N",
    "part77" : "S0LV3",
    "part92" : "Y0U",
}


order = [10, 9, 20, 18, 92, 12, 7, 77, 76, 11, 2, 5, 41, 19, 68, 38, 73]

anotherList = [10, 9, 20, 18, 92, 12, 7, 77, 76, 11, 2, 5, 41, 19, 68, 38, 73]

finalAns = ["_","_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]

# while anotherList is not empty
myset = set()
while len(anotherList) != 0:
    
    print("Input a number between 1 to 10000")
    
    # take the index of the element to be printed
    
    index = input()
    # take a random number between 0 to length of anotherList
    num = random.randint(0, 2000)
    while num in myset:
        num = random.randint(0, 2000)
    myset.add(num)
    # take the element at that index
    print(num)
    if num in anotherList:
        # check the index of num in the list
        index = order.index(num)
        temp = ""
        if index == 0:
            temp = "1st"
        elif index == 1:
            temp = "2nd"
        elif index == 2:
            temp = "3rd"
        else:
            temp = str(index+1) + "th"
        
        print("You are right ")
        print("part" + str(num) + " is the " + temp + " part of your final String")
        finalAns[index] = data["part" + str(num)]
        print(finalAns)
        # remove the element from the list
        anotherList.remove(num)
    else:
        print("You are wrong")
        print("Give another input")

# print the final string
print("The final string is ")
print('_'.join(finalAns))

