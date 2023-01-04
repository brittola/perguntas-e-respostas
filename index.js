const express = require('express');
const app = express();
const connection = require('./database/database');
const Question = require('./database/Question');
const Reply = require('./database/Reply');

// Database
connection.authenticate()
    .then(() => { // Se a conexão funcionar
        console.log('Banco de dados conectado.');
    })
    .catch((err) => { // Se não funcionar
        console.log(err);
    });

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rotas
app.get('/', (req, res) => {
    // "raw: true" serve para trazer uma pesquisa "crua", ou seja,
    // sem informações além dos dados salvos
    Question.findAll({ raw: true, order: [
      ['id', 'DESC']
    ] }).then((questions) => {
        res.render('index', { questions });
    });
});

app.get('/ask', (req, res) => {
    res.render('ask');
});

app.post('/send-question', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;

    Question.create({
        title,
        description
    }).then(() => { 
        res.redirect('/');
    });
});

app.get('/question/:id', (req, res) => {
    const id = req.params.id;
    
    Question.findOne({
        where: { id },
        raw: true
    }).then(question => {
        if (question) {
            Reply.findAll({
                where: { repliedTo: id },
                raw: true,
                order: [['id', 'DESC']]
            }).then((replies) => {
                res.render('question', { question, replies });
            });
        } else {
            res.redirect('/');
        }
    });
});

app.post('/answer', (req, res) => {
    const body = req.body.body;
    const repliedTo = req.body.repliedTo;

    Reply.create({
        body,
        repliedTo
    }).then(() => {
        res.redirect('/question/' + repliedTo);
    });
});

// Abrindo servidor
app.listen(3000, (err) => {
    if (err) { console.log('Houve um erro: ' + err); }
    else { console.log('Server running on PORT: 3000'); }
});