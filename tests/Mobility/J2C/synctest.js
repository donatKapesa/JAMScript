
setInterval(()=> {
    if (jsys.type === "fog") {
	var x = dotask();
	console.log(x);
    }
}, 50);


// change position with time.
// Move on a line from one end to the other end.

var xCoord = 10;
var yCoord = 0;
var maxX = 150;

if (jsys.type == "device") {
    jsys.setLat(xCoord);
    jsys.setLong(yCoord);

    setInterval(function() {
        xCoord += 5;
        if (xCoord > maxX)
            xCoord = 10;
        jsys.setLat(xCoord);
    }, 300);
}
