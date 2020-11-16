module.exports = class LineReverser {

    constructor(line) {
        this.line = line;
        this.nonAlnum = [];
        this.reachedLetters = false;
        this.reachedLettersAt = 0;
        this.reversedLine = null;
        for (let i = 0; i < line.length; i++) {
            // console.log(line.charAt(i));
            const char = line.charAt(i);
            if (!char.match(/[א-ת]/) && !this.reachedLetters) {
                this.nonAlnum.push(char);
            } else {
                if (!this.reachedLetters) {
                    this.reachedLetters = true;
                    this.reachedLettersAt = i;
                }
                console.log(char);
            }
        }
        this.reversedLine = this.line.slice(this.reachedLettersAt);
        this.nonAlnum.forEach(char => {
            this.reversedLine = `${this.reversedLine}${char}`;
            console.log(char);
        });
    }

    getReversedLine() {
        return this.reversedLine;
    }

};
