var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    audits: null,
    audited: null,
    card: 'card',
    root_type: null,
    allusers: null,
    FirstPin: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "W",
      "X",
      "Y",
      "Z"
    ],
    user_list:[]

  },
  check(index) {
    wx.navigateTo({
      url: "/pages/me/root/check/index?type=audits&data=" + encodeURIComponent(JSON.stringify(index.currentTarget.dataset.name))
    })
  },
  check1(index) {
    wx.navigateTo({
      url: "/pages/me/root/check/index?type=audited&data=" + encodeURIComponent(JSON.stringify(index.currentTarget.dataset.name))
    })

  },
  onLoad(v) {
    this.setData({
      root_type: v.root_type
    })

    wx.request({
      url: "http://127.0.0.1:8086/allusers",
      method: "POST",
      success: (res) => {
        this.setData({
          allusers: res.data.allusers
        })
        console.log(this.data.allusers)
        var user_list=[]
        this.data.FirstPin.forEach(item => {
          // user_list.push({item:[]})
          user_list[item] = [];
          console.log(user_list)
          var allusers=this.data.allusers
          allusers.forEach(el => {
            //对比开头字母是否对应
            let first = el.user_name.substring(0, 1).toUpperCase();
            if (first == item) {
              user_list[item].push(el);
            }
          });
        });
        console.log(res.data.allusers)

        console.log(user_list)
      }
    });
    wx.request({
      url: "http://127.0.0.1:8086/root/audits",
      method: "POST",
      success: (res) => {
        this.setData({
          audits: res.data.audits
        })
        console.log(res.data.audits)
      }
    });

    wx.request({
      url: "http://127.0.0.1:8086/root/audited",
      method: "POST",
      data: {
        phone: app.globalData.user.phone
      },
      success: (res) => {
        this.setData({
          audited: res.data.audited
        })
        console.log("audited:" + res.data)
      }

    })
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