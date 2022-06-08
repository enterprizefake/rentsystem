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

# 首页
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

        max_renttime = db.session.query(House).filter(
            House.h_id == data['h_id'])[0].max_renttime

        if(max_renttime is None or data['rent_time'] <= max_renttime):
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

        new_booking = Booking(
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


# 个人中心(租客)
# 查看所有租房订单
@llr.route("/tenants/orders", methods=["POST", 'GET'])
def tenants_orders():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        num = data['phone']
        orders = to_list(db.session.query(
            Order).filter(Order.phone == num).all())
        dic['orders'] = orders
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 订单续租


@llr.route("/tenants/orders/relet", methods=["POST", 'GET'])
def tenants_orders_relet():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        order_id = data["order_id"]

        h_id = db.session.query(Order).filter(
            Order.order_id == order_id)[0].h_id

        add_time = data['relet_time']
        has_time = db.session.query(Order).filter(
            Order.order_id == order_id)[0].relet_time
        max_relettime = db.session.query(House).filter(
            House.h_id == h_id)[0].max_relettime

        if(max_relettime is None or add_time+has_time <= max_relettime):
            db.session.query(Order).filter(Order.order_id == order_id)[
                0].relet_time += add_time
            db.session.commit()
        else:
            dic = {'sucess': 'no'}
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


# 查看所有收藏
@llr.route("/tenants/collections", methods=["POST", 'GET'])
def tenants_collections():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        num = data['phone']
        orders = to_list(db.session.query(Collection).filter(
            Collection.phone == num).all())
        dic['collections'] = orders
    except Exception as e:
        dic = {'sucess': 'no'}
    finally:
        db.session.close()
        return dic

# 个人中心(房东)

# 查看所有出租订单


@llr.route("/landlord/orders", methods=["POST", 'GET'])
def landlord_orders():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        num = data['phone']

        houses = db.session.query(House).filter(House.phone == num).all()
        orders = []
        for house in houses:
            h_id = house.h_id
            orders += to_list(db.session.query(Order).filter(Order.h_id == h_id).all())
        dic['orders'] = orders
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 查看所有出租旧房


@llr.route("/landlord/allold", methods=["POST", 'GET'])
def landlord_allold():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        num = data['phone']

        houses = to_list(db.session.query(
            House).filter(House.phone == num).all())
        dic['orders'] = houses
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 出租新房


@llr.route("/landlord/rentnew", methods=["POST", 'GET'])
def landlord_rentnew():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        new_house = House(
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


# 出租旧房信息修改(仅能修改未出租)
@llr.route("/landlord/rentold", methods=["POST", 'GET'])
def landlord_rentold():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        house = db.session.query(House).filter(House.h_id == data['h_id'])[0]
        if(house.h_state == '未出租'):
            house.address = data['address']
            house.h_detail = data['h_detail']
            house.h_latitude = data['h_latitude']
            house.h_longitude = data['h_longitude']
            house.h_name = data['h_name']
            house.max_relettime = data['max_relettime']
            house.max_renttime = data['max_renttime']
            house.price = data['price']

            db.session.commit()
        else:
            dic = {'sucess': 'no'}

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 出租旧房信息删除(仅能删除未出租)(数据库级联删除)


@llr.route("/landlord/deleteold", methods=["POST", 'GET'])
def landlord_deleteold():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        house = db.session.query(House).filter(House.h_id == data['h_id'])[0]
        if(house.h_state == '未出租'):
            db.session.delete(house)
            db.session.commit()
        else:
            dic = {'sucess': 'no'}

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 预约看房管理


@llr.route("/landlord/book", methods=["POST", 'GET'])
def landlord_book():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        num = data['phone']

        houses = db.session.query(House).filter(House.phone == num).all()

        dic['bookings'] = []
        for house in houses:
            house_bookings = to_list(db.session.query(
                Booking).filter(Booking.h_id == house.h_id).all())
            dic['bookings'] += house_bookings

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 管理员
# 我审核的


@llr.route("/root/audited", methods=["POST", 'GET'])
def root_audited():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        num=data['phone']
        audited=to_list(db.session.query(Audit).filter(Audit.phone==num).all())
        dic['audited']=audited

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


#下架已通过的审核


@llr.route("/root/delaudited", methods=["POST", 'GET'])
def root_delaudited():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        audit_id=data['audit_id']

        h_state=db.session.query(House).filter(House.audit_id==audit_id)[0].h_state

        if(h_state=='未出租'):
            audited=db.session.query(Audit).filter(Audit.audit_id==audit_id)[0]
            audited.audit_info=data['audit_info']
            audited.audit_state=data['audit_state']
            db.session.commit()
        else:
            dic = {'sucess': 'no'}
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

#所有未审核房源


@llr.route("/root/audits", methods=["POST", 'GET'])
def root_audits():
    dic = {'sucess': 'yes'}
    try:

        dic['audits']=[]

        houses=db.session.query(House).all()
        print(56)
        for house in houses:
            if(house.audit_id is None):
                dic['audits'].append(to_dict(house))       
            else:
                audit=db.session.query(Audit).filter(Audit.audit_id==house.audit_id)[0]

                if(audit.audit_state=='未审核'):
                    dic['audits'].append(to_dict(house))
        
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

#提交审核


@llr.route("/root/audit", methods=["POST", 'GET'])
def root_audit():
    dic = {'sucess': 'yes'}
    try:

        data=request.get_json()
        h_id=data['h_id']
        house=db.session.query(House).filter(House.h_id==h_id)[0]

        if(house.audit_id is None):
            new_audit=Audit(
            audit_info=data['audit_info'],
            audit_state=data["audit_state"]
            )
            db.session.add(new_audit)
            
            db.session.flush()

            house.audit_id=new_audit.audit_id

            db.session.commit()
        else:
            audit_id=house.audit_id
            audit=db.session.query(Audit).filter(Audit.audit_id==audit_id)[0]
            audit.phone=data['phone']
            audit.audit_state=data['audit_state']
            audit.audit_info=data['audit_info']
            db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

#获取所有消息通知


@llr.route("/messages", methods=["POST", 'GET'])
def messages():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)
        phone=data['phone']
        user_type=data['user_type']

        messages=db.session.query(Message).filter(Message.user_type==user_type).filter(Message.phone==phone).all()
        dic['messages']=to_list(messages)

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

#已读某个消息


@llr.route("/messages/read", methods=["POST", 'GET'])
def messages_read():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)
        message_id=data['message_id']
        message=db.session.query(Message).filter(Message.message_id==message_id)[0]
        message.isread=1

        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

#发送消息


@llr.route("/messages/send", methods=["POST", 'GET'])
def messages_send():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        print(data)

        new_message=Message(
            isread=0,
            content=data['content'],
            message_type=data['message_type'],
            phone=data['phone'],
            user_type=data['user_type']
        )

        db.session.add(new_message)
        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic