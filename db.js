const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class Database {
    constructor() {
        this.db = lowdb(new FileSync('db.json'));
        this.db.defaults({words: []}).write();
    }

    getWord(query) {
        return this.db.get('words').find(query).value();
    }

    getWords(query) {
        return this.db.get('words').filter(query).value();
    }

    addWord(word) {
        if (this.getWords({label: word.label}).length == 0) {
            this.db.get('words').push(word).write();
            return true;
        }
        else return false;
    }

    deleteWord(label) {
        this.db.get('words').remove({label}).write();
        return true;
    }

    updateWord(word) {
        this.deleteWord(word.label);
        return this.addWord(word);
    }
}

module.exports = new Database();