			$('#content').children().each(function( index ) {
				if($(this)['0'].tagName == 'H4'){
				}else if($(this)['0'].tagName == 'P'){
					if (/text-align: center/i.test($(this)['0'].outerHTML)){
						result = fillString($(this).html(), 55, 'center');
						$(this).css('text-align','left');
						$(this).html( result );
					}else{
						result = fillString($(this).text(), 55, 'right');
						$(this).html( result );
					}
				}else if($(this)['0'].tagName == 'OL'){
					$(this).find('li').each(function(){
						tmps = $(this).html().split("<br>");
						rslt = "";

						$.each(tmps, function( index, value) {
							t_value = value.replace("<div>", "");
							t_value = t_value.replace("</div>", "");
							tmp_result = fillString(t_value, 51, 'right');
							rslt += tmp_result;
						});

						$(this).html( rslt );
					});
				}else if($(this)['0'].tagName == 'UL'){
					$(this).find('li').each(function(){
						tmps = $(this).html().split("<br>");
						rslt = "";

						$.each(tmps, function( index, value) {
							t_value = value.replace("<div>", "");
							t_value = t_value.replace("</div>", "");
							tmp_result = fillString(t_value, 51, 'right');
							rslt += tmp_result;
						});

						$(this).html( rslt );
					});
				}else{
					// another possible component here
				}
			});

		// flag
		isBold = false;
		isUnderline = false;
		isItalic = false;

		function fillString(input, length, type){
			max = length;
			tmps = input.split(" ");
			result = "";
			htmlResult = "";
			tmpHtmlResult = "";
			tmpHelper = ""


			$.each(tmps, function( index, value ) {

				// HTML styling sections
				// bold
				elementBold = value.indexOf('<b>');
				if(elementBold !== -1){
					this.isBold = true;
					tmpHtmlResult += "<b>"; 
					value = value.replace("<b>", "");
				}

				elementBold = value.indexOf('</b>');
				if(elementBold !== -1){
					this.isBold = false;
					tmpHelper += "</b>"; 
					value = value.replace("</b>", "");
				}				

				// underline
				elementUnderline = value.indexOf('<u>');
				if(elementUnderline !== -1){
					this.isUnderline = true;
					tmpHtmlResult += "<u>"; 
					value = value.replace("<u>", "");
				}

				elementUnderline = value.indexOf('</u>');
				if(elementUnderline !== -1){
					this.isUnderline = false;
					tmpHelper += "</u>"; 
					value = value.replace("</u>", "");
				}				

				// italic
				elementItalic = value.indexOf('<i>');
				if(elementItalic !== -1){
					this.isUnderline = true;
					tmpHtmlResult += "<i>"; 
					value = value.replace("<i>", "");
				}

				elementItalic = value.indexOf('</i>');
				if(elementItalic !== -1){
					this.isUnderline = false;
					tmpHelper += "</i>"; 
					value = value.replace("</i>", "");
				}	

				// special char
				value = value.replace(/&amp;/g, '&');


				// formatting data
				res_length 	= result.length;

				word_length = value.length + res_length;

				if(word_length <= max){
					if(value.length > 0){
						result += value; 
						tmpHtmlResult += value; 

						if(result.length != max-1){
							result += ' ';
							tmpHtmlResult += ' '; 
						}else{
							result += '-';
							tmpHtmlResult += '-'; 
						}
					}
				}else{
					if(value.length > 0){
						// console.log(result);
						if(type == 'center'){
							buffer = insertStringFromLeftRight(tmpHtmlResult, res_length , max);
							if((buffer.length * 2) + res_length < max){
								tmpHtmlResult = buffer + ' ' + tmpHtmlResult + buffer;		
							}else{
								tmpHtmlResult = buffer + tmpHtmlResult + buffer;		
							}
						}else{
							buffer = insertStringFromRight(tmpHtmlResult, res_length , max);
							tmpHtmlResult += buffer;
						}

						htmlResult += tmpHtmlResult;
						htmlResult += ' ';

						result =  value + ' ';
						tmpHtmlResult =  value + ' ';
					}
				}

				// set clossing style
				if(tmpHelper != ""){
					tmpHtmlResult += tmpHelper;
					tmpHelper = "";
				}
			});

			if(type == 'center'){
				buffer = insertStringFromLeftRight(tmpHtmlResult, result.length , max);
				if((buffer.length * 2) + result.length < max){
					tmpHtmlResult = buffer + ' ' + tmpHtmlResult + buffer;		
				}else{
					tmpHtmlResult = buffer + tmpHtmlResult + buffer;		
				}
			}else{
				buffer = insertStringFromRight(tmpHtmlResult, result.length , max);
				tmpHtmlResult += buffer;
			}

			htmlResult += tmpHtmlResult;

			if(htmlResult.length == 0){
				htmlResult = '&nbsp';
			}

			return htmlResult;
		}

		function insertStringFromRight(input, ctr, max){
			buffer = ""

			if(ctr < max){
				if(ctr > 0){
					do {
						buffer = buffer + '-';
						ctr = ctr + 1;
					}
					while (ctr < max);
				}
			}

			//check html flag
			if(this.isBold == true){
				buffer = "</b>" + buffer + "<b>";
			}
			if(this.isItalic == true){
				buffer = "</i>" + buffer + "<i>";
			}
			if(this.isUnderline == true){
				buffer = "</u>" + buffer + "<u>";
			}

			return buffer;		
		}

		function insertStringFromLeftRight(input, ctr, max){
			buffer = ""

			if(ctr < max){
				if(ctr > 0){
					do {
						buffer = buffer + '-';
						ctr = ctr + 2;
					}
					while (ctr < max);
				}
			}

			//check html flag
			if(this.isBold == true){
				buffer = "</b>" + buffer + "<b>";
			}
			if(this.isItalic == true){
				buffer = "</i>" + buffer + "<i>";
			}
			if(this.isUnderline == true){
				buffer = "</u>" + buffer + "<u>";
			}

			return buffer;	
		}