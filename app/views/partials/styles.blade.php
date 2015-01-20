 @if(Config::get('app.debug'))
	<!-- DEVELOPMENT -->
	{{ HTML::style('/build/styles/styles.css') }}
@else
	<!-- PRODUCTION -->
	{{ HTML::style('/build/styles/f9ef0c-styles.css') }}
@endif

<!-- JS -->
{{ HTML::script('/build/scripts/modernizr.js') }}