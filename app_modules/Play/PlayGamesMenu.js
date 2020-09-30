const chalk = require('chalk');
const input = require('../../libs/input');
const WordTranslation = require('../Game/WordTranslation');
const WordTranslationPlus = require('../Game/WordTranslationPlus');

async function PlayGamesMenu() {
    console.clear();
    console.log(chalk.whiteBright("Games"));
    console.log();

    console.log(chalk.whiteBright("[1] Words Traduction"));
    console.log(chalk.whiteBright("[2] Words Traduction Plus"));
    console.log(chalk.whiteBright("[3] Verb Conjugation"));
    console.log(chalk.whiteBright("[4] Verb Conjugation Plus"));
    console.log();

    const optionSelected = await input();
    if (optionSelected === "1") await WordTranslation();
    else if (optionSelected === "2") await WordTranslationPlus();
    // else if (optionSelected === "3") await PlayDeleteMenu();
    // else if (optionSelected === "4") console.log(chalk.green(optionSelected));
}

module.exports = PlayGamesMenu;