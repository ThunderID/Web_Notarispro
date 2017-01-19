<?php namespace ThunderID\ParagraphDotLine;

use Illuminate\Support\Facades\Facade;
/**
 * @see \ParagraphDotLine\ParagraphDotLine
 */
class ParagraphDotLine extends Facade {
	/**
     * Get the registered name of the component.
     *
     * @return string
     */
	protected static function getFacadeAccessor() 
	{ 
		return 'ParagraphDotLine'; 
	}
}