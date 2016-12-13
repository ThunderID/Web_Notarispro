@extends('layouts.centered')

@section('nav-draft')
	active
@endsection

@push('title')
	<a class="btn btn-link btn-xs" href="{{ route('index.draft.akta') }}"><i class="fa fa-chevron-left"></i></a>
	Draft Akta
@endpush

@push('action')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.draft.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('edit.draft.akta', ['id' => $info['id']]) }}" role="button">Edit</a>
@endpush

@section('center')
	<p class="text-center">
		{{json_encode($data)}}
	</p>
@endsection
