import {formatTime} from "../../../../utils/util"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    reply: null,
    state: null,
    columns: ['已通过', '已驳回'],
    show: false,
    type: null
  },
  pop() {
    if (this.data.type == 'audits') { this.setData({ show: true }); }
  },
  confirm(index) {
    this.setData({
      state: index.detail.value,
      show: false
    })
  },
  cancel() {
    this.setData({
      state: null,
      show: false
    })
  },
  commit() {
    if (this.data.reply && this.data.state) {
      wx.request({
        url: "http://127.0.0.1:8086/root/audit",
        method: 'POST',
        data: {
          h_id: this.data.content.h_id,
          phone: app.globalData.user.phone,
          audit_state: this.data.state,
          audit_info: this.data.reply
        },
        success: (res) => {
          if (res.data.sucess == 'yes') {
            wx.showToast({
              title: '提交成功',
              icon: 'success'
            })
            wx.request({
              url: 'http://127.0.0.1:8086/messages/send',
              method: 'POST',
              data:
              {
                phone:this.data.content.phone,
                message_type:this.data.state=='已通过'?"房屋发布成功通知":"房屋发布失败通知",
                user_type:"房东",
                content:this.data.state=='已通过'?"您发布的房子("+this.data.content.h_name+")已成功通过审核!":"您发布的房子("+this.data.content.h_name+")因未通过审核被驳回!",
                send_time:formatTime(new Date())
              }
            })
          }
          else {
            wx.showToast({
              title: '提交失败',
              icon: 'error',
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '请完善审核信息',
        icon: 'error',
      })
    }
  },
  map() {
    wx.openLocation({
      longitude: Number(this.data.content.longitude),//经度或纬度必须是number类型
      latitude: Number(this.data.content.latitude),
      name: this.data.content.h_name,
      address: this.data.content.address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({
      content: JSON.parse(decodeURIComponent(e.data)),
      type: e.type
    })

    this.setData({
      reply: this.data.content.audit_info,
      state: this.data.content.audit_state
    })
    console.log(56486 + JSON.stringify(this.data.content))
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