const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
	mix.sass('app.scss')
		.scripts([
					'../../../node_modules/jquery/dist/jquery.js',
					'../../../node_modules/jquery-validation/dist/jquery.validate.js',
					'../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
					'../../../node_modules/rangy/lib/rangy-core.js',
					'../../../node_modules/rangy/lib/rangy-classapplier.js',
					'../../../node_modules/medium-editor/dist/medium-editor.js',
					'scripts/table/selector.js',
					'jquery.bootstrap.wizard.js',
					'input-components.js'], 'public/js/app.js')
		.copy('resources/assets/plugins/', 'public/plugins/');
});
