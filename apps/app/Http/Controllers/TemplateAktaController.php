<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;

class TemplateAktaController extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRmMWcyM2ExMmFhIn0.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLmNvbSIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUub3JnIiwianRpIjoiNGYxZzIzYTEyYWEiLCJpYXQiOjE0ODA5MDcwNTgsIm5iZiI6MTQ4MDkwNzExOCwiZXhwIjoxNDgwOTEwNjU4LCJwaWQiOiJwaWQiLCJvaWQiOiJvaWQiLCJwbmFtZSI6InBuYW1lIiwib25hbWUiOiJvbmFtZSIsInJvbGUiOiJkcmFmdGVyIn0.CIjsWNryRNH7j2EGSWsZuAgPGuva1thc_UtHi-33pqyXlov07d-DGFNDw69mquXz1GxyCRjjkRnKHb3hOCMwWopdBZ1O1SM35u-9y2FrDLGWapHdXJjaTc1Qexzhs9lwDwGTrryZ1NQ0iARyS4ghpujIhtTs9R0254fpTviVoaA";
	}

	public function index()
	{
		$this->curl_get('lihat/list/template/akta', $this->token);
		
		$data 		= $this->data;

		return view('pages.template.index', compact('data'));
	}

	public function create($id = '123456789')
	{
		$this->curl_get('mulai/template/akta', $this->token, ['id' => $id]);
		
		$data 		= $this->data;

		return view('pages.template.create', compact('data'));
	}

	public function store($id = null)
	{
		$param 	= Input::all();

		$this->curl_post('simpan/template/akta', $this->token, $param);
		
		$data 		= $this->data;

		return Redirect::route('show.template.akta', $id);
	}

	public function show($id)
	{
		$this->curl_get('lihat/isi/template/akta', $this->token, ['id' => $id]);

		$data 		= $this->data;

		return view('pages.template.show', compact('data'));
	}

	public function edit($id)
	{
		$param 	= array_merge(['id' => $id], Input::all());

		$this->curl_post('update/template/akta', $this->token, $param);
		
		$data 		= $this->data;

		return Redirect::route('show.template.akta', $id);
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
}
