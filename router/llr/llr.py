import base64
import math
import re
import time
from pypinyin import lazy_pinyin


from router.llr.dict import *
from database.models import *
from Starter import db

from flask import Blueprint
from flask import jsonify
from flask import request

import traceback
import os
import shutil

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
        phone = data['phone']

        has_user = db.session.query(User).filter(User.phone == phone).all()
        if(has_user):
            dic['type'] = has_user[0].type
        else:
            new_user = User(user_nickname=data['nickName'],
                            user_name=data['user_name'],
                            type='小程序使用者',
                            phone=data['phone'],
                            avatar=data['avatarUrl'],
                            u_longitude=data['longitude'],
                            u_latitude=data['latitude']
                            )

            dic.update(to_dict(new_user))
            db.session.add(new_user)
            db.session.commit()
        print(dic)
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
        all_houses = db.session.query(House).filter(
            House.h_state == "未出租").all()
        # print(all_houses)

        houses = []
        for house in all_houses:
            if(house.audit_id):
                audit = db.session.query(Audit).filter(
                    Audit.audit_id == house.audit_id)[0]
                if(audit.audit_state == "已通过"):
                    houses.append(to_dict(house))

        try:
            data=request.get_json()
            longitude=data['longitude']
            latitude=data['latitude']


            for house in houses:
                print(longitude,latitude,house['h_longitude'],house['h_latitude'])
                house['distance']=distance(longitude,latitude,house['h_longitude'],house['h_latitude'])

                print("house"+str(house))

            houses.sort(key=lambda x:x['distance'])

            for house in houses:
                print(house)
                if(house['distance']<1):
                    house['distance']="{}米".format( round(house['distance']*1000,2) )
                else:
                    house['distance']="{}公里".format(round(house['distance'],2))

        except Exception as e:
            # traceback.print_exc()
            pass
        
        dic['house'] = houses
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
        data = request.get_json()
        house=to_dict(db.session.query(House).filter(House.h_id == data['h_id']).first())

        landlord_phone = house['phone']

        landlord = to_dict(db.session.query(
            User).filter(User.phone == landlord_phone)[0])


        house.update(landlord)
        dic['house']=house
        
        print(dic)

    except Exception as e:
        traceback.print_exc()
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

        if(max_renttime is None or int(data['rent_time']) <= max_renttime):
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
        traceback.print_exc()
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
        db.session.query(Collection).filter(
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
        # h_id=data['h_id']
        # print("h_id"+str(h_id))
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
        traceback.print_exc()
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

        for order in orders:
            house = to_dict(db.session.query(House).filter(
                House.h_id == order['h_id'])[0])
            
            # user为房东
            user = to_dict(db.session.query(User).filter(
                User.phone == house['phone'])[0])
            order.update(house)
            order.update(user)

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
        collections = to_list(db.session.query(Collection).filter(
            Collection.phone == num).all())

        for collection in collections:
            house = to_dict(db.session.query(House).filter(
                House.h_id == collection['h_id']).first())
            user = to_dict(db.session.query(User).filter(
                User.phone == house['phone'])[0])
            collection.update(house)
            collection.update(user)

        dic['collections'] = collections
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

        for order in orders:
            house = to_dict(db.session.query(House).filter(
                House.h_id == order['h_id'])[0])

            # user为租客


            user = to_dict(db.session.query(User).filter(
                User.phone == order['phone'])[0])
            order.update(house)
            order.update(user)

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

        for house in houses:
            audit = db.session.query(Audit).filter(
                Audit.audit_id == house['audit_id']).all()
            if(audit):
                d=to_dict(audit[0])
                d['audit_phone']=d['phone']
                del d['phone']
                house.update(d)
            else:
                house.update(
                    {
                        "audit_info": '',
                        "audit_state": "未审核",
                        "audit_phone":''
                    }
                )
        dic['oldhouses'] = houses
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
        print(data['square'])

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
            price=data['price'],
            square=data['square'],
            room=data['room'],
            haslift=data['haslift'],
            hasparking=data['hasparking'],
            haswc=data['haswc'],
            shared_housing=data['shared_housing'],
            public_time=data['public_time']
        )

        db.session.add(new_house)
        db.session.flush()

        h_id = new_house.h_id
        print(h_id)

        pictures = data['pictures']
        # print(pictures)
        # h_id=request.form.get("h_id")
        # team_images =request.form.get("images") #队base64进行解码还原。

        os.makedirs('static/image/{}'.format(h_id), exist_ok=True)  # 递归创建文件夹
        print(os.getcwd())
        i = 1
        while i <= len(pictures):
            # 存入图片，存入地址为服务器中的项目地址。
            with open("{}/static/image/{}/{}.jpg".format(os.getcwd(),h_id, i), "wb") as f:
                f.write(base64.b64decode(pictures[i-1]))
            i += 1

        house = db.session.query(House).filter(House.h_id == h_id)[0]
        house.picture_number = len(pictures)
        db.session.commit()
    except Exception as e:
        traceback.print_exc()
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
        # print(data)
        h_id = data['h_id']
        house = db.session.query(House).filter(House.h_id == h_id).first()
        picture_number=house.picture_number
        if(house.h_state == '未出租'):
                
            house.address = data['address']
            house.h_detail = data['h_detail']
            house.h_latitude = data['h_latitude']
            house.h_longitude = data['h_longitude']
            house.h_name = data['h_name']
            house.max_relettime = data['max_relettime']
            house.max_renttime = data['max_renttime']
            house.price = data['price']

            house.square=data['square']
            house.room=data['room']
            house.haslift=data['haslift']
            house.hasparking=data['hasparking']
            house.haswc=data['haswc']
            house.shared_housing=data['shared_housing']

            house.picture_number=len(data['pictures'])



            pictures = data['pictures']
            old=[]
            new=[]
            for picture in pictures:
                if(type(picture)==dict):
                    url=picture['url']

                    pattern=".*/(\d+).jpg"

                    result=re.match(pattern,url).group(1)

                    old.append(int(result))
                else:
                    new.append(picture)

            print(os.getcwd())
            print(picture_number)
            print(old)
            i=1
            while i<=picture_number:
                if(i not in old):
                    print(i)
                    os.remove("{}/static/image/{}/{}.jpg".format(os.getcwd(),h_id,i))
                i+=1

            i=1
            while i <=len(old):
                os.rename( "{}/static/image/{}/{}.jpg".format(os.getcwd(),h_id,old[i-1]),
                "{}/static/image/{}/{}.jpg".format(os.getcwd(),h_id,i)  )
                i+=1


            i = len(old)+1
            j=0
            while j < len(new):
                with open("{}/static/image/{}/{}.jpg".format(os.getcwd(),h_id, i+j), "wb") as f:
                    f.write(base64.b64decode(new[j]))
                j += 1


            audit_id = house.audit_id

            if(audit_id):
                audited = db.session.query(Audit).filter(Audit.audit_id == audit_id)
                house.audit_id=None
                audited.delete()


            collections=db.session.query(Collection).filter(Collection.h_id==data['h_id']).all()

            for collection in collections:
                phone=collection.phone
                new_message=Message(
                    phone=phone,
                    user_type='租客',
                    message_type='收藏失效通知',
                    isread=0,
                    content="您的收藏(房名:{})因发布者修改信息已失效".format(data['h_name']),
                    send_time=time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                )
                db.session.add(new_message)
                db.session.delete(collection)

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


            audit_id = house.audit_id

            if(audit_id):
                audited = db.session.query(Audit).filter(Audit.audit_id == audit_id)
                house.audit_id=None
                audited.delete()
            
            collections=db.session.query(Collection).filter(Collection.h_id==data['h_id']).all()

            for collection in collections:
                phone=collection.phone
                new_message=Message(
                    phone=phone,
                    user_type='租客',
                    message_type='收藏失效通知',
                    isread=0,
                    content="您的收藏(房名:{})因发布者删除已失效".format(house.h_name),
                    send_time=time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                )
                db.session.add(new_message)
                db.session.delete(collection)
            
            print(house)
            db.session.delete(house)
            db.session.commit()
        else:
            dic = {'sucess': 'no'}

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 查看所有预约看房


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

