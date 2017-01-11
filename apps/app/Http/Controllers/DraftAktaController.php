<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Route;

class DraftAktaController extends Controller
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
		$this->curl_get('lihat/list/draft/akta', $this->token);

		// tes data
		// $parsing		= '{"status":"success","data":{"page_info":{"total_data":1,"pagination":{"current_page":1,"start_number":1,"per_page":20}},"page_data":{"header":["title","writer","last_update"],"data":[{"id":"5850a0b5b6cf8a0007533df2","title":"Akta Pemberian Hak Tanggungan II","type":"draft_akta","writer":"pname","writer_id":"pid","last_update":"2016-12-14 08:30:29"}]}}}';
		// $result 		= json_decode($parsing, true);
		
		// // $data 		= $this->data;
		// $status			= $result['status'];
		// $data 			= $result['data']['page_data'];
		// $info 			= $result['data']['page_info'];

		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		return view('pages.draft.index', compact('data', 'info'));
	}

	public function create($id = '123456789')
	{
		$this->curl_get('mulai/draft/akta', $this->token, ['id' => $id]);
		
		// // tes data
		// $parsing		= '{"status":"success","data":{"page_info":{"id":"123456789"},"page_data":{"title":{"header":["title"],"data":{"title":{"element-class":"input","element-type":"string","element-properties":{"value":"Akta Jual Beli Tanah","validation":{"required":true,"max":255}}}}},"content":{"header":["paragraph_0", "paragraph_1"],"data":{"paragraph_0":{"element-class":"input", "element-type":"text", "element-properties":{"value":"Isi Akta","validation":{"required":true}}}, "paragraph_1":{"element-class":"input", "element-type":"text", "element-properties":{"value":"Isi Akta","validation":{"required":true}}}}}}}}';
		
		// $result 		= json_decode($parsing, true);
		
		// $status			= $result['status'];
		// $data 			= $result['data']['page_data'];
		// $info 			= $result['data']['page_info'];

		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		// add new field 'type template' if empty value title
		$this->curl_get('lihat/list/template/akta', $this->token);

		// get list template
		foreach ($this->data['data'] as $k => $v) {
			$list_template[$v['id']]		= $v['title'];
		}

		// add list template in variable data
		$data['type']	= [
			'header'	=> ['type'],
			'data'		=> [
				'type'	=> [
					'element-class'			=> 'input',
					'element-type'			=> 'select',
					'element-properties'	=> [
						'value'			=> null,
						'validation'	=> null,
						'options'		=> $list_template
					]
				]
			]
		];
// 		$data = "CV [[[input]]]
// Pada hari ini, [[[input]]], tanggal [[[input]]],pukul [[[input]]] WIB ( Waktu Indonesia Bagian Badsfdsfarat) [[[input]]]. Berhadapan dengan saya [[[input]]], Sarjana Hukum, Magister Kenotariatan, Notaris di [[[input]]], Notaris dan akan disebut pada bagian akhir akta ini:
// [[[input]]]
// [[[input]]]

// Para penghadap menerangkan dan menyatakan bahwa para penghadap
// telah setuju dan mufakat untuk mendirikan Perseroan Komanditer dengan anggaran dasar sebagai berikut:
// Pasal 1
// Perseroan ini bernama : “ CV [[[input]]]” berkedudukan di [[[input]]],dan dapat mempunyai kantor cabang dan atau Perwakilan di tempat-tempat lain, atas permufakatan para persero.
// Pasal 2
// - Maksud dan tujuan Perseroan ini ialah:
// - Melakukan usaha jasa di bidang konsultasi mengenai system informasi, manajemen, akuntansi dan keuangan serta pekerjaan pekerjaan yang berhubungan dengan jasa computer, teknik serta umum lainnya, kecuali bidang hukum dan pajak, dimana kegiatannya meliputi: [[[input]]] Melayani pembuatan system informasi dan manajemen, serta System administrasi perusahaan dan/atau instasi pemerintah baik pusat maupun daerah, baik secara manual maupun komputerisasi.
// - Melayani pemasangan implementasi perangkat keras dan perangkat lunak komputer.
// - Melakukan kegiatan di bidang pendidikan, pelatihan, riset dan menyelenggarakan seminar serta pekerjaan pekerjaan–pekerjaan yang berhubungan dengan kegiatan peningkatan sumber daya manusia lainnya.
// – Menjalankan usaha perdagangan eksport-import [[[input]]] interinsuler dan local, terutama memperdagangkan komputer dan perihaperal, obat-obatan dan farmasi, alat-alat kedokteran, toilletries, kerajinan tangan (handicraft), garment, makanan dan minuman ringan, barang-barang elektronika, elektrikal, mekanikal, telekomunikasi, alat-alat tulis dan kantor, barang-barang cetakan dan material percetakan, furniture, bahan-bahan bangunan, baik untuk perhitungan sendiri maupun secara komisi atau secara amanat.
// - bertindak sebagai leveransir, supplier, komisioner, grosser, distributor dan keagenan/perwakilan baik dari perusahaan-perusahaan dalam maupun luar negeri.
// Menjalankan usaha di bidang percetakan penerbitan buku (publishing), penjilitan dan, pembuatan karton box, pengepakan, dan cartonage (packaging).
// Menjalankan usaha dibidang industri, antara lain, industri kayu, makan, minim, teksil, kertas, pakaian jadi, furniture, peralatan tulis dan kantor, alat-alat rumah tangga, serta barang-barang kerajinan tangan.
// Menjalankan usaha-usaha pemborong/kontraktor untuk semua pekerjaan banguna, antara lain gedung-gedung, rumah-rumah (Real Estate), jalanan, jembatan, konstruksi bangunan besi dan kayu, pengairan pekerjaan-pekerjaan penggalian tanah dan pengurangan, instalasi air, listrik gas dan telepon serta semua pekerjaan yang berhubungan dengan itu.
// Menjalankan usaha di bidang jasa boga dan/atau catering, jasa teknik dan biro jasa umum, antara lain pengurusan pembuatan Surat Ijin Mengemudi (SIM), STNK, cleaning service, pemeliharaan gedung-gedung, dan kantor-kantor beserta peralatannya, perbengkelan, pemeliharaan air conditioning (A.C.), pemeliharaan pompa-pompa air, pemeliharaan listrik dan lain sebagainya yang berhubungan dengan itu kecuali bidang Hukum dan pajak.
// Menjalankan usaha pengangkutan darat dan menerima serta mengangkut orang dan atau barang dan bertindak sebagai agen dari perusahaan-perusahaan lainnya.
// Berusaha dalam bidang industri dalam arti kata yang seluasluasnya.

// - dan selanjutnya melakukan segala tindakan dan kegiatan yang berhubungan dengan maksud dan tujuan tersebut, semuanya dalam arti kata yang seluas-luasnya, dengan megindahkan Undang-undang dan Peraturan-peraturan yang berlaku.";

		return view('pages.draft.create', compact('data', 'info'));
	}

	public function store($id = null)
	{
		$param 	= Input::all();
	
		$this->curl_post('simpan/draft/akta', $this->token, $param);
		
		$data 		= $this->data;

		return Redirect::route('show.draft.akta', $id);
	}

	public function show($id)
	{
		$this->curl_get('lihat/isi/draft/akta', $this->token, ['id' => $id]);

		$data 		= $this->data;
		$info 		= $this->info;

		return view('pages.draft.show', compact('data', 'info'));
	}

	public function edit($id)
	{
		$this->curl_get('edit/isi/draft/akta', $this->token, ['id' => $id]);
		
		$status			= $this->status;
		$data 			= $this->data;
		$info 			= $this->info;

		return view('pages.draft.create', compact('data', 'info'));
	}

	public function update($id)
	{
		$param 	= array_merge(['id' => $id], Input::all());

		$this->curl_post('update/draft/akta', $this->token, $param);
		
		$data 		= $this->data;

		return Redirect::route('show.draft.akta', $id);
	}

	public function destroy($id)
	{
		$this->curl_delete('hapus/draft/akta', $this->token, ['id' => $id]);
		
		$data 		= $this->data;

		return Redirect::route('index.draft.akta');
	}

	public function issue($id)
	{
		$this->curl_post('issue/draft/akta', $this->token, ['id' => $id]);
		
		$data 		= $this->data;

		return Redirect::route('index.draft.akta');
	}

	public function automatic_store($id = null)
	{
		$param 	= Input::all();
		
		$this->curl_post('simpan/draft/akta', $this->token, $param);
		
		$status 	= $this->status;

		if ($status == 'success')
		{
			return Response::json(['status' => $status], 200);
		}
	}
}
