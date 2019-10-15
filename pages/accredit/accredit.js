// pages/accredit/accredit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iv:'',
    encryptedData:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //授权登录
  bindGetUserInfo(e) {
    let that=this
    that.data.encryptedData = e.detail.encryptedData
    that.data.iv = e.detail.iv
    console.log(e)
    if (e.detail.userInfo){
      wx.login({
        success(res) {
          // console.log(res)
          if (res.code) {
            that.data.code=res.code
            //发起网络请求
            wx.request({
              url:'https://api.it120.cc/zhangheng/user/wxapp/login',
              data: {
                code: res.code
              },
              success:(res)=>{
                console.log(res)
                if(res.data.code==10000){
                  that.register();
                }
                if(res.data.code==0){
                  wx.navigateTo({
                    url: '../home/home',
                  })
                }
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  register(){
    // console.log(11)
    let that=this
    wx.login({
      success(res){
        console.log(res.code,that.data.encryptedData,that.data.iv)
        wx.request({
          url: 'https://api.it120.cc/zhangheng/user/wxapp/register/complex',
          data:{
            code:res.code,
            encryptedData:that.data.encryptedData,
            iv:that.data.iv
          },
          success(res){
            if (res.data.code == 0) {
                  wx.navigateTo({
                    url: '../home/home',
                  })
                }
          }
        })
      }
    })

  }

})