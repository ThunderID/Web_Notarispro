<?php namespace ThunderID\LockedPDF;

use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;
use Illuminate\Support\Facades\Route;

class ServiceProvider extends IlluminateServiceProvider 
{
	protected $defer = false;
	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->registerLockedPDF();
		$this->app->alias('lockedPDF', 'ThunderID\LockedPDF\LockedPDF');
	}
	/**
	 * Register locked pdf builder.
	 * @return
	 */
	protected function registerLockedPDF()
	{
		$this->app->singleton('lockedPDF', function($app)
		{
			return new LockedPDF($app['url']);
		});
	}
	/**
	     * Get the services provided by the provider.
	     *
	     * @return array
	     */
	    public function provides()
	    {
	        return array('lockedPDF', 'ThunderID\LockedPDF\LockedPDF');
	    }
}