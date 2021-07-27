// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

  },
 
  onLoad() {

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
