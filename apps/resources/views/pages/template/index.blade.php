@extends('layouts.major_right')

@section('nav-template')
	active
@endsection

@section('title')
	<h4>Template Akta</h4>
@endsection

@section('action')
	<a class="btn btn-primary" href="{{route('create.template.akta')}}" role="button">Template Baru</a>
@endsection

@section('left')
	@include('components.filter')
@endsection

@section('right')
	@foreach($data as $key => $value)
		<p class="text-center">
				{{json_encode($value)}}
		</p>
		<p class="text-center">
			<a class="btn btn-primary" href="{{route('destroy.template.akta', ['id' => env('sandbox_id')])}}" role="button">Hapus</a>
			<a class="btn btn-primary" href="{{route('edit.template.akta', ['id' => env('sandbox_id')])}}" role="button">Ubah</a>
			<a class="btn btn-primary" href="{{route('show.template.akta', ['id' => env('sandbox_id')])}}" role="button">Lihat</a>
		</p>
	@endforeach
@endsection
