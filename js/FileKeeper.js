FileKeeper = function () {
	this.files = {};
	this.tree = {};
};

FileKeeper.prototype = {
	fetch: function () {
		var that = this;
		var request = gapi.client.drive.files.list({
			'maxResults': 1000
		});
	  	request.execute(function (resp) {
	  		that.items = resp.items;
	  		console.log('Starting Tree');
	  		that.buildItems();
	  		console.log('Tree Built');
	  	});
	},

	buildItems: function () {
		this.index = lunr(function () {
		    this.field('title', {boost: 10});
		    this.ref('id')
		});

		for (var i = this.items.length - 1; i >= 0; i--) {
			this.index.add({
				id: this.items[i].id,
				title: this.items[i].title
			});
			this.items[i].loTitle = this.items[i].title.toLowerCase();
			this.files[this.items[i].id] = this.items[i];
		};
	},

	search: function (string) {
		return this.index.search(string);
	}
}