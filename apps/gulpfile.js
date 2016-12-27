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
	mix.sass([
					'app.scss',
					'../../../node_modules/medium-editor/dist/css/medium-editor.css',
					'../../../node_modules/medium-editor/dist/css/themes/bootstrap.css',
					'../../../node_modules/selectize/dist/css/selectize.css',
					'../../../node_modules/selectize/dist/css/selectize.bootstrap3.css',], 'public/css/app.css')
		.scripts([
					'input-components.js',
					'jquery.bootstrap.wizard.js',
					'scripts/table/selector.js',
					'scripts/form/button/submit-to-form.js',
					], 'public/js/app.js')
		.copy('resources/assets/plugins/', 'public/plugins/')
		.version(['public/css/app.css', 'public/js/app.js']);
});
