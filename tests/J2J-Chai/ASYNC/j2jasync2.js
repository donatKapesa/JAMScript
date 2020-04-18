assert = require('chai').assert

jasync function runthisfunc(x) {
    console.log("RunthisFunc called...");
    expect(x).to.equal('3');
    console.log("===============passed============")
}


setInterval(()=> {

    if (jsys.type === "fog")
	     runthisfunc(3);
}, 600);
