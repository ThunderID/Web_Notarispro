@extends('layouts.centered')

@section('nav-template')
	active
@endsection

@push('title')
	@if (Request::route()->getName()=='edit.template.akta')
		<a class="btn btn-link btn-xs" href="{{ route('show.template.akta', ['id' => $data['info']['id']]) }}"><i class="fa fa-chevron-left"></i></a>
	@else
		<a class="btn btn-link btn-xs" href="{{ route('index.template.akta') }}"><i class="fa fa-chevron-left"></i></a>
	@endif
	Buat Template Baru
@endpush

@push('action')
	@if (Request::route()->getName()=='edit.template.akta')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.template.akta', ['id' => $data['info']['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('update.template.akta', ['id' => $data['info']['id']]) }}" role="button">Simpan</a>
	@else
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('store.template.akta') }}" role="button">Simpan</a>
	@endif
@endpush

@section('center')
	<form>
		<textarea name="tes" class="medium-editor editable m-t-md" cols="30" rows="10"></textarea>
	</form>
@endsection

@push('scripts')
	<script>
		$(".summernote").summernote({
			airMode: true,
			fontNames: ["Monospace"],
			placeholder: "Tulis template",
		});
	</script>
	<script>
		rangy.init();

		var HighlighterButton = MediumEditor.Extension.extend({
			name: 'highlighter',

			init: function() {
				this.classApplier = rangy.createClassApplier('highlight', {
					elementTagName: 'mark',
					normalize: true
				});

				this.button = this.document.createElement('button');
				this.button.classList.add('medium-editor-action');
				this.button.innerHTML = '<i class="fa fa-paint-brush"></i>';
				this.button.title = 'Highlight';

				this.on(this.button, 'click', this.handleClick.bind(this));
			},
			getButton: function () {
				return this.button;
			},
			handleClick: function (event) {
				this.classApplier.toggleSelection();

				// Ensure the editor knows about an html change so watchers are notified
				// ie: <textarea> elements depend on the editableInput event to stay synchronized
				this.base.checkContentChanged();
			}
		});

		var addParsingVariable = MediumEditor.Extension.extend({
			name: 'parsingVariable',

			init: function() {
				this.button = this.document.createElement('button');
				this.button.classList.add('medium-editor-action');
				this.button.innerHTML = '<i class="fa fa-paint-brush"></i>';
				this.button.title = 'Highlight';
			}
		});

		var editor = new MediumEditor('.medium-editor', {
			toolbar: {
				buttons: ['bold', 'italic', 'underline', 'highlighter', 'contoh']
			},
			buttonLabels: 'fontawesome',
			paste: {
			       cleanPastedHTML: true
			   },
			extensions: {
				'highlighter': new HighlighterButton(),
				'contoh': new MediumButton({
					label: '%%name%%', 
					action: function (html, mark, parent) {
						temp = html;
						return html.replace(temp, temp + ' %%name%% ');
					}
				}),
			}
		});

		var triggerAutoSave = function (event, editable) {
		    console.log(editable);
		};

		var throttledAutoSave = MediumEditor.util.throttle(triggerAutoSave, 1000);
		editor.subscribe('editableInput', throttledAutoSave);
	</script>
@endpush
