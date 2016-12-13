@extends('layouts.major_right')

@section('nav-template')
	active
@endsection

@push('title')
	Template Akta
@endpush

@push('action')
	<a class="btn btn-link p-t-none p-b-none" href="{{route('create.template.akta')}}" role="button">Template Baru</a>
@endpush

@section('left')
	@include('widgets.filter')
@endsection

@section('right')
	@foreach($data['data'] as $key => $value)
		<p class="text-center">
			{{json_encode($value)}}
		</p>
		<p class="text-center">
			<a class="btn btn-primary" href="{{route('destroy.template.akta', ['id' => $value['id']])}}" role="button">Hapus</a>
			<a class="btn btn-primary" href="{{route('edit.template.akta', ['id' => $value['id']])}}" role="button">Ubah</a>
			<a class="btn btn-primary" href="{{route('show.template.akta', ['id' => $value['id']])}}" role="button">Lihat</a>
		</p>
	@endforeach
@endsection
