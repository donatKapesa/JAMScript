assert = require('chai').assert
var count = 10;

jsync function callX() {
    count++;
    console.log("---------------- CallX ... ", count);
    return count;
}

setInterval(()=> {

  if (jsys.type == "fog"){
      var x = callX();
	    console.log("Return value ", x);
      console.log(x.fog);
      assert.equal(x.fog, count);
  }
}, 500);
