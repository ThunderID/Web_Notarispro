@extends('layouts.major_right')

@section('nav-template')
	active
@endsection

@push('title')
	Template Akta
@endpush

@push('action')
	<a class="btn btn-link p-t-none p-b-none" href="{{ route('create.template.akta') }}" role="button">Template Baru</a>
@endpush

@section('left')
	@include('widgets.filter-template')
@endsection

@section('right')
	@include('components.table.component', [
		'component_id'		=> 'table-template',
	    'component_data' 	=> $data,
	    'component_style'	=> [
	        'class' 	=> 'table-hover table-template', 
	        'noDataMsg' => 'Belum ada template, silahkan tambah template',
	        'paging'    =>  [
	            'total_data' => $info['total_data'],
	            'take'       => $info['pagination']['per_page'],
	            'class'      => 'text-center'
	        ]
	    ],
	    'component_debug'=> true
	])
	
	<div class="clearfix">&nbsp;</div>
	<div class="clearfix">&nbsp;</div>
@endsection

@push('scripts')
	<script>
		url = "{{ route('index.template.akta') }}";
		tableSelector.init(url);
	</script>
@endpush