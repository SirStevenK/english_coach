const prompts = require('prompts');

async function input(message = "", validate = () => true) {
    return new Promise((resolve, reject) => {
        prompts({
            type: "text",
            name: "value",
            message,
            validate
        })
        .then(({value}) => (typeof value !== "undefined" && value !== "__") ? resolve(value) : reject(value))
    })
    .catch(value => {
        if (value === "__") return value;
        else return process.exit();
    })
}

module.exports = input;