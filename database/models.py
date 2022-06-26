# coding: utf-8
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class Audit(db.Model):
    __tablename__ = 'audit'

    audit_id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.ForeignKey('user.phone'), index=True)
    audit_state = db.Column(db.String(50))
    audit_info = db.Column(db.Text)

    user = db.relationship('User', primaryjoin='Audit.phone == User.phone', backref='audits')



class Booking(db.Model):
    __tablename__ = 'booking'

    booking_id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.ForeignKey('user.phone'), index=True)
    h_id = db.Column(db.ForeignKey('house.h_id'), index=True)
    visit_time = db.Column(db.String(250))
    visit_number = db.Column(db.Integer)
    booking_state = db.Column(db.String(30))
    reply = db.Column(db.Text)

    h = db.relationship('House', primaryjoin='Booking.h_id == House.h_id', backref='bookings')
    user = db.relationship('User', primaryjoin='Booking.phone == User.phone', backref='bookings')



class Collection(db.Model):
    __tablename__ = 'collection'

    useless = db.Column(db.String(255))
    phone = db.Column(db.ForeignKey('user.phone'), primary_key=True, nullable=False)
    h_id = db.Column(db.ForeignKey('house.h_id', ondelete='CASCADE'), primary_key=True, nullable=False, index=True)

    h = db.relationship('House', primaryjoin='Collection.h_id == House.h_id', backref='collections')
    user = db.relationship('User', primaryjoin='Collection.phone == User.phone', backref='collections')



class House(db.Model):
    __tablename__ = 'house'

    h_id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.ForeignKey('user.phone'), index=True)
    audit_id = db.Column(db.ForeignKey('audit.audit_id'), index=True)
    h_name = db.Column(db.String(300))
    h_state = db.Column(db.String(20))
    price = db.Column(db.Integer)
    address = db.Column(db.String(300))
    h_longitude = db.Column(db.Float)
    h_latitude = db.Column(db.Float)
    max_renttime = db.Column(db.Integer)
    max_relettime = db.Column(db.Integer)
    h_detail = db.Column(db.Text)
    picture_number = db.Column(db.Integer, server_default=db.FetchedValue())

    audit = db.relationship('Audit', primaryjoin='House.audit_id == Audit.audit_id', backref='houses')
    user = db.relationship('User', primaryjoin='House.phone == User.phone', backref='houses')



class Message(db.Model):
    __tablename__ = 'message'

    message_id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.ForeignKey('user.phone'), index=True)
    user_type = db.Column(db.String(20))
    message_type = db.Column(db.String(100))
    isread = db.Column(db.Integer)
    content = db.Column(db.Text)
    send_time = db.Column(db.String(300))

    user = db.relationship('User', primaryjoin='Message.phone == User.phone', backref='messages')



class Order(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.ForeignKey('user.phone'), index=True)
    h_id = db.Column(db.ForeignKey('house.h_id'), index=True)
    begin_date = db.Column(db.String(500))
    end_date = db.Column(db.String(500))
    rent_time = db.Column(db.Integer)
    relet_time = db.Column(db.Integer)

    h = db.relationship('House', primaryjoin='Order.h_id == House.h_id', backref='orders')
    user = db.relationship('User', primaryjoin='Order.phone == User.phone', backref='orders')



class User(db.Model):
    __tablename__ = 'user'

    user_nickname = db.Column(db.String(50))
    user_name = db.Column(db.String(50))
    type = db.Column(db.String(50))
    phone = db.Column(db.String(40), primary_key=True)
    avatar = db.Column(db.String(200))
    u_longitude = db.Column(db.Float)
    u_latitude = db.Column(db.Float)
