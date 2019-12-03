var expect = require('chai').expect

jsync function getid() {
    console.log("Returning.. ", count);
    return count++;
}

jasync function you(s) {
    console.log("You - Message from C ", s);
    expect(s).to.equal('cxxxxxxxx');
}


var count = 10;
setInterval(function() {
    console.log("This is just a local print...");
}, 300);
