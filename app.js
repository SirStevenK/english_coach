const PlayHomeMenu = require('./app_modules/Play/PlayHomeMenu');

async function run() {
    while (true) {
        await PlayHomeMenu();
    }
}

run();