App = function () {};

App.prototype = {

	start: function () {
		console.log('application has started');
		this.fileKeeper = new FileKeeper();
		this.fileKeeper.fetch();
	}
}