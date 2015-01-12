App = function () {};

App.prototype = {

  colors: ['blue', 'orange', 'yellow', 'green'],

	start: function () {
		console.log('application has started');
		this.fileKeeper = new FileKeeper();
		this.fileKeeper.fetch();
	},

  setColor: function () {
    // document.body.classList.add(this.colors[Math.floor(Math.random() * 5)]);
  }
}