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
		<!-- Custom CSS -->
		<link href="{{ elixir('css/app.css') }}" rel="stylesheet">
		<!-- plugin summernote -->
		<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.css" rel="stylesheet">
		<!-- plugin medium editor for yabwe -->
		<link rel="stylesheet" href="/plugins/medium-editor/dist/css/medium-editor.css">
		<link rel="stylesheet" href="/plugins/medium-editor/dist/css/themes/bootstrap.min.css">
		<!-- Custom Fonts -->
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body style="padding-top: 130px">
	
		@include('layouts.partials._navigation')

		<div class="container m-t-md">
			<div class="row">
				<div class="col-sm-3 content-left m-b-sm">
					@yield('left')
				</div>
				<div class="col-sm-9 content-right p-l-none p-r-none m-t-sm">
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
		<script src="{{ elixir('js/app.js') }}"></script>
		@stack('scripts')
	</body>
</html>