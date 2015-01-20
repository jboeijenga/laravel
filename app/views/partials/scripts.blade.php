@if(Config::get('app.debug'))
	<!-- DEVELOPMENT -->
	{{ HTML::script('/build/scripts/require.js', array('data-main'=> asset('../app/assets/scripts/config')) )}}
@else
	<!-- PRODUCTION -->
	{{ HTML::script('/build/scripts/require.js', array('data-main'=> asset('build/scripts/d6db37-main.min.js')) )}}
@endif

<script>
	define('global', {
		"CSRF_TOKEN":'{{ csrf_token(); }}',
		"BASE":'{{ Request::root(); }}'
	})
</script>

 <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
<script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-XXXXX-X');ga('send','pageview');
</script>