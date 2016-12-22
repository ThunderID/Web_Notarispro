@extends('layouts.major_right')

@section('nav-draft')
	active
@endsection

@push('title')
	<a class="btn btn-link btn-xs" href="{{ route('index.draft.akta') }}"><i class="fa fa-chevron-left"></i></a>
	Draft Akta
@endpush

@push('action')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.draft.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('edit.draft.akta', ['id' => $info['id']]) }}" role="button">Edit</a>
@endpush

@section('left')
	@include('widgets.list-draft-akta')
@endsection

@section('right')
	<div class="panel panel-default page-draft center-block m-t-xl m-b-xl">
		<div class="form panel-body">
			@foreach ($data['content']['data'] as $k => $v)
				@foreach ($data['content']['header'] as $k2 => $v2 )
					{!! (!empty($v[$v2])) ? $v[$v2] : '' !!}
				@endforeach
				<br/><br/>
			@endforeach
		</div>
	</div>
@endsection

@push('scripts')
	<script>
		$('.content-right').addClass('bg-grey-light');
	</script>
@endpush