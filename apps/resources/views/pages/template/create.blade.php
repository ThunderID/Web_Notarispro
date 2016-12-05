@extends('layouts.centered')

@section('nav-template')
	active
@endsection

@section('title')
	<h4>
		@if(Request::route()->getName()=='edit.template.akta')
			<small><a class="btn btn-primary btn-sm" href="{{route('show.template.akta', ['id' => $data['info']['id']])}}"><</a></small>
		@else
			<small><a class="btn btn-primary btn-sm" href="{{route('index.template.akta')}}"><</a></small>
		@endif
		Template Akta
	</h4>
@endsection

@section('action')
	@if(Request::route()->getName()=='edit.template.akta')
		<a class="btn btn-primary" href="{{route('issue.template.akta', ['id' => $data['info']['id']])}}" role="button">Issue</a>
		<a class="btn btn-primary" href="{{route('update.template.akta', ['id' => $data['info']['id']])}}" role="button">Simpan</a>
	@else
		<a class="btn btn-primary" href="{{route('store.template.akta')}}" role="button">Simpan</a>
	@endif
@endsection

@section('center')
	<p class="text-center">
		{{json_encode($data)}}
	</p>
@endsection
