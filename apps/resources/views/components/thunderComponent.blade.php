@foreach($components as $component)
	@foreach($component['elements'] as $key => $element)
		@if($element['element-class'] == 'input')
			@include('components.inputs.inputComponent')
		@endif
	@endforeach
@endforeach