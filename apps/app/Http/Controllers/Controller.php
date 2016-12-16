<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function curl_get($path_string, $token, $params = [])
    {
		//url-ify the data for the POST
		// $fields_string	= http_build_query($params);

		// $url			= 'http://192.168.1.17/'.$path_string.'?'.$fields_string;

		// //open connection
		// $header[]		= "Authorization: Bearer ".$token;

		// $curl			= curl_init();

		// curl_setopt_array($curl, array(
		// 					  CURLOPT_PORT 				=> "8300",
		// 					  CURLOPT_URL 				=> $url,
		// 					  CURLOPT_RETURNTRANSFER 	=> true,
		// 					  CURLOPT_ENCODING 			=> "",
		// 					  CURLOPT_MAXREDIRS 		=> 10,
		// 					  CURLOPT_TIMEOUT 			=> 30,
		// 					  CURLOPT_HTTP_VERSION 		=> CURL_HTTP_VERSION_1_1,
		// 					  CURLOPT_CUSTOMREQUEST 	=> "GET",
		// 					  CURLOPT_HTTPHEADER 		=> $header,
		// 				));

		// $result			= curl_exec($curl);

		// curl_close($curl);

		// $result 		= json_decode($result, true);

		// $this->status 	= $result['status'];
		// $this->data 	= $result['data']['page_data'];
		// $this->info 	= $result['data']['page_info'];

		return true;
    }

    public function curl_post($path_string, $token, $params)
    {
		//url-ify the data for the POST
		$fields_string	= http_build_query($params);

		$url			= 'http://172.17.0.4/'.$path_string;

		//open connection
		$header[]		= "Authorization: Bearer ".$token;

		$curl			= curl_init();

		curl_setopt_array($curl, array(
							  CURLOPT_PORT 				=> "80",
							  CURLOPT_URL 				=> $url,
							  CURLOPT_RETURNTRANSFER 	=> true,
							  CURLOPT_ENCODING 			=> "",
							  CURLOPT_MAXREDIRS 		=> 10,
							  CURLOPT_TIMEOUT 			=> 30,
							  CURLOPT_HTTP_VERSION 		=> CURL_HTTP_VERSION_1_1,
							  CURLOPT_CUSTOMREQUEST 	=> "POST",
							  CURLOPT_POSTFIELDS 		=> $fields_string,
							  CURLOPT_HTTPHEADER 		=> $header,
						));

		$result			= curl_exec($curl);
		
		curl_close($curl);
		
		$result 		= json_decode($result, true);
		$this->status 	= $result['status'];
		$this->data 	= $result['data'];

		return true;
    }

    public function curl_delete($path_string, $token, $params)
    {
		//url-ify the data for the POST
		$fields_string	= http_build_query($params);

		$url			= 'http://172.17.0.4/'.$path_string;

		//open connection
		$header[]		= "Authorization: Bearer ".$token;

		$curl			= curl_init();

		curl_setopt_array($curl, array(
							  CURLOPT_PORT 				=> "80",
							  CURLOPT_URL 				=> $url,
							  CURLOPT_RETURNTRANSFER 	=> true,
							  CURLOPT_ENCODING 			=> "",
							  CURLOPT_MAXREDIRS 		=> 10,
							  CURLOPT_TIMEOUT 			=> 30,
							  CURLOPT_HTTP_VERSION 		=> CURL_HTTP_VERSION_1_1,
							  CURLOPT_CUSTOMREQUEST 	=> "DELETE",
							  CURLOPT_POSTFIELDS 		=> $fields_string,
							  CURLOPT_HTTPHEADER 		=> $header,
						));

		$result			= curl_exec($curl);
		
		curl_close($curl);

		return $result;
    }
}
