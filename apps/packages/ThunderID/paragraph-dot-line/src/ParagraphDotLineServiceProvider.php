<?php namespace ThunderID\ParagraphDotLine;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class ParagraphDotLineServiceProvider extends ServiceProvider
{
	protected $defer = false;
	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->publishes([ __DIR__ .'/../assets' => public_path('thunderid/paragraph-dot-line')], 'paragraphdotline');
		$this->registerParagraphDotLineBuilder();
		$this->app->alias('paragraphdotline', 'ThunderID\ParagraphDotLine\ParagraphDotLineBuilder');
	}
	/**
	 * Register paragraph dot line builder.
	 * @return
	 */
	protected function registerParagraphDotLineBuilder()
	{
		$this->app->singleton('paragraphdotline', function($app)
		{
			return new ParagraphDotLineBuilder($app['url']);
		});
	}
	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return ['paragraphdotline', 'ThunderID\ParagraphDotLine\ParagraphDotLineBuilder'];
	}
}
