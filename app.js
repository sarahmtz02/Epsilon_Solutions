const express = require('express');
const app = express();

const port = 3000;

//motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render("Login")
})

app.use((req, res, next) => {
    res.render("404");
})

app.listen(port, () => {
    console.log('Servidor a su servicio en el puerto ', port)
})