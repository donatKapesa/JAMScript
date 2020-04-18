var expect = require('chai').expect
var i = 1;

jasync function callingj(x) {
    console.log("Value of x ", x);
    expect(x).to.equal(i++);
    console.log("=============passed============");


}
