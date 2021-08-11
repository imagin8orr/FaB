
module.exports = {
    getCardByCardId: function (card_id, callback) {
        try {
            con.query('SELECT * FROM `cards` WHERE card_id = ?;', [card_id], function (err, user_data) {
                return callback(err, user_data);
            });
        } catch (err) {
            console.log(err, 'err');
        }
    },
    getAllCards: function (callback) {
        try {
            con.query('SELECT * FROM cards', function (err, card_data) {
                console.log(err, 'err');
                return callback(err, card_data);
            });
        } catch (err) {
            console.log(err, 'err');
        }

    },
    addNewCard: function (insert_array, callback) {
        try {
            con.query('INSERT INTO cards(name, type, class, card_set, rarity, image_url, attack, bonus_attack, block, bonus_block, pitch, cost, tags) VALUES ?;', [insert_array], function (err, user_data) {
                return callback(err, user_data);
            });
        } catch (err) {
            console.log(err, 'err');
        }
    },
    updateNewCard: function (update_array, callback) {
        try {
            con.query('UPDATE `cards` SET name=?, type=?, class=?, card_set=?, rarity=?, image_url=?, attack=?, bonus_attack=?, block=?, bonus_block=?, pitch=?, cost=?, tags=? WHERE card_id = ?;',
                update_array, function (err, updated) {
                    return callback(err, updated);
                });
        } catch (err) {
            console.log(err, 'err');
        }
    },
    deleteCard: function (card_id, callback) {
        try {
            con.query('DELETE FROM `cards` WHERE card_id = ?', [card_id], function (err, user_data) {
                return callback(err, user_data);
            });
        } catch (err) {
            console.log(err, 'err');
        }
    },
}