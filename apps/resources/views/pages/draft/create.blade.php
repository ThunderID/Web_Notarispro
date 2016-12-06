@extends('layouts.centered')

@section('nav-draft')
	active
@endsection

@push('title')
	@if (Request::route()->getName()=='edit.draft.akta')
		<a class="btn btn-link btn-xs" href="{{ route('show.draft.akta', ['id' => $data['info']['id']]) }}"><i class="fa fa-chevron-left"></i></a>
	@else
		<a class="btn btn-link btn-xs" href="{{ route('index.draft.akta') }}"><i class="fa fa-chevron-left"></i></a>
	@endif
	Draft Akta
@endpush

@push('action')
	@if (Request::route()->getName()=='edit.draft.akta')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.draft.akta', ['id' => $data['info']['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('update.draft.akta', ['id' => $data['info']['id']]) }}" role="button">Simpan</a>
	@else
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('store.draft.akta') }}" role="button">Simpan</a>
	@endif
@endpush

@section('center')
	<p class="text-center">
		@include('components.thunderComponent', [
			'components'	=> $data,
			'styles'		=> []
		])
	</p>
@endsection
