<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;

class TemplateAktaController extends Controller
{
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwianRpIjoiNGYxZzIzYTEyYWEifQ.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLmNvbSIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUub3JnIiwianRpIjoiNGYxZzIzYTEyYWEiLCJpYXQiOjE0ODA2NDg2NTQsIm5iZiI6MTQ4MDY0ODcxNCwiZXhwIjoxNDgwNjUyMjU0LCJwaWQiOiJjaGVsc3ltb295IiwicG5hbWUiOiJDaGVsc3kgTW9veSIsInJvbGUiOiJkcmFmdGVyIiwib2lkIjoidGh1bmRlcmxhYmluZG9uZXNpYSIsIm9uYW1lIjoiUFQgVGh1bmRlcmxhYiBJbmRvbmVzaWEifQ.";
	}

	public function index()
	{
		$this->curl_get('lihat/list/template', $this->token);
		
		$data 		= $this->data;

		return view('pages.template.index', compact('data'));
	}

	public function create($id = '123456789')
	{
		$this->curl_get('lihat/isi/template', $this->token, ['id' => $id]);
		
		$data 		= $this->data;

		return view('pages.template.create', compact('data'));
	}

	public function store($id = null)
	{
		if(is_null($id))
		{
			$param 	= Input::all();
		}
		else
		{
			$param 	= array_merge(['id' => $id], Input::all());
		}

		$this->curl_post('simpan/template', $this->token, $param);
		
		$data 		= $this->data;

		return Redirect::route('show.template.akta', $id);
	}

	public function show($id)
	{
		$this->curl_get('lihat/isi/template', $this->token, ['id' => $id]);

		$data 		= $this->data;

		return view('pages.template.show', compact('data'));
	}

	public function edit($id)
	{
		return $this->create($id);
	}

	public function update($id)
	{
		return $this->store($id);
	}

	public function destroy($id)
	{
		$this->curl_delete('hapus/template', $this->token, ['id' => $id]);
		
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
