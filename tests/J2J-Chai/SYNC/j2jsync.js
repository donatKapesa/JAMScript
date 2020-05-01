assert = require('chai').assert
var count = 10;

jsync function callX() {
    count++;
    console.log("CallX ... ", count);
    return count;
}

setInterval(()=> {
    if (jsys.type == "device"){
    	var x = callX();
      console.log(x.device);
      assert.equal(x.device, count);
      console.log("========passed=======");

	}
}, 500);
