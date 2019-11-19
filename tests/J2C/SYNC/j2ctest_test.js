assert = require('chai').assert


setInterval(()=> {
    var x = dotask();
    console.log(x);
    console.log(x.device[0])
    assert.typeOf(x.device[0], 'string');
}, 1000);