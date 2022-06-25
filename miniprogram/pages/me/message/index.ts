const socket = require("../../../utils/socket.js");
Page({
  data: {

  },

  onLoad() {
    // 监听socket 是否连接成功
    socket.connect((status, ws) => {
      // 连接成功
      if (status) {
        console.log(ws);
        
        // 向服务端发送消息
        ws.emit('connect', { msg: 'Hello World' }); // 参数一：发送消息的socket名，参数二: 发送的数据
        // 接受服务端传来的消息
        ws.on('connect', (res) => { // 参数一：接收消息的socket名，参数二：返回的信息 function 
          console.log(res)
        });

      } else {
        // ...连接超时
      }
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