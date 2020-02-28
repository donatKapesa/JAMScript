var expect = require('chai').expect
var count = 10;

jsync function callX() {
    count++;
    console.log("CallX ... ", count);
    return count;
}

setInterval(()=> {
    if (jsys.type == "device"){
    	var x = callX();
	//console.log("Return value ", x);
	//console.log("Count ", count);	
	expect(x.device).to.equal(count);
    	console.log("========passed=======");

	}
}, 500);
    

