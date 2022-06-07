from router.llr.dict import *
from database.models import *
from Starter import db
from flask import Blueprint
from flask import jsonify
from flask import request

import traceback

llr = Blueprint('llrblueprint', __name__)
# appblueprint注意改名xx..x(自定义)blueprint 不然大家都用appblueprint会造成重复导入


# 这句话必须在blueprint最后

@llr.route("/login", methods=["POST", 'GET'])
def login():
    dic = {'sucess': 'yes'}
    try:
        # all = db.session.query(User).all()

        data = request.get_json()
        print(data)

        new_user = User(user_nickname=data['user_nickname'],
                        user_name=data['user_name'], type='小程序使用者',
                        phone=data['phone'], avatar=data['avatar'])

        dic.update(to_dict(new_user))
        db.session.add(new_user)
        db.session.commit()

    except Exception as e:
        # traceback.print_exc()
        # 返回错误信息
        dic = {'sucess': 'no'}
    finally:
        # 关闭本次链接 释放
        db.session.close()
        return dic

# 读取所有表进行post文档开发


@llr.route("/test", methods=["POST", 'GET'])
def g():
    dic = {'sucess': 'yes'}
    try:
        type = request.get_json()['type']
        # user
        if(type == 'user'):
            all = db.session.query(User).all()
        elif(type == "audit"):
            all = db.session.query(Audit).all()
        elif(type == "booking"):
            all = db.session.query(Booking).all()
        elif(type == "collection"):
            all = db.session.query(Collection).all()
        elif(type == "h_picture"):
            all = db.session.query(HPicture).all()
        elif(type == "house"):
            all = db.session.query(House).all()
        elif(type == "message"):
            all = db.session.query(Message).all()
        elif(type == "orders"):
            all = db.session.query(Order).all()
        else:
            all = None
        first_line = all[0]

        dic.update(to_dict(first_line))

    except Exception as e:
        # traceback.print_exc()
        # 返回错误信息
        dic = {'sucess': 'no'}
    finally:
        # 关闭本次链接 释放
        db.session.close()
        return dic

###首页
# 首页房屋展示


@llr.route("/index", methods=["POST", 'GET'])
def index():
    dic = {'sucess': 'yes'}
    try:
        all_houses = db.session.query(House).all()
        all_pictures = db.session.query(HPicture).all()
        houses = to_list(all_houses)
        pictures = to_list(all_pictures)
        for i in houses:
            i['index_picture'] = None
            for j in pictures:
                if(i['h_id'] == j['h_id']):
                    i['index_picture'] = j['picture_address']
                    break

        dic['house'] = houses
        # dic['house']=to_list(allhouse)
    except Exception as e:
        # traceback.print_exc()
        # 返回错误信息
        dic = {'sucess': 'no'}
    finally:
        # 关闭本次链接 释放
        db.session.close()
        return dic

# 详情页面展示


@llr.route("/index/detail", methods=["POST", 'GET'])
def index_detail():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()['h_id']
        landlord_phone = db.session.query(
            House).filter(House.h_id == data)[0].phone
        print(data)

        allpictures = db.session.query(HPicture)\
            .filter(HPicture.h_id == data).all()

        dic['pictures'] = to_list(allpictures)
        dic['landlord'] = to_dict(db.session.query(
            User).filter(User.phone == landlord_phone)[0])

    except Exception as e:
        # traceback.print_exc()
        # 返回错误信息
        dic = {'sucess': 'no'}
    finally:
        db.session.close()
        return dic

# 完成支付,生成订单


