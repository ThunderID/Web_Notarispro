<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Response;

class TemplateAktaController extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	
	public function __construct()
	{
		parent::__construct();
		$this->token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRmMWcyM2ExMmFhIn0.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLmNvbSIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUub3JnIiwianRpIjoiNGYxZzIzYTEyYWEiLCJpYXQiOjE0ODA5MDcwNTgsIm5iZiI6MTQ4MDkwNzExOCwiZXhwIjoxNDgwOTEwNjU4LCJwaWQiOiJwaWQiLCJvaWQiOiJvaWQiLCJwbmFtZSI6InBuYW1lIiwib25hbWUiOiJvbmFtZSIsInJvbGUiOiJkcmFmdGVyIn0.CIjsWNryRNH7j2EGSWsZuAgPGuva1thc_UtHi-33pqyXlov07d-DGFNDw69mquXz1GxyCRjjkRnKHb3hOCMwWopdBZ1O1SM35u-9y2FrDLGWapHdXJjaTc1Qexzhs9lwDwGTrryZ1NQ0iARyS4ghpujIhtTs9R0254fpTviVoaA";
	}

	public function index()
	{
		$this->curl_get('lihat/list/template/akta', $this->token);

		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		return view('pages.template.index', compact('data', 'info'));
	}

	public function create($id = '123456789')
	{
		$this->curl_get('mulai/template/akta', $this->token, ['id' => $id]);

		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		return view('pages.template.create', compact('data', 'info'));
	}

	public function store($id = null)
	{
		$param 	= Input::all();

		// replace index paragraph to array
		foreach ($param as $k => $v) 
		{
			if ($k == 'paragraph')
			{
				$pattern = "/^<h4.*?>(.*?)<\/h4>|<p.*?>(.*?)<\/p>|<li.*?>(.*?)<\/li>/i";
				preg_match_all($pattern, $v[0], $out, PREG_PATTERN_ORDER);
				// $out = $this->multiexplode(['</h4>', '</p>', '</li>'], $v[0]);

				foreach ($out[0] as $k2 => $v2) 
				{
					$i = 1;
					if (strpos($v2, '<li>') !== false) {
						$temp_k = $k2;
						$i = $i + 1;

					}
				}

				$temp_paragraph[$k] = $out[0];
			}
			else 
			{
				$temp_paragraph[$k] = $v;
			}
		}

		// set temp paragraph to variable param
		// $param = $temp_paragraph;

		$this->curl_post('simpan/template/akta', $this->token, $param);
		
		$data 		= $this->data;

		return Redirect::route('show.template.akta', $id);
	}

	// function multiexplode ($delimiters, $string) {

	//     $ready = str_replace($delimiters, $delimiters[0], $string);
	//     $launch = explode($delimiters[0], $ready);
	//     dd($ready);
	//     return  $launch;
	// }

	public function show($id)
	{
		$this->curl_get('lihat/isi/template/akta', $this->token, ['id' => $id]);
		
		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		return view('pages.template.show', compact('data', 'info'));
	}

	public function edit($id)
	{
		$param 	= array_merge(['id' => $id], Input::all());

		$this->curl_get('edit/isi/template/akta', $this->token, $param);
		
		$status		= $this->status;
		$data 		= $this->data;
		$info 		= $this->info;

		return view('pages.template.create', compact('data', 'info'));
	}

	public function update($id)
	{
		return $this->store($id);
	}

	public function destroy($id)
	{
		$this->curl_delete('hapus/template/akta', $this->token, ['id' => $id]);
		
		$data 		= $this->data;

		return Redirect::route('index.template.akta');
	}

	public function issue($id)
	{
		$this->curl_post('issue/template', $this->token, ['id' => $id]);
		
		$data 		= $this->data;

		return Redirect::route('index.template.akta');
	}

	public function get_template()
	{
		$id = Input::get('id');
		$this->curl_get('lihat/isi/template/akta', $this->token, ['id' => $id]);
		
		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		return Response::json(['template' => $data], 200);
	}
}
