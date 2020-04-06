var assert = require('chai').assert;

jdata {
    char *y as broadcaster;
}

jcond {
    fogonly: jsys.type == "fog";
    devonly: jsys.type == "device";
}

var count =10;


jasync function sendbcast() {
    console.log("Sending broadcast....", count++);
    var msg = "hello..from.." + jsys.type + "--" + count
    console.log(msg);
    y.broadcast(msg);
}

jasync function you(p) {
    console.log("Broadcaster return - Message from C ", p);
    assert.equal(p, "hello..from.." + jsys.type + "--" + count, " not equal");
    console.log("======PASSED=======");
}


setInterval(function() {
    console.log("Calling sendbcast...");
    sendbcast();
}, 5);
