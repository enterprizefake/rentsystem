from flask import Blueprint
from flask import jsonify
from flask import request
import traceback
helloworldprint = Blueprint('_blueprint', __name__)
#appblueprint注意改名xx..x(自定义)blueprint 不然大家都用appblueprint会造成重复导入




# 这句话必须在blueprint最后
from Starter import db
from database.models import *



@helloworldprint.route("/api/helloworld",methods=["POST",'GET'])
def helloworld():
    try:
        # json_= request.get_json()
            

        return jsonify(
            {
              "info":'success',
              "iffff":'fail'
            }
        )
    except Exception as e:
        traceback.print_exc()
        #返回错误信息
        return jsonify(
            {
                "state":"no",
                "info":str(e)
            }
        )
    finally:
        #关闭本次链接 释放
        db.session.close()
