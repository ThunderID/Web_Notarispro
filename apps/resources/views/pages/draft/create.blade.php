@extends('layouts.major_right')

@section('nav-draft')
	active
@endsection

@push('title')
	@if (Request::route()->getName()=='edit.draft.akta')
		<a class="btn btn-link btn-xs" href="{{ route('show.draft.akta', ['id' => $info['id']]) }}"><i class="fa fa-chevron-left"></i></a>
	@else
		<a class="btn btn-link btn-xs" href="{{ route('index.draft.akta') }}"><i class="fa fa-chevron-left"></i></a>
	@endif
	Draft Akta
@endpush

@push('action')
	@if (Request::route()->getName()=='edit.draft.akta')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.draft.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('update.draft.akta', ['id' => $info['id']]) }}" role="button">Simpan</a>
	@else
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('store.draft.akta') }}" role="button">Simpan</a>
	@endif
@endpush

@section('left')
	@include('widgets.list-draft-akta')
@endsection

@section('right')
	<div id="wizard" class="info-wizard text-center">
		<div class="">
			<ul class="nav nav-pills">
				<li class="nav-item m-r-xl">
					<a href="#" class="nav-link button-previous"><i class="fa fa-angle-left"></i> &nbsp;&nbsp; Sebelumnya</a>
				</li>
				<li class="nav-item">
					<a href="#draft-periphal" class="nav-link" data-toggle="tab">Langkah 1</a>
				</li>
				<li class="nav-item">
					<a href="#draft-dokumen" class="nav-link" data-toggle="tab">Langkah 2</a>
				</li>
				<li class="nav-item">
					<a href="#draft-preview" class="nav-link" data-toggle="tab">Langkah 3</a>
				</li>
				<li class="nav-item m-l-xl">
					<a href="#" class="nav-link button-next">Berikutnya &nbsp;&nbsp; <i class="fa fa-angle-right"></i></a>
				</li>
			</ul>
		</div>
		<div class="tab-content text-left">
			<div class="tab-pane" id="draft-periphal">
				<div class="form">
					@include('components.input.component', [
						'component_id' 		=> 'input-draft-title',
						'component_data' 	=> $data['title'],
						'component_style' 	=> null,
						'component_debug'	=> true
					])
				</div>
			</div>
			<div class="tab-pane content-dokumen" id="draft-dokumen">
				<div class="panel panel-default page-draft center-block m-t-xl m-b-xl">
					<div class="form panel-body p-none">
						<?php
							$obj_comp_style = null;

							foreach ($data['content']['data'] as $key => $value) {
								if (array_first($data['content']['data']) == $value){
									$obj_comp_style[$key]	= [
																	'label' => '',
																	'class'	=> 'medium-editor editable p-none'
																];
								}else{
									$obj_comp_style[$key]	 =  [
																	'label' => '',
																	'class'	=> 'medium-editor editable m-t-m-xl p-none'
															];
								}
							}	
						?>

						@include('components.input.component', [
							'component_id' 		=> 'input-draft-content',
							'component_data' 	=> $data['content'],
							'component_style' 	=> $obj_comp_style,
							'component_debug'	=> true
						])
					</div>
				</div>
			</div>
			<div class="tab-pane content-dokumen" id="draft-preview">
				<div class="panel panel-default page-draft center-block m-t-xl m-b-xl">
					<div class="form panel-body p-none">
						@foreach ($data['content']['data'] as $k => $v)
							@foreach ($data['content']['header'] as $k2 => $v2 )
								{!! ($k == $v2) ? $data['content']['data'][$v2]['element-properties']['value'] : '' !!}
							@endforeach
							<br/><br/>
						@endforeach
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection

@push('scripts')
	<script>
		$(document).ready( function() {
			$('#wizard').bootstrapWizard({
				'nextSelector': '.button-next', 
				'previousSelector': '.button-previous',
				'onTabShow': function (tab, navigation, index) {
					console.log(tab.context);
				}
			});

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
					buttons: ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'orderedlist', 'unorderedlist', 'addInput',
						{
							name: 'h4',
							contentFA: '<i class="fa fa-header"></i>',
						},
						'uppercase'
					]
				},
				placeholder: {
					text: 'Tulis disini...',
					hideOnClick: true
				},
				buttonLabels: 'fontawesome',
				paste: {
					cleanPastedHTML: true
				},
				extensions: {
					'highlighter': new HighlighterButton(),
					'addInput': new MediumButton({
						label: '%input%', 
						action: function (html, mark, parent) {
							temp = html;
							return html.replace(temp, temp + ' %input% ');
						}
					}),
					'uppercase': new MediumButton({
						label: 'uppercase', 
						action: function (html, mark, parent) {
							temp = html;
							return html.replace(temp, '<span class="text-uppercase">' + temp + '</span>');
						}
					}),
				}
			});

			var triggerAutoSave = function (event, editable) {
				// event auto save
			};

			var throttledAutoSave = MediumEditor.util.throttle(triggerAutoSave, 1000);
			editor.subscribe('editableInput', throttledAutoSave);
		});

		$('.content-dokumen').addClass('bg-grey-light');
	</script>
@endpush
