import yaml
from sys import platform
# config 
scan_root="./router"


import os

def findAllFile(base):
    for root, ds, fs in os.walk(base):
        for f in fs:
            if f.endswith('.yml'):
                fullname = os.path.join(root, f)
                yield fullname

def getImportdict():
    data_=[]
    for filepath in findAllFile(scan_root):
        with open(filepath,encoding='utf-8') as file_:
            dic_= yaml.safe_load(file_)
            
            print(str(filepath))
            import_lang= '.'.join(str(filepath).replace("./","").split('\\')[0:-1]);
            for key,value in dic_["blueprints"].items():
                if platform == "linux":
                    print("debugimportlang:",import_lang)
                data_.append([ import_lang+"."+key,value])        
    return data_
    pass
