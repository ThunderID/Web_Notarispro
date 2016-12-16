@include('components.table.module.paginator')

<?php
	/*

	//-- component styling parameter ------//

	$component_style => [
		'class' 	=> list of component class (class for css, js, or binding) in string. (ie: 'form-control text-red' ) 
		'noDataMsg' => string of message if no data can be displayed (ie: no data available)
		'paging'	=> 	[
							'total_data' => number of total data from database. This is required.
							'take' 		 => nulmber of data taken per page. This is required.
							'class'		 => pagging class (class for css, js, or binding) in string. (ie: 'form-control text-red' ) 
						]
	]

	*/

	// component
	$c_id		= isset($component_id) ? $component_id : null;

	// styling
	$ui_t_class 		= isset($component_style['class']) ? $component_style['class'] : 'table-bordered table-hover';

	$ui_msg 			= isset($component_style['noDataMsg']) ? $component_style['noDataMsg'] : 'No Data';


	// validation
	$component_errors 	= [];

	if($component_debug == true){
		if(is_null($c_id) || is_array($c_id)){
			array_push($component_errors, "Component_id harus di-isi dan bukan dalam format array");
		}

		if(is_array($ui_t_class)){
			array_push($component_errors, "Class parameter must not be array");
		}
		if(is_array($ui_msg)){
			array_push($component_errors, "Paging class parameter must not be array");
		}			
	}	

	// paginate
	if(isset($component_style['paging'])){

		//validation
		if($component_debug == true){
			if(!isset($component_style['paging']['total_data'])){
				array_push($component_errors, "Paging total data parameter has no value");
			}
			if(!isset($component_style['paging']['take'])){
				array_push($component_errors, "Paging take parameter has no value");
			}	
			if(isset($component_style['paging']['class'])){
				if(is_array($component_style['paging']['class'])){
					array_push($component_errors, "Paging class parameter must not be array");
				}	
			}
		}


		if(count($component_errors) == 0){
			// generatePaginator parameter : data count , take
			$ui_paging 	= generatePaginator(
								$component_style['paging']['total_data'],
								$component_style['paging']['take']
							);
		}
	}	
?>

<!-- components error checking -->
@if(count($component_errors) != 0)
	<div class="col-md-12">
		<div class="alert alert-danger">
			<H4>Error on : Table Component</H4>
			@foreach($component_errors as $key => $error)
				<p>{{ $key+1 . '. ' .$error }}</p>
			@endforeach
		</div>
	</div>

	<?php
		//break operation 
		return false; 
	?>
@endif

<!-- components code -->
<table id="{{ $c_id }}" class="table {{ $ui_t_class }}">
	<thead>
		<tr>
			@foreach($component_data['header'] as $header)
				<th class="col_{{$header}}">{{ str_replace('_', ' ', $header) }}</th>
			@endforeach
		</tr>
	</thead>
	<tbody>
		@forelse ($component_data['data'] as $key => $data)
			<tr id="{{ $c_id . '_' . $key}}" data-id="{{ $data['id'] }}">
				@foreach($component_data['header'] as $header)
					<td class="col_{{$header}}">{{ $data[$header] }}</td>
				@endforeach
			</tr>
		@empty
			<tr>
				<td colspan="{{ count($data['header']) }}" style="text-align: center;">
					{{ $ui_msg }}
				</td>
			</tr>
		@endforelse
	</tbody>
</table>

@if(isset($component_style['paging']))
	<div class="row">
		<div class="col-md-12 {{ $component_style['paging']['class'] }}">
			{!! $ui_paging->render() !!}
		</div>
	</div>
@endif