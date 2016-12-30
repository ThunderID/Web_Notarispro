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
		<a class="btn btn-link p-t-lg p-b-lg" href="{{ route('issue.draft.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-lg p-b-lg btn-form" href="{{ route('update.draft.akta', ['id' => $info['id']]) }}" role="button">Simpan</a>
	@else
		<a class="btn btn-link p-t-lg p-b-lg btn-form" href="{{ route('store.draft.akta') }}" role="button">Simpan</a>
	@endif
@endpush

@section('left')
	<div class="m-t-xl">
		@include('widgets.list-draft-akta')
	</div>
@endsection

@section('right')
	{!! Form::open(['url' => '#', 'class' => 'form-draft']) !!}
		<div id="wizard" class="info-wizard text-center">
			<div class="p-b-sm">
				<ul class="nav nav-pills inline-block">
					<li class="nav-item m-r-xl">
						<a href="#" class="nav-link button-previous">Sebelumnya &nbsp;&nbsp; <i class="fa fa-angle-left"></i></a>
					</li>
					<li class="nav-item">
						<a href="#draft-periphal" class="nav-link" data-toggle="tab">Langkah 1</a>
					</li>
					<li class="nav-item">
						<a href="#draft-preview" class="nav-link" data-toggle="tab">Langkah 2</a>
					</li>
					<li class="nav-item">
						<a href="#draft-dokumen" class="nav-link" data-toggle="tab">Langkah 3</a>
					</li>
					<li class="nav-item m-l-xl">
						<a href="#draft-dokumen" class="nav-link button-next">Berikutnya &nbsp;&nbsp; <i class="fa fa-angle-right"></i></a>
					</li>
				</ul>
			</div>
			<div class="tab-content text-left m-t-sm">
				<div class="tab-pane" id="draft-periphal">
					<div class="form">
						@if (Route::is('create.draft.akta'))
							@include('components.input.component', [
								'component_id' 		=> 'input-draft-type',
								'component_data' 	=> $data['type'],
								'component_style' 	=> [
									'type'		=> [
										'label'		=> 'jenis template',
										'class'		=> 'select-template input-draft-type'
									]
								],
								'component_debug'	=> true
							])
						@endif

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
				</div>
				<div class="tab-pane bg-grey-light" id="draft-preview">
					<div class="panel panel-default page-draft center-block">
						<div class="form panel-body margin-standard p-none draft-template">
							silahkan pilih template terlebih dahulu
						</div>
					</div>
					<!-- <a href="#" class="nav-link button-previous"><i class="fa fa-angle-left"></i> &nbsp;&nbsp; Sebelumnya</a> -->
					<!-- <a href="#" class="nav-link button-next">Berikutnya &nbsp;&nbsp; <i class="fa fa-angle-right"></i></a> -->
				</div>
				<div class="tab-pane bg-grey-light" id="draft-dokumen">
					<div class="m-t-md">
						<div class="panel panel-default page-draft center-block">
							<div class="form panel-body margin-standard p-none">
								silahkan pilih template terlebih dahulu
							</div>
						</div>
					</div>
					<!-- <a href="#" class="nav-link button-previous"><i class="fa fa-angle-left"></i> &nbsp;&nbsp; Sebelumnya</a> -->
					<!-- <a href="#" class="nav-link button-next">Berikutnya &nbsp;&nbsp; <i class="fa fa-angle-right"></i></a> -->
				</div>
				
				<div class="clearfix">&nbsp;</div>
				<div class="form-group">
					<a href="#" class="btn btn-primary btn-md pull-left merge-title button-previous"><i class="fa fa-angle-left"></i> &nbsp;&nbsp; Sebelumnya</a>
					<a href="#" class="btn btn-primary btn-md pull-right merge-title button-next">Berikutnya &nbsp;&nbsp; <i class="fa fa-angle-right"></i></a>
				</div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	{!! Form::close() !!}
@endsection

@push('scripts')
	<script>
		urlAutoSave = "{{ route('automatic.store.akta') }}";
		formAutoSave = $('.form-template');
		loading.init();
		mediumEditor.init(urlAutoSave, formAutoSave);
		submitToForm.init();

		$(document).ready( function() {
			$('#wizard').bootstrapWizard({
				'nextSelector': '.button-next', 
				'previousSelector': '.button-previous',
				'onTabShow': function (tab, navigation, index) {
				}
			});

		$('.content-dokumen').addClass('bg-grey-light');


		$('.input-draft-type').change( function() {
			title = $('.input-draft-title');
			typeSelected = $(this).find('option:selected');
			
			title.val(typeSelected.text().trim());
			title.focus();
		});
	</script>
@endpush
