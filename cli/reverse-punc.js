const fs = require('fs');
const readline = require('readline');
const FileErrorHandler = require('../lib/FileErrorHandler');
const LineReverser = require('../lib/LineReverser');
const SrtParser = require('../lib/SrtParser');

module.exports = async (filePath) => {

    const SEP = '=======================';

    const specificSub = null;

    const srtParser = new SrtParser();
    let subsCursor = 0;
    let subsNum = 0;

    const linesStream = readline.createInterface({
        input: fs.createReadStream(filePath, 'utf8').on('error', err => new FileErrorHandler(err, filePath).log()),
        crlfDelay: Infinity,
    });

    linesStream.on('line', line => {

        srtParser.feedLine(line, {
            onSub(lines) {
                const reversedLines = [];
                subsCursor++;
                if (specificSub && subsCursor > specificSub) return linesStream.close(); // Will not immediately stop
                if (specificSub && subsCursor < specificSub) return;
                subsNum++;
                console.log(`Sub: ${subsCursor}\n${SEP}`);
                console.log(`${JSON.stringify(lines, null, 4)}\n${SEP}`);
                lines.forEach(line => {
                    reversedLines.push(new LineReverser(line).getReversedLine());
                    console.log(SEP);
                });
                console.log(`${JSON.stringify(reversedLines, null, 4)}\n${SEP}`);
            }
        });

    });

    linesStream.on('close', () => {
        console.log(`\nLines: ${subsNum}`);
    });

};
