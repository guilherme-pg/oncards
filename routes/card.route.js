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
cardRoutes.route('/:id').get(function (req, res) {
        let id = req.params.id;
        Card.findById(id)
        .then(card => {
            res.status(200).json({'status': 'success', 'card': card});
        })
        .catch(err => {
            res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong'});
        });
});



// UPDATE
cardRoutes.route('/update/:id').put((req, res) => {
    let id = req.params.id;
    Card.findById(id)
        .then(card => {
            card.question = req.body.question;
            card.answer = req.body.answer;
            card.classification = req.body.classification;

            card.save().then(business => {
                res.status(200).json({'status': 'success','mssg': 'Update complete'});
            })
        })
        .catch(err => {
            res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
        });
});



// DELETE
cardRoutes.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    Card.findOneAndDelete(id)
        .then(card => {
            res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
        })
        .catch(err => {
            res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
        });
});



module.exports = cardRoutes;
