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
		
		// $data 		= $this->data;
		$parsing 		= '{"status":"success","data":{"page_info":{"total_data":1,"pagination":{"current_page":1,"start_number":1,"per_page":20}},"page_data":{"header":["title","type","writer","last_update"],"data":[{"id":"5850a0bab6cf8a00080d60c2","title":"Akta Pemberian Hak Tanggungan","type":"draft_akta","writer":"pname","writer_id":"pid","last_update":"2016-12-14 08:30:34"}]}}}';
		$result 		= json_decode($parsing, true);
		
		$status			= $result['status'];
		$data 			= $result['data']['page_data'];
		$info 			= $result['data']['page_info'];

		return view('pages.template.index', compact('data', 'info'));
	}

	public function create($id = '123456789')
	{
		$this->curl_get('mulai/template/akta', $this->token, ['id' => $id]);
		
		$parsing 		= '{"status":"success","data":{"page_info":{"id":"5850a0bab6cf8a00080d60c2"},"page_data":{"title":{"header":["title"],"data":{"title":{"element-class":"input","element-type":"string","element-properties":{"value":"Akta Pemberian Hak Tanggungan","validation":{"required":true,"max":255}}}}},"content":{"header":["paragraph_0","paragraph_1","paragraph_2"],"data":{"paragraph_0":{"element-class":"string","element-properties":{"value":"Pada hari ini, Senin, tanggal 28 Agustus 2016 hadir dihadapan saya, ANNA WONG, sarjana Hukum yang berdasarkan SK BPN tanggal 23 April 2003 nomor 6-XA-2003. Diangkat sebagai Pejabat Pembuat Akta Tanah yang selanjutnya disebut PPAT yang dimaksud dalam pasal 7 Peraturan Pemerintah Nomor 24 Tahun 1997 tentang pendaftaran Tanah, dengan daerah kerja kota Administrasi Jakarta Utara dan berkantor di Komplek Ruko Grand Boutique Centre Blok A Nomor 9, Jalan Mangga Dua, Jakarta 14430. Dengan dihadiri oleh saksi - saksi yang saya kenal akan disebut pada bagian akhir akta ini :","validation":{"required":true}}},"paragraph_1":{"element-class":"string","element-properties":{"value":"@tlab.party.1@","validation":{"required":true}}},"paragraph_2":{"element-class":"string","element-properties":{"value":"@tlab.party.2@","validation":{"required":true}}}}}}}}';
		$result 		= json_decode($parsing, true);
		
		$status			= $result['status'];
		$data 			= $result['data']['page_data'];
		$info 			= $result['data']['page_info'];

		return view('pages.template.create', compact('data', 'info'));
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
		$info 		= $this->info;

		return view('pages.template.show', compact('data', 'info'));
	}

	public function edit($id)
	{
		$param 	= array_merge(['id' => $id], Input::all());

		$this->curl_get('edit/isi/template/akta', $this->token, $param);
		
		$data 		= $this->data;

		return view('pages.template.create', compact('data'));
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
