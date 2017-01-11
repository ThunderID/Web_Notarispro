;var templateFormat = {
	replaceElementToLink : function (element, key, href) {
		element.html( function (_, html) {
			return html.replace(key, "<a href='" +href+ "'>$1</a>");
		});
	},
	addEventModal : function (element, search, modalClass) {
		element.find(search).attr('data-toggle', 'modal').attr('data-target', modalClass);
	},
	init: function (element, param) {
		element.html(param);
	}
};