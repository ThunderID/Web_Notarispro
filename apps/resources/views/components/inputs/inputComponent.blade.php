<?php
	$style = null;
	if(isset($styles[$element['element-properties']['name']])){
		$style = $styles[$element['element-properties']['name']];
	}
?>

@if($element['element-type'] == 'string')
	@include('components.inputs.module.input-string', [
		"index" => $key, 
		"data" 	=> $element['element-properties'], 
		"style" => $style])
@elseif($element['element-type'] == 'email')
	@include('components.inputs.module.input-email', [
		"index" => $key, 
		"data" 	=> $element['element-properties'],
		"style" => $style])	
@elseif($element['element-type'] == 'hidden')
	@include('components.inputs.module.input-hidden', [
		"index" => $key, 
		"data" 	=> $element['element-properties'],
		"style" => null])		
@elseif($element['element-type'] == 'disabled')
	@include('components.inputs.module.input-disabled', [
		"index" => $key, 
		"data" 	=> $element['element-properties'],
		"style" => $style])		
@elseif($element['element-type'] == 'password')
	@include('components.inputs.module.input-password', [
		"index" => $key, 
		"data" 	=> $element['element-properties'],
		"style" => $style])		
@elseif($element['element-type'] == 'text')
	@include('components.inputs.module.input-text', [
		"index" => $key, 
		"data" 	=> $element['element-properties'],
		"style" => $style])
@elseif($element['element-type'] == 'date')
	@include('components.inputs.module.input-date', [
		"index" => $key, 
		"data" 	=> $element['element-properties'],
		"style" => $style])			
@else
	@include('components.inputs.module.input-string', [
		"index" => $key, 
		"data" 	=> $element['element-properties'], 
		"style" => $style])
@endif
