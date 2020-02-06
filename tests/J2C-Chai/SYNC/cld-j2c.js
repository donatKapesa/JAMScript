var expect = require('chai').expect

setInterval(()=> {
    if (jsys.type === "cloud") {
	var x = dotask();
	expect(x.device).to.equal(3);
	console.log(x);
    }
}, 1000);
