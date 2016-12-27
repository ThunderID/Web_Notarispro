var submitToForm = {
	// get url route from button submit
	getUrl : function (el) {
		urlAction = el.data('href');
		return urlAction;
	},
	// get name form class from button submit
	getClassForm : function (el) {
		classForm = el.data('form');
		return classForm;
	},
	// attr to action form & submit form
	submitForm : function(url, el) {
		form = $('.' + el);
		form.attr('action', url);
		form.submit();
	},
	// init data href & data form class name from button submit event click
	init: function() {
		$('.btn-form').on('click', function (){
			urlInit = submitToForm.getUrl($(this));
			formInit = submitToForm.getClassForm($(this));
			submitToForm.submitForm(urlInit, formInit);
		});
	}
};