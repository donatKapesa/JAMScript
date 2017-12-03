const commandLineArgs = require('command-line-args');


// Here are the options. The jnode is going to be started using jamrun (a Python program).
// These options are going to be used by that program while starting the jnode.
// The jnode itself is embedded in the output generated by the jamc compiler.

// jnode  --device(d) --fog(-f)  --cloud(-c) --debug(-d) --log(-l)=log.txt
//  --registry(-r) --app(-a)=name --port(-p)=port_number [--num(-n)=serial_number]
//
// serial_number is actually optional.. it starts with 1 and this value is assumed by default

module.exports = new function parseArgs() {

    const optdefs = [
        { name: 'device', alias: 'd', type: Boolean},
        { name: 'fog', alias: 'f', type: Boolean},
        { name: 'cloud', alias: 'c', type: Boolean},
        { name: 'data', alias: 't', type: String},
        { name: 'app', alias: 'a', type: String},
        { name: 'tags', alias: 'g', type: String},
        { name: 'log', alias: 'l', type: String},
        { name: 'port', alias: 'p', type: Number, defaultValue: 1883},
        { name: 'num', alias: 'n', type: Number, defaultValue: 1}
    ];

    // Catch exceptions..
    var options;
    try {
        options = commandLineArgs(optdefs);
        // Enforce some default parameters specifications
        if (options.app == undefined) {
            console.log("ERROR! App name should be specified");
            process.exit(1);
        }
        // If fog or cloud is not specified, device is the default type

    } catch(e) {
        console.log(e.name);
        // there was an error.. what is it?
        process.exit(1);
    }

    // Setup some more defaults
    if (!options.fog && !options.cloud)
        options.device = true;

    if (options.device)
        options.conf = "device.conf";
    else if (options.fog)
        options.conf = "fog.conf";
    else
        options.conf = "cloud.conf";

    // we can parse tcp://host:port or host:port or host (6379 by default)
    if (options.data !== undefined) {
        var str = options.data;
        if (str.indexOf("tcp://") === 0)
            str = str.split("tcp://")[1];
        var parts = str.split(":");
        options.redhost = parts[0];
        options.redport = parts[1] || 6379;
    }

    return options;
};