<!-- Fixed navbar on top -->
<nav class="navbar navbar-default navbar-fixed-top">
	<!-- menu navbar & action profile -->
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="{{ route('root') }}">NotarisPRO.com</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-menu">
				<li class="@yield('nav-dashboard')"><a href="{{route('root')}}">Dashboard</a></li>
				<li class="@yield('nav-draft')"><a href="{{route('index.draft.akta')}}">Draft Akta</a></li>
				<li class="@yield('nav-template')"><a href="{{route('index.template.akta')}}">Template</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right navbar-feature m-r-none">
				<li><a href="../navbar/"><i class="fa fa-calendar"></i></a></li>
				<li><a href="../navbar/"><i class="fa fa-globe"></i></a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Ada Lovelace <i class="fa fa-angle-down"></i></a>
					<ul class="dropdown-menu">
						<li><a href="#">Akun Saya</a></li>
						<li><a href="#">Ubah Password</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Keluar</a></li>
					</ul>
				</li>
			</ul>
		</div>
		<hr class="m-t-none m-b-none">
	</div>
	<!-- title & action page -->
	<div class="container">
		<div class="navbar-header">
			<h3 class="page-title">@stack('title')</h3>
		</div>
		<ul class="page-action nav navbar-nav navbar-right m-r-none">
			@stack('action')
		</ul>
	</div>
</nav>