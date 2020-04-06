assert = require('chai').assert


setInterval(()=> {
    var x = dotask();
    console.log(x);
    console.log(x.device[0]);
    assert.equal(x.device[0], '3');
}, 1000);
    console("========passed=======")
