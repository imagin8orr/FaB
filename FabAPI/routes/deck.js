var express = require('express');
var router = express.Router();
var empty = require('is-empty');
var deckController = require('../controllers/deckController');

router.get('/pagination', function (req, res) {
    deckController.getAllDeck(req.trusted.user_id, function (err, card_data) {
        if (err) {
            console.log('deck/pagination : getAllDeck ', err);
            return res.status(500).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[2]
            });
        } else {
            return res.status(200).json({
                success: true,
                error: false,
                data: card_data,
                message: ''
            });
        }
    });
});


router.post('/add', function (req, res) {
    if (!req.body.name && !req.body.cards && !req.body.hero_card) {
        return res.status(404).json({
            success: false,
            error: true,
            data: Array(),
            message: _messages[2]
        });
    } else {
        var cards = req.body.cards;
        var cards_length = cards.length;
        if (cards_length < 5) {
            return res.status(404).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[20]
            });
        }
        if (cards_length > 80) {
            return res.status(404).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[21]
            });
        }

        if (empty(req.body.hero_card)) {
            return res.status(404).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[23]
            });
        }

        try {
            let insert_array = [[req.trusted.user_id, req.body.name, req.body.status ? req.body.status : 0, req.body.hero_card[0].card_id, req.body.hero_card[0].name]]
            deckController.createDeck(insert_array, function (err, deck_data) {
                if (err) {
                    console.log('deck/add : getAllDeck ', err);
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: Array(),
                        message: _messages[2]
                    });
                } else {
                    cards.forEach((card, index) => {
                        let insert_array = [[deck_data.insertId, card.card_id]]
                        deckController.insertCardDeck(insert_array, function (err, card_data) {
                            if (err) {
                                console.log('deck/pagination : getAllDeck ', err);
                                if (index == cards_length - 1) {
                                    return res.status(500).json({
                                        success: false,
                                        error: true,
                                        data: Array(),
                                        message: _messages[2]
                                    });

                                }
                            } else {
                                if (index == cards_length - 1) {
                                    return res.status(200).json({
                                        success: true,
                                        error: false,
                                        data: card_data,
                                        message: ''
                                    });

                                }
                            }
                        });
                    });
                }
            });
        } catch (e) {
            console.log('deck/add : General ', err);
            return res.status(500).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[2]
            });
        }
    }
});


router.post('/save', function (req, res) {
    if (!req.body.deck_id && !req.body.name && !req.body.cards && !req.body.hero_card) {
        return res.status(404).json({
            success: false,
            error: true,
            data: Array(),
            message: _messages[2]
        });
    } else {
        try {
            deckController.checkUserDeckIsExist(req.body.deck_id, req.trusted.user_id, function (err, deck_data) {
                if (err) {
                    console.log('deck/save : getAllDeck ', err);
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: Array(),
                        message: _messages[2]
                    });
                } else {
                    if (empty(deck_data)) {
                        return res.status(404).json({
                            success: false,
                            error: true,
                            data: Array(),
                            message: _messages[2]
                        });
                    } else {
                        var cards = req.body.cards;
                        var cards_length = cards.length;
                        if (cards_length < 5) {
                            return res.status(404).json({
                                success: false,
                                error: true,
                                data: Array(),
                                message: _messages[20]
                            });
                        }
                        if (cards_length > 80) {
                            return res.status(404).json({
                                success: false,
                                error: true,
                                data: Array(),
                                message: _messages[21]
                            });
                        }


                        if (empty(req.body.hero_card)) {
                            return res.status(404).json({
                                success: false,
                                error: true,
                                data: Array(),
                                message: _messages[23]
                            });
                        }

                        let update_array = [req.body.name, req.body.status ? req.body.status : 0, req.body.hero_card[0].card_id, req.body.hero_card[0].name, req.body.deck_id, req.trusted.user_id]
                        deckController.updateDeck(update_array, function (err, deck_data) {
                            if (err) {
                                console.log('deck/add : getAllDeck ', err);
                                return res.status(500).json({
                                    success: false,
                                    error: true,
                                    data: Array(),
                                    message: _messages[2]
                                });
                            } else {
                                if (!empty(req.body.removed_cards)) {
                                    removeCards(req, res)
                                } else {
                                    if (!empty(req.body.new_cards)) {
                                        addCards(req, res)
                                    } else {
                                        return res.status(200).json({
                                            success: true,
                                            error: false,
                                            data: Array(),
                                            message: ''
                                        });
                                    }
                                }
                            }
                        });

                    }
                }
            });
        } catch (e) {
            console.log('deck/add : General ', err);
            return res.status(500).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[2]
            });
        }
    }
});


