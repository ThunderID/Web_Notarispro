var tableSelector = {
	// get ID table row
	getID : function (el) {
		id = el.data('id');
		return id;
	},
	// go to url in table row
	goUrl : function (el, url) {
		id = this.getID(el);
		
		if (typeof(id) != "undefined") {
			window.location = url + '/' + id;
		}
	},
	// cek table row & set click row link
	init: function(url) {
		$('.table').find('tbody tr').on('click', function (){
			tableSelector.goUrl($(this), url);
		});
	}
};