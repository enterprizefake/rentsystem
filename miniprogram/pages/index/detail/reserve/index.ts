// pages/index/detail/reserve/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
       house:null,
       information:[],
       modalHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) { 
    var house=JSON.parse(option.house)
    // console.log(option)
    this.setData({
      house: house
    })
    // wx.request({

    // })
    //   console.log(option.house_id)
  },

  formSubmit(e){
    //console.log(e);
    var information= e.detail.value;
    this.setData({
      information: e.detail.value,
      modalHidden:false
    });
    console.log(information);
  },
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm:function(e) {
    wx.showToast({
      title: '提交成功',
      icon:'success',
    })
   console.log(this.data.information.name),
    wx.request({
      // url: 'http://1.15.184.52:8086/index',
      url: 'http://127.0.0.1:8086/index/detail/book',
      method: 'POST',
      data: {
        h_id:this.data.house.h_id,
        phone:this.data.information.phone,
        visit_number:this.data.information.vnumber,
        visit_time:this.data.information.vtime,
      },
      success: (res) => {
        var datas = res.data
        console.log(res)
       // console.log(datas)
        if (datas.sucess == 'no') {
          console.log("h_id:"+this.data.house.h_id)
          console.log("???")
        }
      },
    })  
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