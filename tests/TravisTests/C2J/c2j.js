var expect = require('chai').expect

jcond {
    fogonly: jsys.type == "fog";
    devonly: jsys.type == "device";
    cloudonly: jsys.type == "cloud";
}


jsync {fogonly} function setfogid(c) {
    console.log("Returning.. ", c);
    expect(c).to.equal(1);
    console.log("================passed==============");
    return c;
}

jsync {cloudonly} function setcloudid(c) {
    console.log("Returning.. ", c);
    expect(c).to.equal(2);
    console.log("================passed==============");
    return c;
}

jsync {devonly} function setdevid(c) {
    console.log("Returning.. ", c);
    expect(c).to.equal(3);
    console.log("================passed==============");
    return c;
}


var fogcnt = 1,
    cloudcnt = 2,
    devcnt = 3;

setInterval(function() {
    console.log("This is just a local print...");
}, 300);
