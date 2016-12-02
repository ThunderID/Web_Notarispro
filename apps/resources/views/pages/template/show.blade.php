@extends('layouts.centered')

@section('nav-template')
	active
@endsection

@section('title')
	<h4>
		<small><a class="btn btn-primary btn-sm" href="{{route('index.template.akta')}}"><</a></small>
		Template Akta
	</h4>
@endsection

@section('action')
		<a class="btn btn-primary" href="{{route('issue.template.akta', ['id' => env('sandbox_id')])}}" role="button">Issue</a>
		<a class="btn btn-primary" href="{{route('edit.template.akta', ['id' => env('sandbox_id')])}}" role="button">Edit</a>
@endsection

@section('center')
	<p class="text-center">
		{{json_encode($data)}}
	</p>
@endsection
