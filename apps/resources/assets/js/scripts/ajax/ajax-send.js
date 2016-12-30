;var ajaxSend = {
	init : function (url, method, param) {
		$.ajax({
			url: url,
			type: method,
			data: param,
			success: function(data){
				console.log(data);
			}
		});	
	}
};