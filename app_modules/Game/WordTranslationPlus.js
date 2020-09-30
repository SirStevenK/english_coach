const db = require('../../db');
const chalk = require("chalk");
const input = require("../../libs/input");
const getRandomElement = require('../../libs/getRandomElement');

async function WordTranslationPlus() {
    let total = 0;
    let score = 0;
    const words = db.getWords({type: "vocabulary"}).map(e => ({...e, translation: e.translation.split("|")}));
    while (true) {
        console.clear();
        console.log(chalk.whiteBright("Word Traduction"));
        console.log(chalk.whiteBright("French -> English"));
        console.log(chalk.whiteBright(`${score}/${total}`));
        console.log();

        const wordToTranslate = words[Math.floor(Math.random() * words.length)];
        const wordToFind = getRandomElement(wordToTranslate.translation);
        console.log(chalk.whiteBright(wordToFind));
        let response = await input("Translation ? ");
        if (response === "__") break;
        else {
            total++;
            let colorText;
            
            response = response.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let solutions = words.filter(e => e.translation.find(tr => tr === wordToFind)).reduce((acc,cur) => [...acc, cur.label],[]).map(e => e.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            if (solutions.find(e => e.toLowerCase() === response.toLowerCase())) {
                colorText = chalk.greenBright;
                score++;
            }
            else colorText = chalk.redBright;
            
            
            console.log(colorText(solutions.join(" ; ")));
            if ((await input()) === "__") break;
        }

    }

    console.clear();
    console.log(chalk.whiteBright("Word Traduction"));
    console.log(chalk.whiteBright("English -> French"));
    console.log();
    await input(`Score ${score}/${total} - ` + chalk.greenBright(`${Math.round(score/total)*100}%`));
    return 0;
}

module.exports = WordTranslationPlus;