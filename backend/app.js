const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauce = require('./models/sauce');


mongoose.connect('mongodb+srv://AmrDevProjetSix:password@clusterhottakes.6vzg70w.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    
    
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

app.put('/api/stuff/:id', (req, res, next) => { 
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet mis à jour !' }))
    .catch(error => res.status(400).json({ error }));  
});

app.delete('/api/stuff/:id', (req, res, next) => { 
    sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
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