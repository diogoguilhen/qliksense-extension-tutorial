'use strict';

// node libs
var path = require( 'path' );
var fs = require( 'fs' );

// external libs
var assemble = require( 'assemble' );
var debug = require( 'gulp-debug' );
var extend = require( 'extend-shallow' );
var extname = require( 'gulp-extname' );
var glob = require( 'glob' );
var less = require( 'gulp-less' );
var yaml = require( 'js-yaml' );

// ****************************************************************************************
// Config file
// ****************************************************************************************
var assembleCfg = yaml.load( fs.readFileSync( path.join( __dirname, './assemble-config.yml' ), 'utf-8' ) );

// ****************************************************************************************
// Helpers
// ****************************************************************************************
//var helperFiles = glob.sync( assembleCfg.options.helperFiles );
//var helpers = helperFiles.reduce( function ( acc, fp ) {
//	return extend( acc, require( path.resolve( fp ) ) );
//}, {} );
//console.log( 'helpers', helpers );
//assemble.helpers( helpers );
assemble.helper( 'markdown', require( 'helper-markdown' ) );
assemble.helpers( require( 'handlebars-hybrid' ));

// ****************************************************************************************
// Assemble options
// ***************************************************************************************
assemble.layouts( assembleCfg.options.layouts );
assemble.option( 'layout', assembleCfg.options.defaultLayout );

assemble.task( 'assets', function () {
	assemble.src( './../docs/images/**/*.png' )
		.pipe( debug() )
		.pipe( extname() )
		.pipe( assemble.dest( './../tutorial/images' ) )
} );

assemble.task( 'tutorial', function () {
	assemble.src( './../docs/**/*.md' )
		.pipe( debug() )
		.pipe( extname() )
		.pipe( assemble.dest( './../tutorial' ) )
} );

assemble.task( 'default', ['assets', 'tutorial'] );