@llr.route("/index/detail/pay", methods=["POST", 'GET'])
def index_detail_pay():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        max_renttime=db.session.query(House).filter(House.h_id==data['h_id'])[0].max_renttime

        if(max_renttime is None or data['rent_time']<=max_renttime):
            new_order = Order(
                phone=data['phone'],
                h_id=data['h_id'],
                begin_date=data['begin_date'],
                end_date=data['end_date'],
                rent_time=data['rent_time'],
                relet_time=0,
                )

            db.session.add(new_order)

            db.session.query(House).filter(
                House.h_id == data['h_id'])[0].h_state = '已出租'

            db.session.commit()
        else:
            dic = {'sucess': 'no'}

    except Exception as e:
        # traceback.print_exc()
        # 返回错误信息
        dic = {'sucess': 'no'}
    finally:
        db.session.close()
        return dic

# 收藏


@llr.route("/index/detail/collection", methods=["POST", 'GET'])
def index_detail_collection():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        id = data['h_id']
        num = data['phone']

        new_collection = Collection(phone=num, h_id=id)
        db.session.add(new_collection)
        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 取消收藏


@llr.route("/index/detail/cancelcollection", methods=["POST", 'GET'])
def index_detail_cancelcollection():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        id = data['h_id']
        num = data['phone']
        r = db.session.query(Collection).filter(
            Collection.h_id == id, Collection.phone == num).delete()
        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 看房预约申请


@llr.route("/index/detail/book", methods=["POST", 'GET'])
def index_detail_book():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        new_booking=Booking(
        h_id=data['h_id'],
        phone=data['phone'],
        visit_time=data['visit_time'],
        visit_number=data['visit_number'],
        booking_state="预约已提交"
        )
        db.session.add(new_booking)
        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


###个人中心(租客)
#查看所有租房订单
@llr.route("/tenants/orders", methods=["POST", 'GET'])
def tenants_orders():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)
        num=data['phone']
        orders=to_list(db.session.query(Order).filter(Order.phone==num).all())
        dic['orders']=orders
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic
    
#订单续租
@llr.route("/tenants/orders/relet", methods=["POST", 'GET'])
def tenants_orders_relet():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()

        order_id=data["order_id"]


        h_id=db.session.query(Order).filter(Order.order_id==order_id)[0].h_id

        add_time=data['relet_time']
        has_time=db.session.query(Order).filter(Order.order_id==order_id)[0].relet_time
        max_relettime=db.session.query(House).filter(House.h_id==h_id)[0].max_relettime
        

        if(max_relettime is not None and add_time+has_time<=max_relettime):
            db.session.query(Order).filter(Order.order_id==order_id)[0].relet_time+=add_time
            db.session.commit()
        else:
            dic = {'sucess': 'no'}
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


#查看所有收藏
@llr.route("/tenants/collections", methods=["POST", 'GET'])
def tenants_collections():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)
        num=data['phone']
        orders=to_list(db.session.query(Collection).filter(Collection.phone==num).all())
        dic['collections']=orders
    except Exception as e:
        dic = {'sucess': 'no'}
    finally:
        db.session.close()
        return dic

###个人中心(房东)

#查看所有出租订单
@llr.route("/landlord/orders", methods=["POST", 'GET'])
def landlord_orders():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)
        num=data['phone']

        houses=db.session.query(House).filter(House.phone==num).all()
        orders=[]
        for house in houses:
            h_id=house.h_id
            orders+=to_list(db.session.query(Order).filter(Order.h_id==h_id).all())
        dic['orders']=orders
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic
    
#出租新房
@llr.route("/landlord/rentnew", methods=["POST", 'GET'])
def landlord_rentnew():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)
        
        new_house=House(
            address=data['address'],
            h_detail=data['h_detail'],
            h_latitude=data['h_latitude'],
            h_longitude=data['h_longitude'],
            h_name=data['h_name'],
            h_state='未出租',
            max_relettime=data['max_relettime'],
            max_renttime=data['max_renttime'],
            phone=data['phone'],
            price=data['price']
        )

        db.session.add(new_house)
        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


#出租旧房信息修改
@llr.route("/landlord/rentold", methods=["POST", 'GET'])
def landlord_rentold():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)
        
        num=data['phone']
        houses=db.session.query(House).filter(House.phone==num).all()
        

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic