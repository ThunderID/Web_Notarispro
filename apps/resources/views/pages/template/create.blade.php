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
		<a class="btn btn-link p-t-lg p-b-lg" href="{{ route('issue.template.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-lg p-b-lg btn-form" data-href="{{ route('update.template.akta', ['id' => $info['id']]) }}" data-form="form-template" data-method="put" role="button">Simpan</a>
	@else
		<a class="btn btn-link p-t-lg p-b-lg btn-form" data-href="{{ route('store.template.akta') }}" data-form="form-template" data-method="post" role="button">Simpan</a>
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
						'class'		=> 'input-draft-title input-data'
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
		<div class="page-panel bg-grey-light p-sm">
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
																	'class'	=> 'medium-editor editable m-t-sm input-data'
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

	<!-- Button trigger modal -->
	{{-- <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target=".modal">
		Launch demo modal
	</button> --}}

	@include('widgets.modal')
@endsection

@push('scripts')
	<script>
		urlAutoSave = "{{ route('automatic.store.template') }}";
		formAutoSave = $('.form-template');
		loading.init();
		mediumEditor.init(urlAutoSave, formAutoSave);
		submitToForm.init();

	</script>
@endpush
