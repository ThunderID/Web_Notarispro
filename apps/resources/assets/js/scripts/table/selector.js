var tableSelector = {
	getID : function (el) {
		id = el.data('id');
		return id;
	},
	goUrl : function (el, url) {
		id = this.getID(el);
		
		if (typeof(id) != "undefined") {
			window.location = url + '/' + id;
		}
	},
	init: function(url) {
		$('.table').find('tbody tr').on('click', function (){
			tableSelector.goUrl($(this), url);
		});
	}
};