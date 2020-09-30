const chalk = require('chalk');
const db = require('../../db');
const input = require('../../libs/input');

async function PlayDeleteMenu() {
    console.clear();
    console.log(chalk.whiteBright("Word deletion"));
    console.log();
    const wordSearched = await input("Word ?");
    

    if (wordSearched === "__") return 0;
    else {
        const word = db.getWord({label: wordSearched});
        if (!word) {
            console.log(chalk.redBright("That word doesn't exist"));
            await input();
        }
        else {
            console.log(word);
            let deleteIt;
            while (typeof deleteIt === "undefined") {
                const response = await input("Delete it ? [y/n]");
                if (response === "__") return 0;
                else {
                    if (response.toLowerCase() === "y") deleteIt = true;
                    else if (response.toLowerCase() === "n") deleteIt = false;
                }
            }

            if (deleteIt) {
                db.deleteWord(word.label);
            }

            if ((await input()) === "__") return 0;
        }
        await PlayDeleteMenu();
    }
}

module.exports = PlayDeleteMenu;