@extends('layouts.major_right')

@section('nav-draft')
	active
@endsection

@push('title')
	Draft Akta
@endpush

@push('action')
	<a class="btn btn-link p-t-none p-b-none" href="{{ route('create.draft.akta') }}">MULAI DRAFTING</a>
@endpush

@section('left')
	@include('widgets.filter-akta')
@endsection

@section('right')
	@include('components.table.component', [
		'component_id'		=> 'table-akta',
	    'component_data' 	=> $data,
	    'component_style'	=> [
	        'class' 	=> 'table-hover table-akta', 
	        'noDataMsg' => 'Belum ada akta, silahkan tambah akta',
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
		tableSelector.init('table-akta', '{{ route("index.draft.akta") }}');
	</script>
@endpush
