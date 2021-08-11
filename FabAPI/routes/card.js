var express = require('express');
var router = express.Router();
var cardController = require('../controller/cardController');
var _messages = [];

_messages[0] = 'Something went wrong, Please Contact Technical Team.';
_messages[1] = 'Unauthorized access.';
_messages[2] = 'Data is invalid.';
_messages[3] = 'is added successfully.';
_messages[4] = 'is edited successfully.';
_messages[5] = 'is deleted successfully.';

/* GET card listing. */
router.get('/list', function (req, res) {
  cardController.getAllCards(function (err, card_data) {
    if (err) {
      console.log('card/list : getAllCards ', err);
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

router.post('/getById', function (req, res) {
  if (!req.body.card_id) {
    return res.status(404).json({
      success: false,
      error: true,
      data: Array(),
      message: _messages[2]
    });
  } else {
    cardController.getCardByCardId(req.body.card_id, function (err, card_data) {
      if (err) {
        console.log('card/getById : getCardByCardId ', err);
        return res.status(500).json({
          success: false,
          error: true,
          data: Array(),
          message: _messages[2]
        });
      } else {
        if (card_data[0]) {
          card_data[0]['id'] = card_data[0].card_id;
          card_data[0]['pic'] = card_data[0].image_url;
          card_data[0]['set'] = card_data[0].card_set;
          card_data[0]['tags'] = card_data[0].tags ? card_data[0].tags.split(',') : [];
          card_data[0]['rarity'] = card_data[0].rarity ? card_data[0].rarity.split(',') : [];
        }
        return res.status(200).json({
          success: true,
          error: false,
          data: card_data,
          message: ''
        });
      }
    });
  }
});

router.post('/add', function (req, res) {
  // if (!req.body.name) {
  //   return res.status(404).json({
  //     success: false,
  //     error: true,
  //     data: Array(),
  //     message: _messages[2]
  //   });
  // } else {
  var insert_array = [[req.body.name, req.body.type, req.body.class, req.body.set, req.body.rarity.toString(), req.body.pic, req.body.attack, req.body.bonus_attack, req.body.block, req.body.bonus_block, req.body.pitch, req.body.cost, req.body.tags.toString()]];

  cardController.addNewCard(insert_array, function (err, card_data) {
    if (err) {
      console.log('card/add : addNewCard ', err);
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
  //}
});

router.post('/save', function (req, res) {
  // if (!req.body.name) {
  //   return res.status(404).json({
  //     success: false,
  //     error: true,
  //     data: Array(),
  //     message: _messages[2]
  //   });
  // } else {
  var update_array = [req.body.name, req.body.type, req.body.class, req.body.set, req.body.rarity.toString(), req.body.pic, req.body.attack, req.body.bonus_attack, req.body.block, req.body.bonus_block, req.body.pitch, req.body.cost, req.body.tags.toString(), req.body.card_id];

  cardController.updateNewCard(update_array, function (err, card_data) {
    if (err) {
      console.log('card/save : updateNewCard ', err);
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
  // }
});

router.post('/delete', function (req, res) {
  if (!req.body.card_id) {
    return res.status(404).json({
      success: false,
      error: true,
      data: Array(),
      message: _messages[2]
    });
  } else {
    cardController.deleteCard(req.body.card_id, function (err, card_data) {
      if (err) {
        console.log('card/getById : getCardByCardId ', err);
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
  }
});


module.exports = router;
