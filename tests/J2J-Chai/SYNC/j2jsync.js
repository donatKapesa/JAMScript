var expect = require('chai').expect
var count = 10;

jsync function callX() {
    count++;
    console.log("CallX ... ", count);
    return count;
}

setInterval(()=> {
    var x = callX();
    if (jsys.type == "device")
	console.log("Return value ", x);
    expect(x.device).to.equal(count);
    console.log("========passed=======")
}, 50);
    