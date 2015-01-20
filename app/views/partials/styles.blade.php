 @if(Config::get('app.debug'))
<!-- DEVELOPMENT -->
{{ HTML::style('/assets/styles/styles.css') }}
@else
<!-- PRODUCTION -->
{{ HTML::style('/assets/styles/f9ef0c-styles.css') }}
@endif

<!-- JS -->
{{ HTML::script('/assets/scripts/modernizr-2.6.2.min.js') }}