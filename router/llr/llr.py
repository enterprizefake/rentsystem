from flask import Blueprint
from flask import jsonify
from flask import request

import traceback

llr = Blueprint('llrblueprint', __name__)
#appblueprint注意改名xx..x(自定义)blueprint 不然大家都用appblueprint会造成重复导入


# 这句话必须在blueprint最后
from Starter import db
from database.models import *
from router.llr.dict import *


@llr.route("/login",methods=["POST",'GET'])
def login():
    try:
        all=db.session.query(User).all()

        data=request.get_json()


        new_user=User(user_nickname=data['user_nickname'],\
            user_name=data['user_name'],type=data['type'],\
            phone=data['phone'],avatar=data['avatar'])

        print(new_user)

        db.session.add(new_user)
        db.session.commit()

        # print(all)


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
