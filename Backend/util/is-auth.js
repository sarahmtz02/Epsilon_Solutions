module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.status(403).redirect('/empleados/login');
    }
    next();
}