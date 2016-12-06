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
	@include('widgets.filter')
@endsection

@section('right')
	<table class="table">
		<tr>
			<th>ID</th>
			<th>Title</th>
			<th>Writer ID</th>
			<th>Owner ID</th>
			<th>Owner Name</th>
			<th>Created At</th>
			<th>Updated At</th>
		</tr>
		@foreach($data as $k => $v)
			<tr>
				<td>1</td>
			</tr>
			 
		@endforeach
	</table>
@endsection
