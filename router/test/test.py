
from flask import Blueprint
from flask import jsonify
from flask import request



import traceback
# appblueprint = Blueprint('_blueprint', __name__)
testblueprint = Blueprint('llr', __name__)

from Starter import db
#appblueprint注意改名xx..x(自定义)blueprint 不然大家都用appblueprint会造成重复导入

#数据库模型导入
# from database.models import User

@testblueprint.route("/test")
def h1():
    print(db)
    print(45514)
    data=request.get_json()
    print(data)


# @appblueprint.route("/hellob/<name>")
# def hellob(name):
#     return "hellob! "+name

# @appblueprint.route("/hellojson/<string:name>")
# def hellojson(name):
#     test={"name":name}
#     return jsonify(test)

# @appblueprint.route("/api/test",methods=["POST"])
# def test():
#     try:
#         # json_= request.get_json()
            

#         return jsonify(
#             {
              
#             }
#         )
#     except Exception as e:
#         traceback.print_exc()
#         #返回错误信息
#         return jsonify(
#             {
#                 "state":"no",
#                 "info":str(e)
#             }
#         )
#     finally:
#         #关闭本次链接 释放
#         db.session.close()

# @appblueprint.route("/alljson")
# def sqlall():
#     all=db.session.query(User).all()
    
#     test={"result":[{
#            'username':i.username,
#     'employee_id' :i.employee_id,
#     'password':i.password 
        
#         }for i in all]}
#     return jsonify(test)

# @appblueprint.route("/alljsonwithparser")
# def sqlallparser():
#     all=db.session.query(User).all()
#     # for i in all:
#     #     print(":",i.__dict__) 

#     test={"result":[modelparser.SqlToDict(i).to_dict() for i in all]}
    
    

#     return jsonify(test)

# #/insert?key=lol&value=巴卜
# @appblueprint.route("/insert")
# def insert():
#     try:
    
#         key=request.args.get("key")
#         value=request.args.get("value")
#         db.session.add(User(key=key,value=value))
#         db.session.commit()
#         return jsonify(
#             {
#                 "result":"success"
#             }
#         )
#     except Exception as e:
#         print(e)
#         return jsonify(
#             {
#                 "result":str(e)
#             }
#         )


# @appblueprint.route("/replace/<string:key>/<string:newvalue>",methods=['GET'])
# def replace(key,newvalue):
#     try:
#         # db.session.
#         # db.session.query(Json).filter(Json.key==key).update({
#         #     Json.value:newvalue
#         # })
#         # db.session.commit()
#         return jsonify(
#             {
                
#             }
#         )
#     except Exception as e:
#         print(e)
#         return jsonify(
#             {
#                 "result":str(e)
#             }
#         )