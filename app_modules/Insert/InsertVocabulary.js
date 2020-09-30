const db = require('../../db');
const chalk = require("chalk");
const input = require("../../libs/input");

async function InsertVocabulary() {
    console.clear();
    console.log(chalk.whiteBright("Vocabulary insertion"));
    console.log();

    const label = await input("Label ?");
    if (label === "__") return false;
    const translation = await input("Translation ?");
    if (translation === "__") return false;

    let word = {
        type: "vocabulary",
        label,
        translation
    }

    db.addWord(word);

    return (await input()) !== "__";
}

module.exports = InsertVocabulary;