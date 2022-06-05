/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/6/5 12:07:07                            */
/*==============================================================*/


drop table if exists booking;

drop table if exists "check";

drop table if exists collection;

drop table if exists h_picture;

drop table if exists house;

drop table if exists message;

drop table if exists "order";

drop table if exists uesr;

/*==============================================================*/
/* Table: booking                                               */
/*==============================================================*/
create table booking
(
   booking_id           int not null auto_increment,
   tenants_phone        int,
   h_id                 int,
   visit_time           varchar(250),
   visit_number         int,
   booking_state        varchar(30),
   reply                text,
   primary key (booking_id)
);

/*==============================================================*/
/* Table: "check"                                               */
/*==============================================================*/
create table "check"
(
   check_id             int not null auto_increment,
   check_phone          int,
   check_state          varchar(50),
   check_info           text,
   primary key (check_id)
);

/*==============================================================*/
/* Table: collection                                            */
/*==============================================================*/
create table collection
(
   collection_id        int not null auto_increment,
   tenants_phone        int,
   h_id                 int,
   primary key (collection_id)
);

/*==============================================================*/
/* Table: h_picture                                             */
/*==============================================================*/
create table h_picture
(
   picture_id           int not null auto_increment,
   h_id                 int,
   picture_address      varchar(800),
   primary key (picture_id)
);

/*==============================================================*/
/* Table: house                                                 */
/*==============================================================*/
create table house
(
   h_id                 int not null auto_increment,
   landlord_phone       int,
   check_id             int,
   h_name               varchar(300),
   h_state              varchar(20),
   price                int,
   address              varchar(300),
   h_longitude          float,
   h_latitude           float,
   max_renttime         int,
   max_relettime        int,
   primary key (h_id)
);

/*==============================================================*/
/* Table: message                                               */
/*==============================================================*/
create table message
(
   message_id           int not null auto_increment,
   phone                int,
   user_type            varchar(20),
   message_type         varchar(100),
   isread               int,
   content              text,
   primary key (message_id)
);

/*==============================================================*/
/* Table: "order"                                               */
/*==============================================================*/
create table "order"
(
   order_id             int not null auto_increment,
   tenants_phone        int,
   h_id                 int,
   begin_date           varchar(500),
   end_date             varchar(500),
   rent_time            int,
   relet_time           int,
   primary key (order_id)
);

/*==============================================================*/
/* Table: uesr                                                  */
/*==============================================================*/
create table uesr
(
   user_nickname        varchar(50),
   user_name            varchar(50),
   type                 varchar(50),
   phone                int not null,
   avatar               varchar(200),
   u_longitude          float,
   u_latitude           float,
   primary key (phone)
);

alter table booking add constraint FK_4 foreign key (tenants_phone)
      references uesr (phone) on delete restrict on update restrict;

alter table booking add constraint FK_7 foreign key (h_id)
      references house (h_id) on delete restrict on update restrict;

alter table "check" add constraint FK_10 foreign key (check_phone)
      references uesr (phone) on delete restrict on update restrict;

alter table collection add constraint FK_2 foreign key (tenants_phone)
      references uesr (phone) on delete restrict on update restrict;

alter table collection add constraint FK_5 foreign key (h_id)
      references house (h_id) on delete restrict on update restrict;

alter table h_picture add constraint FK_8 foreign key (h_id)
      references house (h_id) on delete restrict on update restrict;

alter table house add constraint FK_1 foreign key (landlord_phone)
      references uesr (phone) on delete restrict on update restrict;

alter table house add constraint FK_11 foreign key (check_id)
      references "check" (check_id) on delete restrict on update restrict;

alter table message add constraint FK_9 foreign key (phone)
      references uesr (phone) on delete restrict on update restrict;

alter table "order" add constraint FK_3 foreign key (tenants_phone)
      references uesr (phone) on delete restrict on update restrict;

alter table "order" add constraint FK_6 foreign key (h_id)
      references house (h_id) on delete restrict on update restrict;

