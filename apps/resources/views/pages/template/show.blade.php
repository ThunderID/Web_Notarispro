@extends('layouts.centered')

@section('nav-template')
	active
@endsection

@push('title')
	<a class="btn btn-link btn-xs" href="{{ route('index.template.akta') }}"><i class="fa fa-chevron-left"></i></a>
	Template Akta
@endpush

@push('action')
		<a class="btn btn-primary" href="{{route('issue.template.akta', ['id' => $info['id']])}}" role="button">Issue</a>
		<a class="btn btn-primary" href="{{route('edit.template.akta', ['id' => $info['id']])}}" role="button">Edit</a>

		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.template.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('edit.template.akta', ['id' => $info['id']]) }}" role="button">Edit</a>
@endpush

@section('center')
	<p class="text-center">
		{{json_encode($data)}}
	</p>
@endsection
