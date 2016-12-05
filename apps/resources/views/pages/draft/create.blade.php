@extends('layouts.centered')

@section('nav-draft')
	active
@endsection

@section('title')
	<h4>
		@if(Request::route()->getName()=='edit.draft.akta')
			<small><a class="btn btn-primary btn-sm" href="{{route('show.draft.akta', ['id' => $data['info']['id']])}}"><</a></small>
		@else
			<small><a class="btn btn-primary btn-sm" href="{{route('index.draft.akta')}}"><</a></small>
		@endif
		Draft Akta
	</h4>
@endsection

@section('action')
	@if(Request::route()->getName()=='edit.draft.akta')
		<a class="btn btn-primary" href="{{route('issue.draft.akta', ['id' => $data['info']['id']])}}" role="button">Issue</a>
		<a class="btn btn-primary" href="{{route('update.draft.akta', ['id' => $data['info']['id']])}}" role="button">Simpan</a>
	@else
		<a class="btn btn-primary" href="{{route('store.draft.akta')}}" role="button">Simpan</a>
	@endif
@endsection

@section('center')
	<p class="text-center">
		{{json_encode($data)}}
	</p>
@endsection
