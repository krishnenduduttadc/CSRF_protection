const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));


app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.get('/', (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/submit', (req, res) => {
    const csrfToken = req.csrfToken();
    console.log(csrfToken)
    res.redirect(`/success?csrfToken=${csrfToken}`);
});

app.get('/success', (req, res) => {
    const csrfToken = req.query.csrfToken;
    res.render('success', { csrfToken });
});

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server Running');
});