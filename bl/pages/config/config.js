Page({

  /**
   * 页面的初始数据
   */
  data: {
    configs: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var configs = wx.getStorageSync('configs');
    this.setData({configs:configs});
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
  switchChange: function (e) {
    console.log(e);
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if (!config) {
      config = new Object();// 新建一个对象
      configs[id] = config;
    }
    // 状态
    config.state = e.detail.value;
    this.setData({configs:configs});
    wx.setStorage({
      key: 'configs',
      data: configs,
    });
  },
  sliderChange: function (e) {
    console.log(e);
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if (!config) {
      config = new Object();// 新建一个对象
      configs[id] = config;
    }

    config.time = e.detail.value;
    this.setData({ configs: configs });
    wx.setStorage({
      key: 'configs',
      data: configs,
    });
  },
  radioChange: function (e) {
    console.log(e);
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if (!config) {
      config = new Object();// 新建一个对象
      configs[id] = config;
    }

    config.voice = e.detail.value;
    this.setData({ configs: configs });
    wx.setStorage({
      key: 'configs',
      data: configs,
    });
  }
})