<?php
	// init component

	//visibility
	if(isset($data['visible']) && $data['visible'] == false){
		return false;
	}

	// UI
	$ui_label 		= isset($style['label']) ? $style['label'] : str_replace("_", " ", $data['name']);
	$ui_class 		= isset($style['class']) ? $style['class'] : '';
	$ui_placeholder = isset($style['placeholder']) ? $style['placeholder'] : '';
	$ui_default 	= isset($style['default']) ? $style['default'] : true;
?>

<div class="form-group">
	<label 
		for="{{ $data['name'] }}"
		class="thunder_input_label"
	>
		{{ $ui_label }}
	</label>
	<input 
		id="{{ 'thunder_input_number_' . $data['name'] .'_'. $index }}" 
		name="{{ $data['name'] }}" 
		value="{{ $data['value'] }}" 
		class="form-control thunder_input $ui_class" 
		placeholder="{{ $ui_placeholder }}"
		type="number" 
	>
</div>
