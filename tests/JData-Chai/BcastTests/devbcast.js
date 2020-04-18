var should = require('chai').should;
var assert = require('chai').assert;

jdata {
    char *y as broadcaster;
}

var count =10;


jasync function sendbcast() {
   console.log("Sending broadcast....", count++);
   var msg = "hello..you..have..msg-" + count
   y.broadcast(msg);
}


jasync function you(p) {
    console.log("Broadcaster return - Message from C ", p);
    assert.equal(p, "hello..you..have..msg-" + count, " not equal");
    console.log("=============passed===============");
}

setInterval(function() {
    console.log("Calling sendbcast...");
	sendbcast();
}, 500);
