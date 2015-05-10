'use strict';

var angular = require( "angular" ),
	app = angular.module( "app", [
		require( "angular-bind-polymer" ).name,
		require( "./ui/module" ).name
	] ),
	DAW = require( "./daw/daw" ),
	AudioContext = global.AudioContext || global.webkitAudioContext,
	dawEngine = new DAW( AudioContext, [
		require( "./instruments/synth/instrument" )
	] );

// !!! DEFFERS THE BOOTSTRAP !!!
global.name = "NG_DEFER_BOOTSTRAP!";

app.config( [ "dawEngineProvider", function( dawEngineProvider ) {
	dawEngineProvider.dawEngine = dawEngine;
} ] );

angular.element( document ).ready( function() {

	dawEngine.init( function() {

		// !!! BOOTSTRAP !!!
		angular.resumeBootstrap();

	} );

} );

module.exports = app;