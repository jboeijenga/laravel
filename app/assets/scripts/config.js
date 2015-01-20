require.config({
	
	deps:['jquery','app'],

	urlArgs: "bust=" + (new Date()).getTime(),

	paths: {
		'jquery'						: '../bower_components/jquery/dist/jquery'
	},

	shim:{
		
	}
});