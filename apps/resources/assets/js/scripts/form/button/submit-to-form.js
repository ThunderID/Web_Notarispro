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
	// get form method from button submit
	getMethodForm : function (el) {
		methodForm = $(el).data('method');
		return methodForm;
	},
	// attr to action form & submit form
	submitForm : function(url, el, method) {
		form = $('.' + el);
		form.attr('action', url);
		form.attr('method', method);
		form.submit();
	},
	// init data href, data form class name, data method from button submit event click
	init: function() {
		$('.btn-form').on('click', function (){
			urlInit = submitToForm.getUrl($(this));
			formInit = submitToForm.getClassForm($(this));
			methodInit = submitToForm.getMethodForm($(this));
			submitToForm.submitForm(urlInit, formInit, methodInit);
		});
	}
};