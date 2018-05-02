//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  	boards: [
  		{key: 'in_theaters'},
  		{key: 'coming_soon'},
  		{key: 'new_movies'},
  		{key: 'top250'}
  	]
  },
  onLoad() {
  	this._ajaxData();
  },
  goMovieDetail(e) {
    const movie= e.currentTarget.dataset.movie;
    wx.navigateTo({
      url: `../movie/movie?id=${movie.id}`
    })
  },
  _ajaxData() {
  	wx.showLoading({
  		title:"拼命加载中"
  	})
  	const tasks=this.data.boards.map(board => {
  		return app.douban.find(board.key, 1, 8).then(res => {
  			 board.title = res.title;
  			 board.movies = res.subjects;
  			 return board
  		})
  	})
  	Promise.all(tasks).then(boards => {
  		this.setData({
  			boards
  		})
  		console.log(this.data.boards, "1234")
  		wx.hideLoading()
  	})
  }
})
