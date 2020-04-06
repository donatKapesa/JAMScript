assert = require('chai').assert

setInterval(()=> {
    if (jsys.type === "fog") {
	     var x = dotask();
       console.log(x.fog[0]);
       assert.equal(x.fog[0], '3');
       console.log(x);
    }
}, 1000);
