module.exports = (roles) => (request, response, next) => {

    let rolJer;
    for (let rol of roles) {
        if (request.session.idRol == rol) {
            rolJer = true;
        }
    }

    if (!rolJer) {
        return response.status(403).redirect('./dashboard/');
    }
    next();
};