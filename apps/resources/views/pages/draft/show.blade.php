@extends('layouts.centered')

@section('nav-draft')
	active
@endsection

@section('title')
	<h4>
		<small><a class="btn btn-primary btn-sm" href="{{route('index.draft.akta')}}"><</a></small>
		Draft Akta
	</h4>
@endsection

@section('action')
		<a class="btn btn-primary" href="{{route('issue.draft.akta', ['id' => $data['fragment']['id']])}}" role="button">Issue</a>
		<a class="btn btn-primary" href="{{route('edit.draft.akta', ['id' => $data['fragment']['id']])}}" role="button">Edit</a>
@endsection

@section('center')
	<p class="text-center">
		{{json_encode($data)}}
	</p>
@endsection
