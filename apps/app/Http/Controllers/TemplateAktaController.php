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

		// remove data 'content' example paragraph
		$data['content']['data']['paragraph[0]']['element-properties']['value'] = null;

		return view('pages.template.create', compact('data', 'info'));
	}

	public function store($id = null)
	{
		$param 	= empty($id) ? Input::all() : array_merge(['id' => $id], Input::all());

		// replace index paragraph to array
		foreach ($param as $k => $v) 
		{
			// check key index like 'paragraph'
			if (strpos($k, 'paragraph') !== false)
			{
				// check pattern with tag html h4, p, ol & li
				$pattern = "/<h4.*?>(.*?)<\/h4>|<p.*?>(.*?)<\/p>|(<(ol|ul).*?><li>(.*?)<\/li>)|(<li>(.*?)<\/li><\/(ol|ul)>)/i";
				preg_match_all($pattern, $v[0], $out, PREG_PATTERN_ORDER);

				// change key index like 'paragraph[*]'
				foreach ($out[0] as $k2 => $v2) 
				{
					$temp_paragraph[$k.'['. $k2 .']'] = $v2;
				}
			}
			// array key index none 'paragraph'
			else 
			{
				$temp_paragraph[$k] = $v;
			}
		}
		// set temp paragraph to variable param
		$param 		= $temp_paragraph;

		$this->curl_post('simpan/template/akta', $this->token, $param);
		
		$data 		= $this->data;

		return Redirect::route('show.template.akta', $id);
	}

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
		
		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		$temp_paragraph = '';

		// merged paragraph per array to 1 paragraph array value
		foreach ($data['content']['data'] as $k => $v) 
		{
			$temp_paragraph 		= $temp_paragraph . $v['element-properties']['value'];
		}

		// rechange data 'header' to paragraph[0] (1 paragraph)
		$temp_header[]				= 'paragraph[0]';
		// reachange data 'data' to merged paragraph
		$temp_data['paragraph[0]'] 	= [
										'element-class'	=> 'input',
										'element-type'	=> 'text',
										'element-properties'	=> [
																	'value'			=> $temp_paragraph,
																	'validation'	=>	[
																						'required'	=> true
																					]
																]
									];
		// in array from API data 'data' & 'header' replace with temp_header & temp_data
		$data['content']['header']	= $temp_header;
		$data['content']['data'] 	= $temp_data;

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

	/**
	 * function get template
	 * for list select on create draft akta
	 */
	public function get_template()
	{
		$id = Input::get('id');

		$this->curl_get('lihat/isi/template/akta', $this->token, ['id' => $id]);
		
		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		return Response::json(['data' => $data, 'status' => $status], 200);
	}

	/**
	 * [automatic_store description]
	 * like function store but
	 * no redirect page
	 */
	public function automatic_store($id = null)
	{
		$param 	= empty($id) ? Input::all() : array_merge(['id' => $id], Input::all());

		// replace index paragraph to array
		foreach ($param as $k => $v) 
		{
			// check key index like 'paragraph'
			if (strpos($k, 'paragraph') !== false)
			{
				// check pattern with tag html h4, p, ol & li
				$pattern = "/<h4.*?>(.*?)<\/h4>|<p.*?>(.*?)<\/p>|(<(ol|ul).*?><li>(.*?)<\/li>)|(<li>(.*?)<\/li><\/(ol|ul)>)/i";
				preg_match_all($pattern, $v[0], $out, PREG_PATTERN_ORDER);

				// change key index like 'paragraph[*]'
				foreach ($out[0] as $k2 => $v2) 
				{
					$temp_paragraph[$k.'['. $k2 .']'] = $v2;
				}
			}
			// array key index none 'paragraph'
			else 
			{
				$temp_paragraph[$k] = $v;
			}
		}
		// set temp paragraph to variable param
		$param 		= $temp_paragraph;

		$this->curl_post('simpan/template/akta', $this->token, $param);
		
		$status 	= $this->status;

		if ($status == 'success')
		{
			return Response::json(['status' => $status], 200);
		}
	}
}
