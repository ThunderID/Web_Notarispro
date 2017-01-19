<?php 
namespace ThunderID\LockedPDF;

use PDF, App, View;

class LockedPDF {
	/*
	* initial pdf
	*/
	public function intialPDF()
	{
		$pdf = PDF::getDomPDF();

		return $pdf;
	}
	/**
	 * Set lock pdf
	 */
	public function setLockedPDF($pdf = null, $view_pass = null, $print_pass = null) 
	{
		$pdf->setPaper("A4", "portrait");
		$pdf->loadHTML(View::make('pdf.template_pdf'));
        $pdf->render();
        $pdf->get_canvas()->get_cpdf()->setEncryption($view_pass, $print_pass);

		return $pdf;
	}
	/**
	* set name pdf
	*/
	public function namePDF($param = null)
	{
		
	}
	/**
	* set load html yg ingin dijadikan PDF
	*/
	public function setLoadHTML($pdf = null)
	{
		// $pdf->loadHTML(View::make('pdf.template_pdf'));

		return $pdf;
	}
}