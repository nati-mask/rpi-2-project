module.exports = class SrtParser {

    constructor() {
        this.currentSub = [];
    }

    feedLine(line, options) {
        if (this.isLineEmpty(line)) {
            // if (this.currentSub.length) console.log(JSON.stringify(this.currentSub, null, 4));
            if (this.currentSub.length > 2 && options && options.onSub(this.currentSub.slice(2)));
            this.currentSub = [];
            // console.log('Empty Line!');
        } else {
            this.currentSub.push(line);
            // console.log(`Line: ${line.toString()}`);
        }
    }

    isLineEmpty(line) {
        return !line.length;
    }

};
