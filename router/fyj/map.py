from flask import Blueprint
from flask import jsonify
from flask import request



import traceback

from torch import long
# appblueprint = Blueprint('_blueprint', __name__)
mapblueprint = Blueprint('fyjmap', __name__)

from Starter import db
#appblueprint注意改名xx..x(自定义)blueprint 不然大家都用appblueprint会造成重复导入

#数据库模型导入
from database.models import House

from .dict import to_dict,to_list

'''
input: {
    lat:
    long:
}
'''
@mapblueprint.route("/api/near", methods=["POST", 'GET'])
def mapnear():
    dic = {'sucess': 'yes'}
    def isin_distance(long1,long2,lat1,lat2,km):
        import math
        long1=(math.pi/180)*long1
        long2=(math.pi/180)*long2
        
        pass
    try:
        data=request.get_json()
        print("json,data",data)
        houses=db.session.query(House).all()
        houselist=to_list(houses)
        print("houselist",houselist)

        for house in houselist:
            h_long=house['h_longitude']
            h_lat=house['h_latitude']
        ret_house=[]
        db.session.commit()
        dic["house_lists"]=ret_house
        
    except Exception as e:
        traceback.print_exc()
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic