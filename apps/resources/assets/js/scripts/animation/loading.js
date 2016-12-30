;var loading = {
	changeColor : function (color) {
		appLoading.setColor(color);
	},
	loadingStart : function () {
		appLoading.start();
	},
	loadingStop : function () {
		appLoading.stop();
	},
	init : function () {
		loading.changeColor('');
	}
};