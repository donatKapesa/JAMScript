var expect = require('chai').expect
var count = 10;

setInterval(function() {
    console.log("This is just a local print...");
}, 300);

jsync function localonlyjs(c){
   expect(c).to.be.oneOf(["Hello YOU", "Hello ME"]);
}
