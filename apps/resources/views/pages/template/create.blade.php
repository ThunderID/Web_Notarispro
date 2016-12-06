@extends('layouts.centered')

@section('nav-template')
	active
@endsection

@push('title')
	@if (Request::route()->getName()=='edit.template.akta')
		<a class="btn btn-link btn-xs" href="{{ route('show.template.akta', ['id' => $data['info']['id']]) }}"><i class="fa fa-chevron-left"></i></a>
	@else
		<a class="btn btn-link btn-xs" href="{{ route('index.template.akta') }}"><i class="fa fa-chevron-left"></i></a>
	@endif
	Template Akta
@endpush

@push('action')
	@if (Request::route()->getName()=='edit.template.akta')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.template.akta', ['id' => $data['info']['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('update.template.akta', ['id' => $data['info']['id']]) }}" role="button">Simpan</a>
	@else
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('store.template.akta') }}" role="button">Simpan</a>
	@endif
@endpush

@section('center')
	<p class="text-center">
		{{json_encode($data)}}
	</p>
@endsection
