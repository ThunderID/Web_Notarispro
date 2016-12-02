@extends('layouts.major_right')

@section('nav-draft')
	active
@endsection

@section('title')
	<h4>Draft Akta</h4>
@endsection

@section('action')
	<a class="btn btn-primary" href="{{route('create.draft.akta')}}" role="button">Mulai Drafting</a>
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
			<a class="btn btn-primary" href="{{route('destroy.draft.akta', ['id' => env('sandbox_id')])}}" role="button">Hapus</a>
			<a class="btn btn-primary" href="{{route('edit.draft.akta', ['id' => env('sandbox_id')])}}" role="button">Ubah</a>
			<a class="btn btn-primary" href="{{route('show.draft.akta', ['id' => env('sandbox_id')])}}" role="button">Lihat</a>
		</p>
	@endforeach
@endsection
