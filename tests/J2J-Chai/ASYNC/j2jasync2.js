assert = require('chai').assert

jasync function runthisfunc(x) {
    console.log("RunthisFunc called...");
    assert.equal(x, 3);
}


setInterval(()=> {

    if (jsys.type === "fog")
	     runthisfunc(3);
}, 600);
