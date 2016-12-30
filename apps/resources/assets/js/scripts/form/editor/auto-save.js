;var autoSave = {
	init : function (el, url, form) {
		// event triger auto save medium-editor
		var triggerAutoSave = function (event, editable) {
			// call plugin loading 
			loading.loadingStart();
			
			$.ajax({
				url: url,
				type:'POST',
				data: form.serialize(),
				success: function(data){
					setTimeout( function (){
						loading.loadingStop();
					}, 2000);
				}
			});	
		};

		var throttledAutoSave = MediumEditor.util.throttle(triggerAutoSave, 3000);
		el.subscribe('editableInput', throttledAutoSave);
	}
};