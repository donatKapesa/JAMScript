var expect = require('chai').expect

jcond {
    fogonly: jsys.type == "fog";
}

var x = 100;
x=x+1
jasync function callother(y) {
    console.log("This is called... ", y);
    expect(y).to.equal(x);
    console.log("==================passed=================")
}


setInterval(()=> {
    console.log("Calling another J.. ");
    if (jsys.type == "device")
	     callother(x);
    x++;
}, 500);
