const path = require('path');

module.exports = class FileErrorHandler {

    constructor(err, filePath) {
        this.err = err || {};
        this.filePath = filePath;
    }

    log() {
        if (this.err.message && this.err.message.match && this.err.message.match(/^ENOENT/)) {
            console.error(`No such file or directory: ${path.join(process.cwd(), this.filePath)}`);
            return;
        }
        console.error(this.err.message);
    }

};
