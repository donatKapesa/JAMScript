var expect = require('chai').expect

jcond {
    fogonly: jsys.type == "fog";
}


jsync {fogonly} function getid() {
    console.log("Returning.. ", count);
    return count++;
}

jasync function you(s) {
    console.log("You - Message from C ", s);
    expect(s).to.equal('cxxxxxxxx');
}

jasync function me(id) {
    console.log("Me - Message from C ", s);
    /*expect(id).to.equal(c);
    console.log("================passed==============");*/
}

var count = 10;
setInterval(function() {
    console.log("This is just a local print...");
}, 300);
