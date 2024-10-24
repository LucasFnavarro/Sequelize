import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql2';

import { sequelize } from './db/connection.js';

import { User } from './models/User.js';

const app = express();
const PORT = 3333;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Servidor rodando 🚀');
    });
});
