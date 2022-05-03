const db = require('../util/database');

module.exports = class Template {
    constructor(nuevo_NombreTemplate) {
        this.NombreTemplate = nuevo_NombreTemplate;
    }

    static fetchAllTemplates() {
        console.log(db.execute('SELECT * FROM Template'));
        return db.execute('SELECT * FROM Template');
    }

    save() {
        return db.execute('INSERT INTO Template (NombreTemplate) VALUES (?)',
        [this.NombreTemplate]
    );
    }

    static fetchOneTemplate(idTemplate) {
        return db.execute('SELECT * FROM Template WHERE idTemplate=?', [idTemplate]);
    }

    static getTemplate(){
        return db.execute('SELECT *  FROM Template WHERE idTemplate = (?)',[this.id]
        );
    }
}

