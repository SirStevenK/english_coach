const db = require('../../db');
const chalk = require("chalk");
const input = require("../../libs/input");

async function InsertVerb() {
    console.clear();
    console.log(chalk.whiteBright("Verbs insertion"));
    console.log();

    const label = await input("Verb ?");
    if (label === "__") return false;
    const preterit = await input("Simple Past ?");
    if (label === "__") return false;
    const participe = await input("Past Participle ?");
    if (label === "__") return false;
    const translation = await input("Translation ?");
    if (translation === "__") return false;

    let word = {
        type: "verb",
        label,
        preterit,
        participe,
        translation
    }

    db.addWord(word);

    return (await input()) !== "__";
}

module.exports = InsertVerb;