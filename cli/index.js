const program = require('commander');
const reversePunc = require('./reverse-punc');

program
    .command('reverse-punc <path>')
    .description('Reverse punctuality')
    .action(reversePunc);

program.parseAsync(process.argv).catch(err => {
    console.error('Ho no');
    console.error(err);
});

