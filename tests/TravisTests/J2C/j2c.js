assert = require('chai').assert

setInterval(()=> {
    if (jsys.type === "fog") {
	     var x = dotask(1);
       console.log(x.fog[0]);
       assert.equal(x.fog[0], '0');
       console.log(x);
       console.log("===============passed============")
    }
    else if (jsys.type === "cloud") {
	     var x = dotask(2);
       console.log(x.cloud[0]);
       assert.equal(x.cloud[0], '1');
       console.log(x);
       console.log("===============passed============")
    }
    else if (jsys.type === "device") {
	     var x = dotask(3);
       console.log(x.device[0]);
       assert.equal(x.device[0], '2');
       console.log(x);
       console.log("===============passed============")
    }
}, 1000);
