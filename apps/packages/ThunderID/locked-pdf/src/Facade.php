<?php namespace ThunderID\LockedPDF;

use Illuminate\Support\Facades\Facade as IlluminateFacade;
/**
 * @see \LockedPDF\LockedPDF
 */
class Facade extends IlluminateFacade {
	/**
     * Get the registered name of the component.
     *
     * @return string
     */
	protected static function getFacadeAccessor() 
	{ 
		return 'lockedPDF'; 
	}
}