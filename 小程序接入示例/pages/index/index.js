//index.js
let okayapi = require('../../utils/okayapi.js')  

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '正在调用小白接口……',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.okayApiHelloWorld()

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 小白接口请求示例
   */
  okayApiHelloWorld: function(e) {
    /**
     * 准备接口参数
     */
    let params = {
      s: "Hello.World", 		// 必须，待请求的接口服务名称
      name: "dogstar" 		  // 可选，根据接口文档，补充更多接口参数
    };
    let _self = this

    /**
     * 对小白接口发起请求
     */
    wx.request({
      url: app.globalData.okayapiHost,
      data: okayapi.enryptData(params),
      success: function (wxRes) {
        // TODO：实现你的梦想……
        let res = wxRes.data

        if (res.data && res.data.err_code == 0) {
          // TODO：请求成功
          console.log('ok: ', res.data)

          _self.setData({
            motto: res.data.title
          })
        } else {
          // TODO：当前操作失败
          console.log('fail: ', res)

          _self.setData({
            motto: res.data.err_msg
          })
        }

      }
    })  
  }

})
