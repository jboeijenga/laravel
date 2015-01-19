require.config({
	deps:['vendor/jquery/jquery-1.10.2.min','app'],

	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		'jquery'						: 'vendor/jquery/jquery-1.10.2.min',
	},
	shim:{
		
	}
});