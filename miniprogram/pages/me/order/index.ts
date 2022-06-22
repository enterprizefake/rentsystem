import { formatTime } from '../../../utils/util'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:null,
    date:null
  },
  onLoad (data) {
    this.setData({
      date:formatTime(new Date())
    })
    if( data.user_type == "tenant" )
    {
      data.user_type="tenants"
      wx.request({
        url:"http://127.0.0.1:8086/"+data.user_type+"/orders",
        method:'POST',
        data:{
          phone:app.globalData.user.phone
        },
        success:(res)=>
        {
          this.setData({
            orders:res.data.orders
          })

        }

        
      })
    }


}
})