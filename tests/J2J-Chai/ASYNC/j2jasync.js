assert = require('chai').assert

jcond {
    fogonly: jsys.type == "fog";
}

var x = 100;

jasync function callother(y) {
    console.log("This is called... ", y);
    assert.equal(y, x);
}


setInterval(()=> {
    console.log("Calling another J.. ");
    if (jsys.type == "device")
	     callother(x);
    x++;
}, 500);
