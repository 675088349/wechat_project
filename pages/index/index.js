// index.js
// 获取应用实例
const WXAPI = require('apifm-wxapi')

const app = getApp()

Page({
  data: {
    show: true
  },
 
  onLoad() {

    this.initBanners();
  },

  async initBanners(){
    const res = await WXAPI.banners({
      type: 'index'
    })
    console.log("banner",res);
    if (res.code == 700 || res.code == 400) {
      wx.showModal({
        title: "提升",
        content: res.msg,
        showCancel: false,
        cancelColor: 'cancelColor',
      })
    } else {
      this.setData ({
        banners: res.data
      })
    }
  },

  onShow() {

    console.log("App.globalData.navHeight", app.globalData.navHeight)

    this.setData ({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
    })

  }

})
