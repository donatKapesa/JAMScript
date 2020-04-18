var should = require('chai').should();


jdata {
    char *pstr as broadcaster;
}


var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function getstring() {

    // length is [6,12]
    var len = 6 + Math.round(Math.random()*6);
    var buf = [];
    for (i = 0; i < len; i++)
	buf.push(alpha[Math.floor(Math.random()*alpha.length)]);

    return buf.join('');
}


setInterval(function() {

    // push the value (pstr value) from the cloud.
    // Other nodes just print it.

    // We have the value printed at all levels including the controllers and
    // devices.

    if (jsys.type == "cloud"){
	     pstr.broadcast(getstring());
}  else{
	console.log("Value ", pstr.getLastValue());
}

  if (jsys.type === "cloud"){
    should.exist(pstr);
    console.log("=================passed============");
  }
}, 500);

jasync function you(val) {
    console.log("Broadcaster return - Message from C ", val);
    should.exist(val);
    console.log("=================passed============");
}


pstr.subscribe(function(x, y, z) {

    console.log("Message received...", x);
});
