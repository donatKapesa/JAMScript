var jlib = require('./jamlib');

function test(a, b, c) {
	console.log("hello.. this is output from j-core");
	console.log(a, b, c);
	return b + c;
}


function testfg(a, b, c) {
	console.log("hello.. this is output from j-core");
	console.log(a, b, c);
	return b - c;
}

jlib.JServer.registerCallback(test, "snn");
jlib.JServer.registerCallback(testfg, "snn");



for (i = 0; i < 10; i++) {

	console.log("Calling remote exec...");
	jlib.JServer.remoteAsyncExec("hellofk", ["mcgill university", 343 + i * 10, "canada"], "true");
}


