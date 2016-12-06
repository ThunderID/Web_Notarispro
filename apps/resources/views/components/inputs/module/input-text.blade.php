<?php
	// init component

	// UI
	$ui_label 		= isset($style['label']) ? $style['label'] : str_replace("_", " ", $data['name']);
	$ui_class 		= isset($style['class']) ? $style['class'] : '';
	$ui_placeholder = isset($style['placeholder']) ? $style['placeholder'] : '';
	$ui_default 	= isset($style['default']) ? $style['default'] : true;
	$ui_row 		= isset($style['attr']['row']) ? $style['attr']['row'] : '3';
?>

<div class="form-group">
	<label 
		for="{{ $data['name'] }}"
		class="thunder_input_label"
	>
		{{ $ui_label }}
	</label>
	<textarea 
		id="{{ 'thunder_input_text_' . $data['name'] .'_'. $index }}" 
		name="{{ $data['name'] }}" 
		class="form-control thunder_input $ui_class" 
		placeholder="{{ $ui_placeholder }}"
		rows="{{ $ui_row }}"
	>{{ $data['value'] }}</textarea>
</div>
