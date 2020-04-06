assert = require('chai').assert

jasync function runQ(c) {
    console.log("runQ called.");
    assert.equal(c, 'Q');
}


jasync function runX(c) {
    console.log("runX called.");
    assert.equal(c, 'X');
}

jasync function runY(c) {
    console.log("runY called.");
    assert.equal(c, 'Y');
}


jasync function runZ(c) {
    console.log("runZ called.");
    assert.equal(c, 'Z');

}


setInterval(()=> {

    if (jsys.type === "cloud")
	runQ('Q');
    if (jsys.type === "fog")
	runX('X');
    if (jsys.type === "device" && jsys.tags == "nodeA")
	runY('Y');
    if (jsys.type === "device" && jsys.tags == "nodeB")
	runZ('Z');

}, 600);
