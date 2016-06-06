var jlib = require('./jamlib'), 
	async = require('asyncawait/async'),
	await = require('asyncawait/await'),
	readline = require('readline');


const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});


rl.setPrompt('J-Core > ');
rl.prompt();

rl.on('line', (line) => {
	var toks = line.split(" ");
	
	switch (toks[0]) {
		case 'sync':
			program();
			break;
		case 'status':
			console.log("Number of devices: " + jlib.JServer.devCount());
			break;
		case 'help':
			showHelp();
			break;
		default:
			console.log("Invalid command...type 'help' to get more info.");
			break;
	}
	rl.prompt();
}).on('close', () => {
	console.log("Shutting down the J-Core!");
	process.exit(0);
});
		
	
function showHelp() {
	console.log("Help.......not yet written.. read the main switch for now!");
}
	
// for (i = 0; i < 10; i++) {
// 	process.stdout.write(".");
// 	jlib.JServer.remoteAsyncExec("hellofk", ["mcgill university", 343 + i * 10, "canada"], "true");
// }



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



// 

program = async(function() {
	value = await (jlib.JServer.remoteSyncExec("hellofk", ["mcgill university", 343 + 10, "canada"], "true"));
	console.log("Return value : " + value);
});




