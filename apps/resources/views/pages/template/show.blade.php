@extends('layouts.centered')

@section('nav-template')
	active
@endsection

@push('title')
	<a class="btn btn-link btn-xs" href="{{ route('index.template.akta') }}"><i class="fa fa-chevron-left"></i></a>
	{{ $data['title']['data']['title'] }}
@endpush

@push('action')
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('issue.template.akta', ['id' => $info['id']]) }}" role="button">Issue</a>
		<a class="btn btn-link p-t-none p-b-none" href="{{ route('edit.template.akta', ['id' => $info['id']]) }}" role="button">Edit</a>
@endpush

@section('center')
	<div class="panel panel-default page-draft center-block">
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
		$('body').addClass('bg-grey-light');
	</script>
@endpush
