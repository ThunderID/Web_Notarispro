<?php 
	// dd($data); 
?>
<table class="table">
	<thead>
		<tr>
			<th>No</th>
			@foreach ($data['header'] as $k => $v)
				<th>{{ str_replace('_', ' ', $v) }}</th>
			@endforeach
			<th></th>
		</tr>
	</thead>
	<tbody>
		@foreach ($data['data'] as $k => $v)
			<tr>
				<td>{{ $k+1 }}</td>
				@foreach ($data['header'] as $k2 => $v2)
					<td>{{ $v[$v2] }}</td>
				@endforeach
				<td>
					<div class="dropdown">
					  <a class="dropdown-toggle" id="btn-action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					    Action
					    <i class="fa fa-angle-down"></i>
					  </a>
					  <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="btn-action">
					    <li><a href="{{ route($show, ['id' => $v['id']]) }}">Lihat</a></li>
					    <li><a href="{{ route($edit, ['id' => $v['id']]) }}">Edit</a></li>
					    <li><a href="{{ route($delete, ['id' => $v['id']]) }}">Hapus</a></li>
					  </ul>
					</div>
				</td>
			</tr>
		@endforeach
	</tbody>
</table>