# 预约看房管理


@llr.route("/landlord/bookcheck", methods=["POST", 'GET'])
def landlord_bookcheck():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()

        book = db.session.query(Booking).filter(
            Booking.booking_id == data['booking_id'])[0]
        book.booking_state = data['booking_state']
        book.reply = data['reply']

        db.session.commit()
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

        num = data['phone']
        audited = to_list(db.session.query(
            Audit).filter(Audit.phone == num).all())

        print(audited)

        for a in audited:
            house = to_dict(db.session.query(House).filter(
                House.audit_id == a['audit_id'])[0])
            a.update(house)
            # print(a)

        print(audited)
        dic['audited'] = audited
        print(dic)

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


# 下架已通过的审核或删除审核(废弃)


@llr.route("/root/delaudited", methods=["POST", 'GET'])
def root_delaudited():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        audit_id = data['audit_id']

        h_state = db.session.query(House).filter(
            House.audit_id == audit_id)[0].h_state

        if(h_state == '未出租'):
            if(data['audit_state'] == "未审核"):
                audited = db.session.query(Audit).filter(
                    Audit.audit_id == audit_id)
                house = db.session.query(House).filter(House.audit_id==audit_id)[0]
                house.audit_id=None
                audited.delete()
            else:
                audited = db.session.query(Audit).filter(
                    Audit.audit_id == audit_id)[0]
                audited.audit_info = data['audit_info']
                audited.audit_state = data['audit_state']
            db.session.commit()
        else:
            dic = {'sucess': 'no'}
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 所有未审核房源


