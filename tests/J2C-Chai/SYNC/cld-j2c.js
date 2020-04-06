assert = require('chai').assert

setInterval(()=> {
    if (jsys.type === "cloud") {
        console.log("Start Cloud Test");
	       var x = dotask();
         console.log(x);
         //assert.equal(x.cloud, '3');
	       //console.log(x);
    }
}, 1000);
