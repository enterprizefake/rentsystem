import{formatTime} from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   house:null,
   information:[],
   modalHidden:true,
   begindate:formatTime(new Date()).split(" ")[0],
   enddate:formatTime(new Date()).split(" ")[0],
   phone:null,
   renttime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) { 
    var app=getApp()
    var house=JSON.parse(option.house)
    // console.log(option)
    this.setData({
      house: house,
      phone:app.globalData.user.phone
    })
    
    // wx.request({

    // })
   console.log(this.data.house)
  },
  formSubmit(e){
    console.log(e);
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
  bindbeginDateChange: function(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      begindate: e.detail.value,
    })
    
    if(this.data.house.max_renttime)
    {
      if(e.detail==this.data.house.max_renttime)
      wx.showToast({
        title: '不能超过最大值',
        icon:'error',
      })
    }
    console.log(this.data.renttime)
    var date=this.data.begindate;
    var result=date.match(/(\d+)*-(\d+)*-(\d+)*/)
    var year=result[1]
    var month=result[2]
    var day=result[3]
    var new_month=(Number(month)+this.data.renttime)%12;
    var new_year=Math.floor((Number(month)+this.data.renttime)/12)+Number(year);
   
    if(new_month==0)
    {
      new_month=12
      new_year=new_year-1
    } 
    console.log(new_year);
    console.log(new_month);

   var alter_month=new_month<10?'0'+String(new_month):String(new_month)
   var alter_day=day<10?'0'+String(day):String(day)
    this.setData({
      enddate:String(new_year)+"-"+alter_month+"-"+String(day)
    })
    console.log(this.data.enddate)

  },
  bindendDateChange: function(e) {
    //console.log('picker发送选择改变，携带值1为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
   // console.log("结束时间"+this.data.enddate)
  },
  bindrenttime: function(e) {
    console.log(e)
    this.setData({
      renttime: e.detail
    })
    if(this.data.house.max_renttime)
    {
      if(e.detail==this.data.house.max_renttime)
      wx.showToast({
        title: '不能超过最大值',
        icon:'error',
      })
    }

    console.log(this.data.renttime)
    var date=this.data.begindate;
    var result=date.match(/(\d+)*-(\d+)*-(\d+)*/)
    var year=result[1]
    var month=result[2]
    var day=result[3]
    var new_month=(Number(month)+this.data.renttime)%12;
    var new_year=Math.floor((Number(month)+this.data.renttime)/12)+Number(year);
   
    if(new_month==0)
    {
      new_month=12
      new_year=new_year-1
    } 
    console.log(new_year);
    console.log(new_month);

   var alter_month=new_month<10?'0'+String(new_month):String(new_month)
   var alter_day=day<10?'0'+String(day):String(day)
    this.setData({
      enddate:String(new_year)+"-"+alter_month+"-"+String(day)
    })
    console.log(this.data.enddate)
   // console.log("结束时间"+this.data.enddate)
  },
  //模态框确定
  modalConfirm:function(e) {

    wx.showToast({
      title: '提交成功',
      icon:'success',
    })
   console.log(this.data.information),
    wx.request({
      url: 'http://1.15.184.52:8086/index/detail/pay',
      method: 'POST',
      data: {
        begin_date:this.data.begindate,
        end_date:this.data.enddate,
        h_id:this.data.house.h_id,
        phone:this.data.phone,
        rent_time:this.data.renttime
      },
      success: (res) => {
        var datas = res.data
         console.log(res)
        if (datas.sucess == 'no') {
          console.log("h_id:"+this.data.house.h_id)
          console.log("???")

          // var d=JSON.stringify
          console.log("this.data:"+JSON.stringify(this.data))
        }
        else
        {
          wx.request({
            url: 'http://1.15.184.52:8086/messages/send',
            method: 'POST',
            data:
            {
              phone:this.data.phone,
              message_type:"支付成功通知",
              user_type:"租客",
              content:'您已支付成功!实付款:'+this.data.house.price*this.data.house.renttime+"元",
              send_time:formatTime(new Date())
            }
          });
          wx.request({
            url: 'http://1.15.184.52:8086/messages/send',
            method: 'POST',
            data:
            {
              phone:this.data.house.phone,
              message_type:"租赁成功通知",
              user_type:"房东",
              content:'您的房子('+this.data.house.h_name+')已成功出租!详情请查看订单',
              send_time:formatTime(new Date())
            }
          });  
      wx.navigateBack({
       delta: 1
      })
        }
      }

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