@llr.route("/root/audits", methods=["POST", 'GET'])
def root_audits():
    dic = {'sucess': 'yes'}
    try:

        dic['audits'] = []

        houses = db.session.query(House).all()
        for house in houses:
            if(house.audit_id is None):
                dic['audits'].append(to_dict(house))
            else:
                audit = db.session.query(Audit).filter(
                    Audit.audit_id == house.audit_id)[0]

                if(audit.audit_state == '未审核'):
                    dic['audits'].append(to_dict(house))

    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 提交审核


@llr.route("/root/audit", methods=["POST", 'GET'])
def root_audit():
    dic = {'sucess': 'yes'}
    try:

        data = request.get_json()
        h_id = data['h_id']
        house = db.session.query(House).filter(House.h_id == h_id)[0]

        if(house.audit_id is None):
            new_audit = Audit(
                audit_info=data['audit_info'],
                audit_state=data["audit_state"],
                phone=data['phone']
            )
            db.session.add(new_audit)

            db.session.flush()

            house.audit_id = new_audit.audit_id

            db.session.commit()
        else:
            audit_id = house.audit_id
            audit = db.session.query(Audit).filter(
                Audit.audit_id == audit_id)[0]
            audit.phone = data['phone']
            audit.audit_state = data['audit_state']
            audit.audit_info = data['audit_info']
            db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 获取所有未读消息数量(租客+房东)


@llr.route("/messages/unread", methods=["POST", 'GET'])
def messages_unread():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        phone = data['phone']

        tenent_messages = db.session.query(Message).filter(Message.phone == phone,Message.user_type=="租客",Message.isread ==0).all()
        dic['tenent_messages'] = len(tenent_messages)

        landlord_messages = db.session.query(Message).filter(Message.phone == phone,Message.user_type=="房东",Message.isread ==0).all()
        dic['landlord_messages'] = len(landlord_messages)

        print(dic)
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 获取所有消息通知并已读

@llr.route("/messages", methods=["POST", 'GET'])
def messages():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)
        phone = data['phone']
        user_type = data['user_type']

        messages = db.session.query(Message).filter(
            Message.user_type == user_type).filter(Message.phone == phone).all()

        for message in messages:
            message.isread=1       
        dic['messages'] = to_list(messages)
        dic['messages'].reverse()

        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


