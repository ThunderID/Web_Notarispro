<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<title>NotarisPRO.com</title>
		<!-- Custom CSS -->
		<link href="/css/app.css" rel="stylesheet">
		<!-- plugin summernote -->
		<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.css" rel="stylesheet">
		<!-- plugin medium editor for yabwe -->
		<link rel="stylesheet" href="/plugins/medium-editor/dist/css/medium-editor.css">
		<link rel="stylesheet" href="/plugins/medium-editor/dist/css/themes/bootstrap.min.css">
		<!-- Custom Fonts -->

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body style="padding-top: 150px">
	
		@include('layouts.partials._navigation')

		<div class="container">
			<div class="row">
				<div class="col-sm-3">
					@yield('title')
				</div>
				<div class="col-sm-9 text-right">
					@yield('action')
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					@yield('left')
				</div>
				<div class="col-sm-9">
					@yield('right')
				</div>
			</div>
		</div>

		<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script> 
		<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script> 
		<!-- Custom JS -->
		<!-- plugin medium editor clone for yabwe -->
		<script src="/plugins/medium-editor/dist/js/medium-editor.min.js"></script>
		<!-- plugin rangy extension medium editor clone-->
		<script src="/plugins/rangy/rangy-core.js"></script>
		<script src="/plugins/rangy/rangy-classapplier.js"></script>
		<!-- plugin medium button extension medium editor clone-->
		<script src="/plugins/medium-button/dist/medium-button.min.js"></script>
		
		<!-- plugin summernote -->
		<script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.js"></script>

		<script src="/js/app.js" type="text/javascript"></script>
		@stack('scripts')
	</body>
</html>