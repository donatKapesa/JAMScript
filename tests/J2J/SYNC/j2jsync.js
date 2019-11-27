assert = require('chai').assert
var count = 10;

jsync function callX() {
    count++;
    console.log("CallX ... ", count);
    return count;
}

setInterval(()=> {
    var x = callX();
    if (jsys.type == "device")
	console.log("Return value ", callX());
    assert.equal(x.device[0], '11');
    
}, 500);
     console("========passed=======")