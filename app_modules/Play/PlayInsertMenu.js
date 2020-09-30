const chalk = require('chalk');
const input = require('../../libs/input');
const InsertVerb = require('../Insert/InsertVerb');
const InsertWord = require('../Insert/InsertVocabulary');

async function PlayInsertMenu() {
    console.clear();
    console.log(chalk.whiteBright("Word insertion"));
    console.log();
    console.log(chalk.whiteBright("[1] Insert verbs"));
    console.log(chalk.whiteBright("[2] Insert vocabulary"));
    console.log();

    const optionSelected = await input();
    
    let type;
    if (optionSelected === "1") type = "verb";
    else if (optionSelected === "2") type = "vocabulary";
    else if (optionSelected === "__") return 0;
    else return await PlayInsertMenu();

    const actionInsert = (type === "verb") ? InsertVerb : InsertWord;
    while (true) {
        if (!(await actionInsert())) break;
    }
}

module.exports = PlayInsertMenu;