const chalk = require('chalk');
const db = require('../../db');
const input = require('../../libs/input');

async function PlayModifyMenu() {
    console.clear();
    console.log(chalk.whiteBright("Word modification"));
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
            let updateIt;
            while (typeof updateIt === "undefined") {
                const response = await input("Update it ? [y/n]");
                if (response === "__") return 0;
                else {
                    if (response.toLowerCase() === "y") updateIt = true;
                    else if (response.toLowerCase() === "n") updateIt = false;
                }
            }

            if (updateIt) {
                let label = await input(`Label : (${word.label})`) || word.label;
                if (label === "__") return 0;
                let preterit, participe;
                if (word.type === "verb") {
                    preterit = await input(`Past Simple : (${word.preterit})`) || word.preterit;
                    if (preterit === "__") return 0;
                    participe = await input(`Past Participe : (${word.participe})`) || word.participe;
                    if (participe === "__") return 0;
                }
                let translation = await input(`Translation : (${word.translation})`) || word.translation;
                if (translation === "__") return 0;
                
                word.label = label;
                if (word.type === "verb") {
                    word.preterit = preterit;
                    word.participe = participe;
                }
                word.translation = translation;

                db.updateWord(word);
                console.log(word);
            }

            if ((await input()) === "__") return 0;
        }
        await PlayModifyMenu();
    }
}

module.exports = PlayModifyMenu;