# import time
from pypinyin import lazy_pinyin

# print(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))

ls=['a120','A56','啊','b','C','的','E','51','58']

index=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

index.sort(key=lambda char: lazy_pinyin(char)[0][0].upper())

index=[i.upper() for i in index]
# print([lazy_pinyin(char) for char in ls])

print(index)