function removeCards(req, res) {
    const _length = req.body.removed_cards.length - 1;
    req.body.removed_cards.forEach((card, index) => {
        deckController.deleteCardDeck(req.body.deck_id, card.card_id, function (err, card_data) {
            if (err) {
                console.log('deck/save : removeCards ', err);
                if (index == _length) {
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: Array(),
                        message: _messages[2]
                    });
                }
            } else {
                if (index == _length) {
                    if (!empty(req.body.new_cards)) {
                        addCards(req, res)
                    } else {
                        return res.status(200).json({
                            success: true,
                            error: false,
                            data: Array(),
                            message: ''
                        });
                    }
                }
            }
        });
    });
}

function addCards(req, res) {
    const _length = req.body.new_cards.length - 1;
    req.body.new_cards.forEach((card, index) => {
        let insert_array = [[req.body.deck_id, card.card_id]]
        deckController.insertCardDeck(insert_array, function (err, card_data) {
            if (err) {
                console.log('deck/save : removeCards ', err);
                if (index == _length) {
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: Array(),
                        message: _messages[2]
                    });
                }
            } else {
                if (index == _length) {
                    return res.status(200).json({
                        success: true,
                        error: false,
                        data: Array(),
                        message: ''
                    });
                }
            }
        });
    });
}

router.post('/view', function (req, res) {
    if (!req.body.deck_id) {
        return res.status(404).json({
            success: false,
            error: true,
            data: Array(),
            message: _messages[2]
        });
    } else {
        try {
            deckController.getViewDeckById(req.body.deck_id, req.trusted.user_id, function (err, deck_data) {
                if (err) {
                    console.log('deck/view : getAllDeck ', err);
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: Array(),
                        message: _messages[2]
                    });
                } else {
                    if (!empty(deck_data)) {
                        deckController.getDeckCards(req.body.deck_id, function (err, deck_cards_data) {
                            if (err) {
                                console.log('deck/view : getAllDeck ', err);
                                return res.status(500).json({
                                    success: false,
                                    error: true,
                                    data: Array(),
                                    message: _messages[2]
                                });
                            } else {
                                deckController.getCardByCardId(deck_data[0].hero_card_id, function (err, hero_cards_data) {
                                    if (err) {
                                        console.log('deck/view : getAllDeck ', err);
                                        return res.status(500).json({
                                            success: false,
                                            error: true,
                                            data: Array(),
                                            message: _messages[2]
                                        });
                                    } else {
                                        return res.status(200).json({
                                            success: true,
                                            error: false,
                                            data: {
                                                deck_info: deck_data[0],
                                                deck_cards: deck_cards_data,
                                                hero_card: hero_cards_data
                                            },
                                            message: ''
                                        });

                                    }
                                });

                            }
                        });
                    } else {
                        return res.status(404).json({
                            success: false,
                            error: true,
                            data: Array(),
                            message: _messages[2]
                        });
                    }

                }
            });
        } catch (e) {
            console.log('deck/view : General ', err);
            return res.status(500).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[2]
            });
        }
    }
});

router.post('/delete', function (req, res) {
    if (!req.body.deck_id) {
        return res.status(404).json({
            success: false,
            error: true,
            data: Array(),
            message: _messages[2]
        });
    } else {
        deckController.deleteDeck(req.body.deck_id, req.trusted.user_id, function (err, card_data) {
            if (err) {
                console.log('card/delete : deleteDeck ', err);
                return res.status(500).json({
                    success: false,
                    error: true,
                    data: Array(),
                    message: _messages[2]
                });
            } else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: card_data,
                    message: 'Deck ' + _messages[5]
                });
            }
        });
    }
});

module.exports = router;