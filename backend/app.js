const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauce = require('./models/sauce');



    
    
    const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const sauce = new sauce({ 
        ...req.body,
    });
    sauce.save() 
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
  });

app.get('/api/stuff/:id', (req, res, next) => { 
    sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json({ sauce }))
    .catch(error => res.status(400).json({ error }));
    });  


app.get('/api/stuff', (req, res, next) => {
    sauce.find()
    .then(sauces => res.status(200).json({ sauces }))
    .catch(error => res.status(400).json({ error }));
  });

module.exports = app;