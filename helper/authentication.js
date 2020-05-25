var fs = require('fs');
let { authorize } = require('./googleapis');

module.exports = function authentication(callback) {
    // Load client secrets from a local file.
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the YouTube API.
        authorize(JSON.parse(content), callback());
    });
}