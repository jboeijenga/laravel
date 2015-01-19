 @if(Config::get('app.debug'))
<!-- DEVELOPMENT -->
{{ HTML::style('/build/styles/styles.css') }}
@else
<!-- PRODUCTION -->
{{ HTML::style('/build/styles/5e54bc-styles.css') }}
@endif

<!-- JS -->
{{ HTML::script('/assets/scripts/modernizr-2.6.2.min.js') }}