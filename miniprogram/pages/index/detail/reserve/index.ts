import { formatTime } from "../../../../utils/util"

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house: null,
    information: [],
    modalHidden: true,
    begindate: '请选择访问时间',
    phone: null,
    name: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var house = JSON.parse(option.house)
    // console.log(option)
    this.setData({
      house: house,
      phone: app.globalData.user.phone,
      name: app.globalData.user.user_name
    })

  },
  bindbeginDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      begindate: e.detail.value
    })
    console.log("开始时间" + this.data.begindate)
  },
  formSubmit(e) {
    var app = getApp()
    //console.log(e);
    var information = e.detail.value;
    this.setData({
      information: e.detail.value,
      modalHidden: false
    });
    console.log(information);
  },
  modalCancel() {
    wx.showToast({
      title: '取消提交',
      icon: 'none'
    })
    this.setData({
      modalHidden: true,
    })
  },
  //模态框确定
  modalConfirm: function (e) {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
    })
 
      wx.request({
        url: 'http://1.15.184.52:8086/index/detail/book',
        method: 'POST',
        header:{  
          'content-type':'application/json'
        },
        data: {
          h_id: this.data.house.h_id,
          phone: this.data.information.phone,
          visit_number: this.data.information.vnumber,
          visit_time: this.data.begindate,
        },
        success: (res) => {
          var datas = res.data
          console.log(res)
          // console.log(datas)
          if (datas.sucess == 'no') {
            console.log("h_id:" + this.data.house.h_id)
            console.log("???")
          }
          else
          {
            wx.request({
              url: 'http://1.15.184.52:8086/messages/send',
              method: 'POST',
              header:{  
                'content-type':'application/json'
              },
              data: {
                content: "您的房子(" + this.data.house.h_name + ")有新的预约,详情请到租客预约管理查看。",
                message_type: "租客看房预约通知",
                phone: this.data.house.phone,
                user_type: "房东",
                send_time:formatTime(new Date())
              }
            });
          }
        },
      });

    this.setData({
      modalHidden: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})