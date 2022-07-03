import { formatTime } from "../../../../utils/util";

// pages/me/delrent/rentdetail/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    touxiang: "https://manager.diandianxc.com/diandianxc/mrtx.png",
    icon_r: "https://manager.diandianxc.com/mine/enter.png",
    rentde: null,
    active: 0,
    h_id: null,
    phone: null,
    new_address: null,
    new_detail: null,
    new_latitude: null,
    new_longitude: null,
    new_name: null,
    new_price: null,
    max_relettime: null,
    max_renttime: null,
    show: false,
    new_square: null,
    new_hasparking: null,
    new_haslift: null,
    new_haswc: null,
    new_shared_housing: null,
    new_room: null,
    room_options: [
      {
        values: ["一室", "两室", "三室", "四室", "五室"],
      },
      {
        values: ["一厅", "两厅", "三厅"],
      },
    ],
    new_picture: [],
  },
  map() {
    console.log(this.data.new_longitude);
    wx.chooseLocation({
      longitude: this.data.new_longitude,
      latitude: this.data.new_latitude,
      success: (res) => {
        this.setData({
          new_address: res.address,
          new_longitude: res.longitude,
          new_latitude: res.latitude,
        });
        console.log(res);
      },
    });
  },
  get_id(index) {
    console.log(index.detail);
    this.setData({
      new_id: index.detail,
    });
  },
  getmax_relettime(index) {
    console.log(index.detail);
    this.setData({
      max_relettime: index.detail,
    });
  },
  getmax_renttime(index) {
    console.log(index.detail);
    this.setData({
      max_renttime: index.detail,
    });
  },
  getphone(index) {
    console.log(index.detail);
    this.setData({
      new_phone: index.detail,
    });
  },
  getaddress(index) {
    console.log(index.detail);
    this.setData({
      new_address: index.detail,
    });
  },
  getdetail(index) {
    console.log(index.detail);
    this.setData({
      new_detail: index.detail,
    });
  },
  getname(index) {
    console.log(index.detail);
    this.setData({
      new_name: index.detail,
    });
  },
  getprice(index) {
    console.log(index.detail);
    this.setData({
      new_price: index.detail,
    });
  },
  afterRead(file) {
    var pl = file.detail.file;
    var temp_picture = this.data.new_picture;
    for (var i = 0; i < pl.length; i++) {
      var img = pl[i].url;
      temp_picture.push({ url: img });
      console.log(temp_picture);
    }
    this.setData({
      new_picture: temp_picture,
    });
  },
  delete(file) {
    console.log(file);
    var index = file.detail.index;
    var temp_picture = this.data.new_picture;
    temp_picture.splice(index, 1);
    console.log(temp_picture);
    this.setData({
      new_picture: temp_picture,
    });
  },
  getpicture(index) {
    wx.chooseMedia({
      count: 9,
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      camera: "back",
      success(res) {
        console.log(res.tempFiles.tempFilePath);
        console.log(res.tempFiles.size);
      },
    });

    this.setData({
      new_picture: index.detail,
    });
  },
  getroom(index) {
    this.setData({
      show: true,
    });
  },
  room_confirm(index) {
    var v = index.detail.value;
    var s = v[0] + v[1];
    console.log(s);
    this.setData({
      new_room: s,
      show: false,
    });
  },
  room_cancel(index) {
    this.setData({
      show: false,
    });
  },
  haslift() {
    if (this.data.new_haslift == "是") {
      this.setData({
        new_haslift: "否",
      });
    } else {
      this.setData({
        new_haslift: "是",
      });
    }
  },
  haswc() {
    if (this.data.new_haswc == "是") {
      this.setData({
        new_haswc: "否",
      });
    } else {
      this.setData({
        new_haswc: "是",
      });
    }
  },
  hasparking() {
    if (this.data.new_hasparking == "是") {
      this.setData({
        new_hasparking: "否",
      });
    } else {
      this.setData({
        new_hasparking: "是",
      });
    }
  },
  shared_housing() {
    if (this.data.new_shared_housing == "是") {
      this.setData({
        new_shared_housing: "否",
      });
    } else {
      this.setData({
        new_shared_housing: "是",
      });
    }
  },
  onLoad: function (option) {
    var house = JSON.parse(option.rentde);
    this.setData({
      h_id: house.h_id,
      new_name: house.h_name,
      new_address: house.address,
      new_longitude: house.h_longitude,
      new_latitude: house.h_latitude,
      new_detail: house.h_detail,
      max_renttime: house.max_renttime,
      new_price: house.price,
      phone: house.phone,
      show: false,
      new_square: house.square,
      new_hasparking: house.hasparking,
      new_haslift: house.haslift,
      new_haswc: house.haswc,
      new_shared_housing: house.shared_housing,
      new_room: house.room,
      room_options: [
        {
          values: ["一室", "两室", "三室", "四室", "五室"],
        },
        {
          values: ["一厅", "两厅", "三厅"],
        },
      ],
      rentde: house,
    });
    console.log(this.data.rentde);
    var picture_number = this.data.rentde.picture_number;
    var h_id = this.data.rentde.h_id;
    var temp_picture = [];
    for (var i = 1; i <= picture_number; i++) {
      temp_picture.push({
        url: "http://1.15.184.52:8086/static/image/" + h_id + "/" + i + ".jpg",
      });
    }
    this.setData({
      new_picture: temp_picture,
    });
  },
  rentnew(index) {
    var temp_pictures = this.data.new_picture;
    console.log("temp_pictures:" + JSON.stringify(temp_pictures));
    for (var i = 0; i < temp_pictures.length; i++) {
      try {
        var url = temp_pictures[i].url;
        console.log(url);
        temp_pictures[i] = wx
          .getFileSystemManager()
          .readFileSync(url, "base64", 0);
      } catch (e) {}
    }
    console.log(temp_pictures);
    wx.request({
      url: "http://1.15.184.52:8086/landlord/rentold",
      method: "POST",
      header: { "content-type": "application/json" },
      data: {
        h_id: this.data.rentde.h_id,
        address: this.data.new_address,
        h_detail: this.data.new_detail,
        h_latitude: this.data.new_latitude,
        h_longitude: this.data.new_longitude,
        h_name: this.data.new_name,
        max_relettime: this.data.max_relettime,
        max_renttime: this.data.max_renttime,
        price: this.data.new_price,
        square: this.data.new_square,
        room: this.data.new_room,
        haslift: this.data.new_haslift,
        hasparking: this.data.new_hasparking,
        haswc: this.data.new_haswc,
        shared_housing: this.data.new_shared_housing,
        pictures: temp_pictures,
      },
      success: (res) => {
        var datas = res.data;
        if (datas.sucess == "no") {
          wx.showToast({
            title: "房间已出租",
            icon: "error",
          });
          console.log("???");
        } else {
          console.log("ok");
          wx.request({
            url: "http://1.15.184.52:8086/messages/send",
            method: "POST",
            header: { "content-type": "application/json" },
            data: {
              phone: getApp().globalData.user.phone,
              message_type: "租房信息修改成功通知",
              user_type: "房东",
              content:
                "您的房子(原名:" +
                this.data.rentde.h_name +
                ")的信息已经成功更改,请等待管理员审核结果",
              send_time: formatTime(new Date()),
            },
          });
          wx.showToast({
            title: "提交成功",
            icon: "none",
          });
          // console.log(this.data.all_collections[1].h_id)
        }
      },
    });
  },
  //模态框取消
  modalCancel() {
    wx.showToast({
      title: "取消提交",
      icon: "none",
    });
    this.setData({
      modalHidden: true,
    });
  },
  //模态框确定
  modalConfirm: function (e) {
    this.setData({});
    wx.showToast({
      title: "提交成功",
      icon: "success",
    });
    this.setData({
      modalHidden: true,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //console.log(this.data.rentde)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