# # 已读某个消息(废弃)


# @llr.route("/messages/read", methods=["POST", 'GET'])
# def messages_read():
#     dic = {'sucess': 'yes'}
#     try:
#         data = request.get_json()
#         print(data)
#         message_id = data['message_id']
#         message = db.session.query(Message).filter(
#             Message.message_id == message_id)[0]
#         message.isread = 1

#         db.session.commit()
#     except Exception as e:
#         dic = {'sucess': 'no'}

#     finally:
#         db.session.close()
#         return dic

# 发送消息


@llr.route("/messages/send", methods=["POST", 'GET'])
def messages_send():
    dic = {'sucess': 'yes'}
    try:
        data = request.get_json()
        print(data)

        new_message = Message(
            isread=0,
            content=data['content'],
            message_type=data['message_type'],
            phone=data['phone'],
            user_type=data['user_type'],
            send_time=data['send_time']
        )

        db.session.add(new_message)
        db.session.commit()
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


# 获取所有用户及索引

@llr.route("/root/allusers", methods=["POST", 'GET'])
def root_allusers():
    dic = {'sucess': 'yes'}
    try:
        data=request.get_json()
        phone=data['phone']
        me=db.session.query(User).filter(User.phone==phone).first()

        allusers=db.session.query(User)

        developers=allusers.filter(User.type=="小程序开发者").all()

        roots=allusers.filter(User.type=="小程序管理员").all()
        
        users=allusers.filter(User.type=="小程序使用者").all()
        
        
        if (me in developers):    
            developers=db.session.query(User).filter(User.type=="小程序开发者").filter(User.phone != phone).all()
        elif(me in roots): 
            roots=db.session.query(User).filter(User.type=="小程序管理员").filter(User.phone != phone).all()
        else:
            users=db.session.query(User).filter(User.type=="小程序使用者").filter(User.phone != phone).all()
            
        
        developers=to_list(developers)
        roots=to_list(roots)
        users=to_list(users)


        dic['roots']=roots

        # 对小程序使用者进行字母排序
        index=['A', 'B', 'C', 'D', 'E', 'F', 'G',
         'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
         'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','#']
        user_list={ key:[] for key in index }

        users.sort(key=lambda item: lazy_pinyin(item['user_nickname'])[0][0].upper())
        for user in users:
            first=lazy_pinyin(user['user_nickname'])[0][0].upper()
            if first in index:
                user_list[first].append(user)
            else:
                user_list['#'].append(user)

        

        dic['me']=to_dict(me)
        dic['roots']=roots
        dic['developers']=developers
        dic['user_list']=user_list
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic


# 修改用户权限

@llr.route("/root/alterroots", methods=["POST", 'GET'])
def root_alterroots():
    dic = {'sucess': 'yes'}
    try:     
        data=request.get_json()
        myphone=data['myphone']

        developers=data['developers']

        roots=data['roots']

        developers_phones=[developer['phone'] for developer in developers]

        roots_phones=[root['phone'] for root in roots]

        allusers=db.session.query(User).all()

        for user in allusers:
            if(user.phone in roots_phones):
                user.type=['小程序管理员']
            elif(user.phone in developers_phones):
                user.type='小程序开发者'
            elif(user.phone==myphone):
                pass
            else:
                user.type="小程序使用者"
        db.session.commit()
        
    except Exception as e:
        dic = {'sucess': 'no'}

    finally:
        db.session.close()
        return dic

# 计算距离优先
def distance(jingduA, weiduA,jingduB, weiduB):

    R = 6371.393
    Pi = math.pi

    a = (math.sin(math.radians(weiduA/2-weiduB/2)))**2
    b = math.cos(weiduA*Pi/180) * math.cos(weiduB*Pi/180) * (math.sin((jingduA/2-jingduB/2)*Pi/180))**2

    L = 2 * R * math.asin((a+b)**0.5)

    # 单位是千米

    return L

