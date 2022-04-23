const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Rutas a utilizar
const rutas_empleados = require('./routes/empleados.routes');
const rutas_evaluacion = require('./routes/evaluacion.routes');
const rutas_newPeriodo = require('./routes/newPeriodo.routes');
const rutas_newEval = require('./routes/newEvaluacion.routes');
const rutas_leadPanel = require('./routes/leadPanel.routes');
const rutas_template = require('./routes/templates.routes');

const app = express();
path = require('path');

// EJS Config.
app.set('view engine', 'ejs');
app.set('views', 'views');

// Static
app.use(express.static(path.join(__dirname, 'public')));

//const csrf = require('csurf');
//const csrfProtection = csrf();

// Node JS packages
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());

app.use(session({
    secret: 'ZeBrands SIRE', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

// Routes
app.use('/', rutas_evaluacion);
app.use('/', rutas_leadPanel);

app.use('/empleados', rutas_empleados);
app.use('/evaluacion', rutas_newEval);
app.use('/periodos', rutas_newPeriodo);
app.use('/templates', rutas_template);


//app.use(csrfProtection); 

/*app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});*/

//Middleware
app.use((request, response, next) => {
    response.redirect('/empleados');
    next();
});


app.listen(3000);