@extends('layouts.centered')

@section('nav-dashboard')
	active
@endsection

@push('title')
	Dashboard
@endpush

@section('center')
	<h1 class="text-center">Constructing</h1>
	
	<div class="summernote"></div>
	<script>
		$('.summernote').summernote({
		  airMode: true
		});
	</script>
@endsection