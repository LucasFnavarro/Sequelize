import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql2';

import { sequelize } from './db/connection.js';
import { User } from './models/User.js';

const app = express();
const PORT = 3333;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Servidor rodando 🚀');
    });
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true });

    res.render('home', { users: users });
});

app.get('/users/create', (req, res) => {
    res.render('adduser');
});

app.post('/users/create', async (req, res) => {
    // const name = req.body.name;
    // const occupation = req.body.occupation;
    // let newsletter = req.body.newsletter;

    let { name, occupation, newsletter } = req.body;

    // checkbox do formulario
    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({ name, occupation, newsletter });
    return res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ raw: true, where: { id: id } });

    res.render('userview', { user: user });
});

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ raw: true, where: { id: id } })

    res.render('useredit', { user: user })
});

app.post('/users/edit', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    const userData = { id, name, occupation, newsletter }
    await User.update(userData, { where: { id: id } });
    res.redirect('/');
});

app.post('/users/delete/:id', async (req, res) => {
    const { id } = req.params;

    await User.destroy({ where: { id: id } });
    res.redirect('/');
});