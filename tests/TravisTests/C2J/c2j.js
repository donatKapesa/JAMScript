assert = require('chai').assert

jasync function runQ(c) {
    console.log("runQ called.");
    assert.equal(c, 'Q');
    console.log("===============failed============")
}


jasync function runX(c) {
    console.log("runX called.");
    assert.equal(c, 'X');
    console.log("===============failed============")
}

jasync function runY(c) {
    console.log("runY called.");
    assert.equal(c, 'Y');
    console.log("===============passed============")
}


jsync function setid(c){
    if (jsys.type === "cloud")
      runQ('Q');
    if (jsys.type === "fog")
      runX('X');
    if (jsys.type === "device")
      runY('Y');
}

setInterval(function() {
    console.log("This is just a local print...");
}, 300);
