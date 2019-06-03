var subjectUtil = require('../../utils/subjectUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    movies: [],
    hidden: true,
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
  bindKeyInput: function (e) {
    this.setData({inputVal: e.detail.value});
  },
  search: function (e) {
    if (this.data.inputVal == '') {
      wx.showModal({
        title: '温馨提示',
        content: '请输入关键词',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({ hidden: false });
      var that = this;
      wx.request({
        // 接口无数据
        url: "https://douban.uieee.com/v2/movie/search?start=0&count=10&q=" + that.data.inputVal,
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          var subjects = res.data.subjects;
          subjectUtil.processSubjects(subjects);
          that.setData({ movies: subjects, hidden: true });
        }
      })
    }
  }
})