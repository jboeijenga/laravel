@if(Config::get('app.debug'))
	<!-- DEVELOPMENT -->
	{{ HTML::script('/assets/scripts/require-2.1.6.min.js', array('data-main'=> asset('../app/assets/scripts/build')) )}}
@else
	<!-- PRODUCTION -->
	{{ HTML::script('/assets/scripts/require-2.1.6.min.js', array('data-main'=> asset('build/scripts/27f84f-main.min.js')) )}}
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