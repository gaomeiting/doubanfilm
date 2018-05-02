//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		movie: null
	},
	onLoad(options) {
		const id = options.id;
		const url = `subject/${id}`
		this._ajaxMovie(url)
	},
	_ajaxMovie(url) {
		wx.showLoading({
			title: "拼命加载中..."
		})
		app.douban.findOne(url).then(res => {
			this.setData({
				movie: res
			})
			wx.hideLoading()
		})
	}
})
