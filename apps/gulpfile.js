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
					'../../../node_modules/editor/dist/css/medium-editor.css',
					'../../../node_modules/editor/dist/css/themes/bootstrap.css',
					'../../../node_modules/selectize/dist/css/selectize.css',
					'../../../node_modules/selectize/dist/css/selectize.bootstrap3.css',
					'../../../node_modules/app-loading/app-loading.min.css',
					], 'public/css/app.css')
		.scripts([
					'input-components.js',
					'jquery.bootstrap.wizard.js',
					'../../../node_modules/app-loading/app-loading.min.js',
					'scripts/table/selector.js',
					'scripts/form/button/submit-to-form.js',
					'scripts/form/editor/auto-save.js',
					'scripts/form/editor/add-new-item-toolbar.js',
					'scripts/form/editor/medium-editor.js',
					'scripts/form/add-event-click.js',
					'scripts/animation/loading.js',
					], 'public/js/app.js')
		.copy('resources/assets/plugins/', 'public/plugins/')
		.copy('resources/assets/images/', 'public/build/images/')
		.version(['public/css/app.css', 'public/js/app.js']);
});
