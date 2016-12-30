;var addNewItemToolbar = {
	// add new button symbol for input modal for draft akta on toolbar
	addInput : function () {
		var addInput = new MediumButton({
			label: '[[[ input ]]]', 
			action: function (html, mark, parent) {
				temp = html;
				return html.replace(temp, temp + ' [[[input]]] ');
			}
		});
		return addInput;
	},
	// add new button uppercase on toolbar
	// addUppercase : function () {
	// 	var addUppercase = new MediumButton({
	// 		label: 'uppercase', 
	// 		action: function (html, mark, parent) {
	// 			temp = html;
	// 			return html.replace(temp, '<span class="text-uppercase">' + temp + '</span>');
	// 		}
	// 	});
	// 	return  addUppercase;
	// },
	// init : function () {
		// button addInput & addUppercase add on init
	// 	addNewButton.addInput();
	// 	addNewButton.addUppercase();
	// }
};
// rangy.init();

// 			var HighlighterButton = MediumEditor.Extension.extend({
// 				name: 'highlighter',

// 				init: function() {
// 					this.classApplier = rangy.createClassApplier('highlight', {
// 						elementTagName: 'mark',
// 						normalize: true
// 					});

// 					this.button = this.document.createElement('button');
// 					this.button.classList.add('medium-editor-action');
// 					this.button.innerHTML = '<i class="fa fa-paint-brush"></i>';
// 					this.button.title = 'Highlight';

// 					this.on(this.button, 'click', this.handleClick.bind(this));
// 				},
// 				getButton: function () {
// 					return this.button;
// 				},
// 				handleClick: function (event) {
// 					this.classApplier.toggleSelection();

// 					// Ensure the editor knows about an html change so watchers are notified
// 					// ie: <textarea> elements depend on the editableInput event to stay synchronized
// 					this.base.checkContentChanged();
// 				}
// 			});

// 			var addParsingVariable = MediumEditor.Extension.extend({
// 				name: 'parsingVariable',

// 				init: function() {
// 					this.button = this.document.createElement('button');
// 					this.button.classList.add('medium-editor-action');
// 					this.button.innerHTML = '<i class="fa fa-paint-brush"></i>';
// 					this.button.title = 'Highlight';
// 				}
// 			});

// 			var editor = new MediumEditor('.medium-editor', {
// 				toolbar: {
// 					buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'orderedlist', 'unorderedlist', 'addInput',
// 						{
// 							name: 'h4',
// 							contentFA: '<i class="fa fa-header"></i>',
// 						},
// 						'uppercase'
// 					]
// 				},
// 				placeholder: {
// 					text: 'Tulis disini...',
// 					hideOnClick: true
// 				},
// 				buttonLabels: 'fontawesome',
// 				paste: {
// 					cleanPastedHTML: true
// 				},
// 				extensions: {
// 					'highlighter': new HighlighterButton(),
// 					'addInput': new MediumButton({
// 						label: '%input%', 
// 						action: function (html, mark, parent) {
// 							temp = html;
// 							return html.replace(temp, temp + ' %input% ');
// 						}
// 					}),
// 					'uppercase': new MediumButton({
// 						label: 'uppercase', 
// 						action: function (html, mark, parent) {
// 							temp = html;
// 							return html.replace(temp, '<span class="text-uppercase">' + temp + '</span>');
// 						}
// 					}),
// 				}
// 			});

// 			var triggerAutoSave = function (event, editable) {
// 				// event auto save
// 			};

// 			var throttledAutoSave = MediumEditor.util.throttle(triggerAutoSave, 1000);
// 			editor.subscribe('editableInput', throttledAutoSave);
// 		});