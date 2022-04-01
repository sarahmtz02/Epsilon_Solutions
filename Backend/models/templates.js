const db = require('../util/database');

module.exports = class Template{
    constructor(nuevo_NombreTemplate) {
        this.NombreTemplate = nuevo_NombreTemplate;
    }

    static fetchAllTemplates() {
        console.log(db.execute('SELECT * FROM template'));
         return db.execute('SELECT * FROM template');
    }

    save() {
        return db.execute('INSERT INTO template (NombreTemplate) VALUES (?)',
        [this.NombreTemplate]
    );
    }

}