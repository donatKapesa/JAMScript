
function runsynctest()
{
    var q = fakeRandom('testing string..');
    console.log("Received the results..");
    console.log(q);
}

setInterval(function() {
	runsynctest();
    }, 700000);
