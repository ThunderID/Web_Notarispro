;var mediumEditor = {
	// call plugin medium editor
	init : function(url, form) {
		var editor = new MediumEditor('.medium-editor', {
			// button on toolbar medium-editor
			toolbar: {
				buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'orderedlist', 'unorderedlist', 'addInput', {
						name: 'h4', contentFA: '<i class="fa fa-header"></i>'}]
			},
			placeholder: {
				text: 'Tulis disini...',
				hideOnClick: true
			},
			buttonLabels: 'fontawesome',
			paste: {
				cleanPastedHTML: true,
				forcePlainText: true,
			},
			spellcheck: false,
			disableExtraSpaces: true,
			disableDoubleReturn: true,
			targetBlank: true,
			extensions: {
				'addInput' : addNewItemToolbar.addInput(),
				// 'addUppercase' : addNewButton.addUppercase(),
			}
		});
		// call function autosave medium-editor
		autoSave.init(editor, url, form);
	}
};