var Rsync = require('rsync');
var cmd;

/*
 * Set up the command using the fluent interface, starting with an
 * empty command wrapper and adding options using methods.
 */

Rsync.build({
    flags: 'avu',
    source: ['./node/blockchain', './node/utxo'],
    destination: './backup',
    })
    .execute(function(error, code, cmd) {
        if (error) {
            console.log(error);
            return;
        }
        console.log('All done executing', cmd);
    });
