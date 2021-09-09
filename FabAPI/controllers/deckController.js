
module.exports = {
    getAllDeck: function (user_id, callback) {
        try {
            if (user_id) {
                con.query('SELECT deck_id, deck_name FROM deck WHERE user_id = ?', [user_id], function (err, deck_data) {
                    return callback(err, deck_data);
                });
            } else {
                con.query('SELECT deck_id, deck_name FROM deck WHERE status = 1', function (err, deck_data) {
                    return callback(err, deck_data);
                });
            }
        } catch (err) {
            console.log(err, 'err in getAllDeck');
        }
    },
    getDeckById: function (deck_id, user_id, callback) {
        try {
            if(user_id){
                con.query('SELECT deck_id, deck_name, status FROM deck WHERE deck_id = ? AND user_id = ?', [deck_id, user_id], function (err, deck_data) {
                    return callback(err, deck_data);
                });
            }else{
                con.query('SELECT deck_id, deck_name, status FROM deck WHERE deck_id = ? AND status = 1', [deck_id], function (err, deck_data) {
                    return callback(err, deck_data);
                });
            }
            
        } catch (err) {
            console.log(err, 'err in getDeckById');
        }
    },
    getDeckCards: function (deck_id, callback) {
        try {
            con.query('SELECT cards.card_id, cards.name, cards.pitch, cards.type, cards.image_url FROM `cards` RIGHT JOIN deck_cards ON deck_cards.card_id = cards.card_id WHERE deck_cards.deck_id = ?', [deck_id], function (err, deck_data) {
                return callback(err, deck_data);
            });
        } catch (err) {
            console.log(err, 'err in getDeckById');
        }
    },
    createDeck: function (insert_array, callback) {
        try {
            con.query('INSERT INTO deck(user_id, deck_name, status) VALUES ?;', [insert_array], function (err, deck_data) {
                return callback(err, deck_data);
            });
        } catch (err) {
            console.log(err, 'err in createDeck');
        }
    },
    updateDeck: function (update_array, callback) {
        try {
            con.query('UPDATE `deck` SET deck_name=?, status=? WHERE deck_id = ? AND user_id = ?;',
                update_array, function (err, updated) {
                    return callback(err, updated);
                });
        } catch (err) {
            console.log(err, 'err in updateDeck');
        }
    },
    insertCardDeck: function (insert_array, callback) {
        try {
            con.query('INSERT INTO deck_cards(deck_id, card_id) VALUES ?;', [insert_array], function (err, updated) {
                return callback(err, updated);
            });
        } catch (err) {
            console.log(err, 'err in insertCardDeck');
        }
    },
    deleteCardDeck: function (deck_id, card_id, callback) {
        try {
            con.query('DELETE FROM `deck_cards` WHERE deck_id = ? AND card_id = ? LIMIT 1', [deck_id, card_id], function (err, user_data) {
                return callback(err, user_data);
            });
        } catch (err) {
            console.log(err, 'err in deleteCardDeck');
        }
    },
    deleteDeck: function (deck_id, user_id, callback) {
        try {
            con.query('DELETE FROM `deck` WHERE deck_id = ? AND user_id = ?; DELETE FROM `deck_cards` WHERE deck_id = ?', [deck_id, user_id, deck_id], function (err, user_data) {
                return callback(err, user_data);
            });
        } catch (err) {
            console.log(err, 'err in deleteDeck');
        }
    },
    checkUserDeckIsExist: function (deck_id, user_id, callback) {
        try {
            con.query('SELECT deck_id FROM deck WHERE deck_id = ? AND user_id = ?', [deck_id, user_id], function (err, deck_data) {
                return callback(err, deck_data);
            });
        } catch (err) {
            console.log(err, 'err in checkUserDeckIsExist');
        }
    },
}