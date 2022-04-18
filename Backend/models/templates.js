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

    async getTemplateId(){
        //let query = ('SELECT id_rol_sistema FROM usuario_permisos WHERE nombre_empleado=?', [this.nombre]);
        res = await db.query('SELECT idTemplate FROM Template WHERE NombreTemplate=?', [this.NombreTemplate]);
        return res;
    };
}

