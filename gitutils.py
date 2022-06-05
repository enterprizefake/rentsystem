import sys,os
from datetime import datetime
#config begin
#分支名字 大家共用此分支
branch_name="back_end"
#git项目地址
origin_address="git@github.com:enterprizefake/rentsystem.git"
#上传者名字 任意
user_name="liuzhiyuan"
#config end

def initgit():
    os.system(f"git init")
    os.system(f"git remote add origin {origin_address}")
    os.system(f"git remote set-url {origin_address}")

def commit():
    time_=datetime.now().strftime("%Y:%m:%d:%H:%M");
    os.system(f"git add ./")
    os.system(f"git commit -m {user_name}_{time_}")
    os.system(f"git branch -M {branch_name}")
    os.system(f"git push -u  origin {branch_name}")
    #git push -u -f origin {branch_name}
def pull():
    os.system(f"git pull origin {branch_name}")

# 命令使用 : python gitutils.py [命令]

# 命令 :
# init 初始化此目录的git
# push 上传目录文件
if __name__ =="__main__":
    print("cmd :",sys.argv)
    type_=sys.argv[1]
    
    if type_=="init":
        initgit()
    elif type_=="push" :
        commit()
    elif type_=="pull" :
        pull()
    
    