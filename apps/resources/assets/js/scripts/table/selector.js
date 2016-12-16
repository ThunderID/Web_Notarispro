;var tableSelector = {
	getID : function (el) {
		id = el.data('id');
		return id;
	},
	goUrl : function (el, url) {
		id = this.getID(el);
		window.location = url + '/' + id;
	},
	init: function(el, url) {
		$('#' + el).find('tbody tr').on('click', function (){
			tableSelector.goUrl($(this), url);
		});
	}
};