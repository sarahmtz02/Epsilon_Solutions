const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutas_users = require('./routes/user.routes');
const rutas_empleados = require('./routes/empleados.routes')
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'Prueba de Cookies', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use('/users', rutas_users);
app.use('/empleados', rutas_empleados);

//Middleware
app.use((request, response, next) => {
    response.redirect('/users');
    next();
});

app.listen(3000);