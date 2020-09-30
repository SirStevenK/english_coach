const db = require('../../db');
const chalk = require("chalk");
const input = require("../../libs/input");

async function WordTranslation() {
    let total = 0;
    let score = 0;
    const words = db.getWords({type: "vocabulary"});
    while (true) {
        console.clear();
        console.log(chalk.whiteBright("Word Traduction"));
        console.log(chalk.whiteBright("English -> French"));
        console.log(chalk.whiteBright(`${score}/${total}`));
        console.log();

        const wordToTranslate = words[Math.floor(Math.random() * words.length)];
        console.log(chalk.whiteBright(wordToTranslate.label));
        let response = await input("Translation ? ");
        if (response === "__") break;
        else {
            total++;
            let colorText;
            
            response = response.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let solutions = wordToTranslate.translation.split("|").map(e => e.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            if (solutions.find(e => e.toLowerCase() === response.toLowerCase())) {
                colorText = chalk.greenBright;
                score++;
            }
            else colorText = chalk.redBright;
            
            
            console.log(colorText(wordToTranslate.translation.split("|").join(" ; ")));
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

module.exports = WordTranslation;