;var ajaxSend = {
	initVariable : {
		'ajaxUrl'		: null,
		'ajaxMethod' 	: null,
		'ajaxParam'		: null,
	},
	handleAjax: function (url, param, method, callback) {
		// function ajaxCall(url, param, method, callback) {
			// var paramData;
		$.ajax({
			type: this.initVariable.ajaxMethod,
			url: this.initVariable.ajaxUrl,
			data: this.initVariable.ajaxParam,
			dataType: 'json',
			success: callback,
			error: function (reason, xhr) {
				console.log('error', reason);
			}
			// success: function (data) {
			// 	paramData = data;
			// 	// callback(data);
			// 	ajaxSend.showTemplate(data);
			// 	return paramData;
			// }
			// complete: function (data) {
			// 	console.log(data);
			// },
			// error: function (xhr, textStatus, errorThrown) {
			// 	console.log('error');
			// }
		});
		// sendAjax.done( function (data) {
		// 	ajaxSend.initVariable.ajaxData = data;
		// 	// return data;
		// });
	},
	init : function (url, method, param, callback) {
		this.initVariable.ajaxUrl 		= url;
		this.initVariable.ajaxMethod 	= method;
		this.initVariable.ajaxParam 	= param;

		// ajaxSend.handleAjax(function(data){
		// 	// $('.draft-template').html(data.data.content.data[0].paragraph_0);
		// 	tes(data);
		// });
		$.ajax({
			type: this.initVariable.ajaxMethod,
			url: this.initVariable.ajaxUrl,
			data: this.initVariable.ajaxParam,
			dataType: 'json',
			success: callback,
			error: function (reason, xhr) {
				console.log('error', reason);
			}
		});
		// console.log(this.initVariable.ajaxData);
		// return this.initVariable.ajaxData;
	}
};