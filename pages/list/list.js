const app=getApp();
Page({
	data: {
		currentPage: 1,
		more: false,
		movies: []
	},
	onLoad(options) {
		this.setData({
			url: options.key
		})
		this.search();
	},
	goMovieDetail(e) {
	    const movie= e.currentTarget.dataset.movie;
	    wx.navigateTo({
	      url: `../movie/movie?id=${movie.id}`
	    })
	},
	search(e) {
		console.log(123,"list")
		this.setData({
			currentPage: 1,
			more: true
		})
		app.douban.find(this.data.url, this.currentPage, 10).then(res => {
			const movies=this.data.movies.concat(res.subjects)
			this.setData({
				movies
			})
			this._hasMore(res.start, res.count, res.total)
		})
	},
	pullUp() {
		if(!this.data.more) return;
		const currentPage=this.data.currentPage+1;
		this.setData({
			currentPage
		})
		const value = this.data.inputValue;
		app.douban.find(this.data.url, this.data.currentPage, 10).then(res => {
			const movies=this.data.movies.concat(res.subjects)
			this.setData({
				movies
			})
			this._hasMore(res.start, res.count, res.total)
		})
	},
	_hasMore(start, count, total) {
		console.log(start+count<total, this.data.more)
		if(start+count < total) {
			this.setData({
				more: true
			})
		}
		else {
			this.setData({
				more: false
			})
		}
	}


})