// pages/login/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: null,
    phone: null,
    e1: null,
    e2: null
  },
  check1() {
    if (!this.data.user_name) {
      this.setData({
        e1: "用户名不能为空"
      })
      return false
    }
    else {
      this.setData({
        e1: null
      })
      return true
    }
  },
  check2() {
    var n = this.data.phone
    if (!n) {
      this.setData({
        e2: "手机号不能为空"
      })
      return false
    }
    else if (n.length < 11) {
      this.setData({
        e2: "手机号错误"
      })
      return false
    }
    else {
      this.setData({
        e2: null
      })
      return true
    }
  },
  commit(){

    if (this.check1() && this.check2()) {
      let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
      let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。                                                           
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        user: 
        user_name: this.data.user_name,
        phone: this.data.phone
      })//上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
      //最后就是返回上一个页面。
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
        success: function () {

          console.log('成功！')
        }
      })
    }
  }


})