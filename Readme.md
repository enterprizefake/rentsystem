# ⚠️WARNING⚠️   
# ⚠️不读文档会发生意想不到的后果⚠️  
### 文档更新日志
- 2022529 更新自动导入blueprint 需要yml支持 所以请使用 installpacks.bat 对依赖进行更新
- 2022601 **后端共用一个分支**


### 下列操作以本项目的根目录为相对路径
## 安装依赖包
pip install -r requirements.txt  
或者运行 installpacks.bat
## 配置git文件(如果你有更好的git方案可以忽视)
首先删除./git文件夹


详见gitutils.py文件  
配置完成后   
首先运行 rungitinit.bat  
成功每次上传时就可以运行 rungitpush.bat  
## 数据库生成
运行codegen.bat完成数据库schema models的更新
## 添加自己的文件夹和文件项目
请参考router.test.test
即 router/你的项目文件/xxxx.py 这样组织文件  
再创建 router/你的项目文件/config.yml 请参考 router.test.test config的yml设置自动导入blueprint  

## 后端共用一个分支 back_end
共用一个分支后   
为了不污染文件结构 请严格按照 **添加自己的文件夹和文件项目**所规定的组织方式进行规范   
其次每次修改文件后 请记得 **commit** 或者本地提供的 **rungitpush.bat**(你不这么做的话下次的pull直接把你没commit的扬了)   
每次开始写项目时 请记得运行**update.bat** 或者从git端进行pull(你不这么做的话下次的push可能直接把你没commit的扬了)   