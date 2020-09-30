const chalk = require('chalk');
const input = require('../../libs/input');
const PlayDeleteMenu = require('./PlayDeleteMenu');
const PlayGamesMenu = require('./PlayGamesMenu');
const PlayInsertMenu = require('./PlayInsertMenu');
const PlayModifyMenu = require('./PlayModifyMenu');

async function PlayHomeMenu() {
    console.clear();
    console.log(chalk.whiteBright("Welcome in English Coach app"));
    console.log();
    console.log(chalk.whiteBright("[1] Insert words"));
    console.log(chalk.whiteBright("[2] Modify words"));
    console.log(chalk.whiteBright("[3] Delete words"));
    console.log(chalk.whiteBright("[4] Play games"));
    console.log();

    const optionSelected = await input();
    if (optionSelected === "1") await PlayInsertMenu();
    else if (optionSelected === "2") await PlayModifyMenu();
    else if (optionSelected === "3") await PlayDeleteMenu();
    else if (optionSelected === "4") await PlayGamesMenu();
}

module.exports = PlayHomeMenu;