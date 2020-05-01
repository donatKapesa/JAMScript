var expect = require('chai').expect

jasync function me(s) {
    console.log("Me - Message from C ", s);
    expect(s).to.equal('cxxxxyyyy');
    console.log("================passed-1==============");
}

jasync function you(s) {
    console.log("You - Message from C ", s);
    expect(s).to.equal("cxxxxxxxx");
    console.log("================passed-2==============");
}


var count = 10;
setInterval(function() {
    console.log("This is just a local print...");
}, 300);
