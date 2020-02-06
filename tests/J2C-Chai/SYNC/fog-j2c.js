
setInterval(()=> {
    if (jsys.type === "fog") {
	var x = dotask();
	console.log(x);
	expect(x.device).to.equal(3);
    }
}, 1000);
