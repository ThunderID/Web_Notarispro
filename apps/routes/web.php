<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'RootController@index')->name('root');

Route::resource('/draft/akta', 	'DraftAktaController', 
	['names' 	=> 	[
    					'index' 	=> 'index.draft.akta',
    					'create' 	=> 'create.draft.akta',
    					'store' 	=> 'store.draft.akta',
    					'show' 		=> 'show.draft.akta',
    					'edit'	 	=> 'edit.draft.akta',
    					'update' 	=> 'update.draft.akta',
    					'destroy' 	=> 'destroy.draft.akta',
					]
	]
);
Route::post('/draft/akta/{id}/issue',	  'DraftAktaController@issue')->name('issue.draft.akta');

Route::resource('/template/akta',  'TemplateAktaController', 
    ['names'    =>  [
                        'index'     => 'index.template.akta',
                        'create'    => 'create.template.akta',
                        'store'     => 'store.template.akta',
                        'show'      => 'show.template.akta',
                        'edit'      => 'edit.template.akta',
                        'update'    => 'update.template.akta',
                        'destroy'   => 'destroy.template.akta',
                    ]
    ]
);
Route::post('/template/akta/{id}/issue',   'TemplateAktaController@index')->name('issue.template.akta');

