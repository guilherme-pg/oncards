const express = require('express');
const app = express();
const cardRoutes = express.Router();

let Card = require('../model/Card');


// CREATE
cardRoutes.route('/add').post(function (req, res) {
    let card = new Card(req.body);
    card.save()
        .then(card => {
            res.status(200).json({'status': 'sucess', 'msg':'Card added successfully'});
        })
        .catch(err => {
            res.status(409).send({'status':'failure', 'msg':'Unable to save to database'});
        });
});


// READ ALL
cardRoutes.route('/allcards').get(async function (req, res) {
    try {
        const cards = await Card.find();
        res.status(200).json({ 'status': 'success', 'cards': cards });
    } catch (err) {
        res.status(400).json({ 'status': 'failure', 'msg': 'Something went wrong' });
    };
});


// READ ID
cardRoutes.route('/card/:id').get(async function (req, res) {
    try {
        let id = req.params.id;
        let card = await Card.findById(id);
        if (card) {
            res.status(200).send({'status':'success', 'card': card});
        } else {
            res.status(404).json({'status': 'failure', 'msg':'Card not found'});
        };
    } catch (err) {
        res.status(400).json({'status': 'failure', 'msg':'Something went wrong'});
    };
});


// UPDATE
cardRoutes.route('/update/:id').put(function (req, res) {
    Card.findById(req.params.id, function (err, card) {
        if (!card) {
            res.status(400).send({'status': 'failure', 'msg': 'Unable to find data.'});
        } else {
            card.question = req.body.question;
            card.answer = req.body.answer;
            card.classification = req.body.classification;

            card.save()
                    .then(card => {
                        res.status(200).json({'status': 'sucess', 'msg':'Card added successfully'});
                    })
                    .catch(err => {
                        res.status(500).send({'status':'failure', 'msg':'Unable to save to database'});
                    });
        };
    });
});


// DELETE
cardRoutes.route('/delete/:id').delete(function (req, res) {
    Card.findByIdAndDelete({_id: req.params.id}, function(err,) {
        if (err) {
            res.status(400).send({'status': 'failure', 'msg': 'Something went wrong.'});
        } else {
            res.status(200).json({'status': 'sucess', 'msg':'Card added successfully'});
        };
    });
});

module.exports = cardRoutes;
