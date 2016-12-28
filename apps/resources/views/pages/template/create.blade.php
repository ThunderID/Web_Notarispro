@extends('layouts.centered')

@section('nav-template')
	active
@endsection

@push('title')
	@if (Request::route()->getName()=='edit.template.akta')
		<a class="btn btn-link btn-xs" href="{{ route('show.template.akta', ['id' => $info['id']]) }}"><i class="fa fa-chevron-left"></i></a>
	@else
		<a class="btn btn-link btn-xs" href="{{ route('index.template.akta') }}"><i class="fa fa-chevron-left"></i></a>
	@endif
	Buat Template Baru
@endpush

@push('action')
	@if (Request::route()->getName() == 'edit.template.akta')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.template.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none btn-form" data-href="{{ route('update.template.akta', ['id' => $info['id']]) }}" data-form="form-template" data-method="put" role="button">Simpan</a>
	@else
		<a class="btn btn-link p-t-none p-b-none btn-form" data-href="{{ route('store.template.akta') }}" data-form="form-template" data-method="post" role="button">Simpan</a>
	@endif
@endpush

@section('center')
	{!! Form::open(['url' => '#', 'class' => 'form-template']) !!}
		<!-- form input title -->
		<div class="form">
			@include('components.input.component', [
				'component_id' 		=> 'input-draft-title',
				'component_data' 	=> $data['title'],
				'component_style' 	=> [
					'title'		=> [
						'class'		=> 'input-draft-title'
					]
				],
				'component_debug'	=> true
			])
		</div>

		<!-- custom form text area plugin medium-editor use like page office  -->
		<div class="form">
			<div class="form-group m-b-none">
				<label for="">Isi Dokumen</label>
			</div>
		</div>
		<div class="page-panel p-sm">
			<div class="panel panel-default page-draft center-block">
				<div class="form panel-body margin-standard">
					<?php
						$obj_comp_style = null;

						// rechange content dokumen and add class medium-editor into variable data 'content'
						if (!empty($data['content']['data'])) {
							foreach ($data['content']['data'] as $key => $value) {
								if (array_first($data['content']['data']) == $value){
									$obj_comp_style[$key]	= [
																	'label' => '',
																	'class'	=> 'medium-editor editable m-t-sm'
																];
								}else{
									$obj_comp_style[$key]	 =  [
																	'label' => '',
																	'class'	=> 'medium-editor editable m-t-m-sm p-none'
															];
								}
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
	{!! Form::close() !!}
@endsection

@push('scripts')
	<script>
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
				'addInput': new MediumButton({
					label: '%%input', 
					action: function (html, mark, parent) {
						temp = html;
						return html.replace(temp, temp + ' %%input ');
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

		$('.page-panel').addClass('bg-grey-light');

		submitToForm.init();
	</script>
@endpush
