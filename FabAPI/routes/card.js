var express = require('express');
var router = express.Router();
var cardController = require('../controllers/cardController');
var empty = require('is-empty');

/* GET card listing. */
router.get('/pagination', function (req, res) {
  cardController.getAllCards(req.trusted.user_id, function (err, card_data) {
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
    cardController.getCardByCardId(req.body.card_id, req.trusted.user_id, function (err, card_data) {
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


router.post('/infoById', function (req, res) {
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
        console.log('card/infoById : getCardByCardId ', err);
        return res.status(500).json({
          success: false,
          error: true,
          data: Array(),
          message: _messages[2]
        });
      } else {
        if (!empty(card_data)) {
          if (!empty(card_data[0].tags)) {
            var tags = [];

            if (card_data[0].tags.indexOf(',') > -1) {
              const arrayTag = card_data[0].tags.split(',');
              arrayTag.forEach(e => {
                tags.push({ display: e, value: e });
              });
            } else {
              tags.push({ display: card_data[0].tags, value: card_data[0].tags });
            }
            card_data[0]['tags'] = tags;
          }


          if (!empty(card_data[0].rarity)) {
            var rarity = [];

            if (card_data[0].rarity.indexOf(',') > -1) {
              rarity = card_data[0].rarity.split(',');
            } else {
              rarity = [card_data[0].rarity];
            }
            card_data[0]['rarity'] = rarity;
          }

          return res.status(200).json({
            success: true,
            error: false,
            data: card_data[0],
            message: ''
          });
        } else {
          return res.status(500).json({
            success: false,
            error: true,
            data: Array(),
            message: 'Card ' + _messages[15]
          });
        }
      }
    });
  }
});


router.post('/add', function (req, res) {
  if (!req.body.name) {
    return res.status(404).json({
      success: false,
      error: true,
      data: Array(),
      message: _messages[2]
    });
  } else {
    var tags = null;
    if (req.body.tags) {
      tags = '';
      const tags_legth = req.body.tags.length - 1;
      req.body.tags.forEach((element, i) => {
        if (tags_legth == i) {
          tags += element.display
        } else {
          tags += element.display + ','
        }
      });



    }
    var insert_array = [[req.body.name, req.body.type, req.body.class, req.body.set, req.body.rarity.toString(), req.body.image_url, req.body.attack, req.body.bonus_attack, req.body.block, req.body.bonus_block, req.body.pitch, req.body.cost, tags, req.trusted.user_id]];

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
  }
});

router.post('/save', function (req, res) {
  if (!req.body.name || !req.body.card_id) {
    return res.status(404).json({
      success: false,
      error: true,
      data: Array(),
      message: _messages[2]
    });
  } else {
    var tags = null;
    if (req.body.tags) {
      tags = '';
      const tags_legth = req.body.tags.length - 1;
      req.body.tags.forEach((element, i) => {
        if (tags_legth == i) {
          tags += element.display
        } else {
          tags += element.display + ','
        }
      });
    }
    var update_array = [req.body.name, req.body.type, req.body.class, req.body.set, req.body.rarity.toString(), req.body.image_url, req.body.attack, req.body.bonus_attack, req.body.block, req.body.bonus_block, req.body.pitch, req.body.cost, tags, req.body.card_id, req.trusted.user_id];

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
  }
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
    cardController.deleteCard(req.body.card_id, req.trusted.user_id, function (err, card_data) {
      if (err) {
        console.log('card/delete : deleteCard ', err);
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
          message: 'Card ' + _messages[5]
        });
      }
    });
  }
});


module.exports = router;
