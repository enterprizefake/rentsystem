from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import *
import traceback
import logging
from ServerConfig import databaseconfig
from sys import platform


app =Flask(__name__)
CORS(app,supports_credentials=True,max_age=36000,resources={r"*": {"origins": "*"}})



#配置sql地址

if platform=="linux":
    SQLALCHEMY_DATABASE_URI = f'''mysql+pymysql://{databaseconfig["user_password"]}@{databaseconfig["ip_port"]}/{databaseconfig["databasename"]}'''
else:
    SQLALCHEMY_DATABASE_URI = f'''mysql://{databaseconfig["user_password"]}@{databaseconfig["ip_port"]}/{databaseconfig["databasename"]}'''
# SQLALCHEMY_DATABASE_URI = '''mysql://enteam:123456@1.15.184.52:3306/flasktest'''
# MONGODB_URI="mongodb://superuser:superadmin@1.15.184.52:27017/test?authSource=admin"


app.config['SQLALCHEMY_DATABASE_URI']=SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_ENGINE_OPTIONS']={
    'pool_size' : 10,
    'pool_recycle':120,
    'pool_pre_ping': True
}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config["MONGO_URI"] = MONGODB_URI
app.config["SECRET_KEY"] = "sdfsdfssefe"
app.config["JSON_AS_ASCII"] = False

db=SQLAlchemy(app)





# 自动导入blueprint 
from Blueprintautoimport import getImportdict
import_lists= getImportdict()
for _combine in import_lists:
    print("execute importing .... on",_combine)
    exec(f"from {_combine[0]} import {_combine[1]}")
    exec(f"app.register_blueprint({_combine[1]})")
    pass 




#手动导入blueprint

print("check reloading")
from router.test.test import testblueprint
# from template.template import appblueprint
# from router.file_module.file import fileblueprint
# from router.director.alldirector import alldirectorblueprint
# from router.front.allfront import allfrontprint
# from router.monitor.monitor import monitorblueprint 
# from router.all.all import allblueprint
# from router.llr.llr import llr
# from router.boss.boss import bossblueprint
# from router.file_module.fileview import fileviewblueprint
# from router.form.form import formblueprint

#--------------------------------------------


#加载blueprint


# app.register_blueprint(test)
# app.register_blueprint(appblueprint)
# app.register_blueprint(fileblueprint)
# # app.register_blueprint(alldirectorblueprint,url_prefix="/director")
# # app.register_blueprint(allfrontprint,url_prefix="/front")
# app.register_blueprint(monitorblueprint,url_prefix="/moniterapi")
# app.register_blueprint(alldirectorblueprint,url_prefix="/all")
# app.register_blueprint(allfrontprint,url_prefix="/all")
# app.register_blueprint(monitorblueprint,url_prefix="/moniterapi")
# app.register_blueprint(allblueprint,url_prefix="/all")
# app.register_blueprint(bossblueprint,url_prefix="/boss")
# app.register_blueprint(fileviewblueprint,url_prefix="/fileview")
# app.register_blueprint(formblueprint,url_prefix="/form")


#___________________________________________

#导入socket
# from flask_socketio import Namespace
# from router.monitor.monitor import MonitorSocket
from flask_socketio import SocketIO
# from socketio import AsyncServer
# from aiohttp import web
socketio = SocketIO(app,ping_interval=25,cors_allowed_origins="*")
# socketio.on_namespace(MonitorSocket("/monsocket"))



#_______________________________________________



if __name__=="__main__":
    try:
        
        if platform=="linux":
            socketio.run(app,debug=True,port=8086,use_reloader=True,host="0.0.0.0")
        else:
            socketio.run(app,debug=True,port=8086,use_reloader=True);
        # app.run(debug=True,port=8086,use_reloader=True)
    except Exception :
        traceback.print_exc()
    finally:
        db.session.close_all()
        # db.session.close_all_sessions()