var assert = require('chai').assert;

jdata {
    int x as logger;
}

var xlogger = x.getMyDataStream();

var count = 10;
setInterval(()=> {

//    xlogger.log("hello-" + count);
//    count++;
    console.log("---------------------------");
    for (i = 0; i < x.size(); i++){
	   console.log("Value of x ", x[i].lastValue());
     if (jsys.type === 'device' && i != 0){
        assert.isAbove(x[i].lastValue(), 0);
        console.log("======Passed=======");
     }
   }
}, 1000);
