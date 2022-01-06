var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var empty = require('is-empty');
var userController = require('../controllers/userController');
var commonController = require('../controllers/commonController');
var cardController = require('../controllers/cardController');
const mailer = require('../helpers/mailer');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/signup', function (req, res) {
	if (!req.body.password || !req.body.email || !req.body.phone || !req.body.screen_name) {
		return res.status(404).json({
			success: false,
			error: true,
			data: Array(),
			message: _messages[2]
		});
	} else {
		userController.checkEmailIsExist(req.body.email, function (err, result) {
			if (err) {
				console.log('webhook/signup : checkEmailIsExist:', err);
				return res.status(500).json({
					success: false,
					error: true,
					data: Array(),
					message: _messages[10]
				});
			}
			if (!empty(result)) {
				console.log('webhook/signup : checkEmailIsExist ' + _messages[10], err);
				return res.status(409).json({
					success: false,
					error: true,
					data: Array(),
					message: _messages[10]
				});
			} else {
				commonController.bcryptPassword(req.body.password, function (err, hash) {
					if (err) {
						console.log('webhook/signup : bcryptPassword', err);
						return res.status(500).json({
							success: false,
							error: true,
							data: Array(),
							message: _messages[0]
						});
					} else {
						const Insert_array = [
							[req.body.username, req.body.email, req.body.screen_name, hash, req.body.phone, req.body.address]
						];
						userController.createUser(Insert_array, function (err, created_user_result) {
							if (err) {
								console.log('webhook/signup : createUser ', err);
								return res.status(500).json({
									success: false,
									error: true,
									data: err,
									message: _messages[0]
								});
							} else {
								commonController.get_jwt_token(created_user_result.insertId, req.body.email, function (err, token) {
									if (err) {
										console.log('users/signup : get_jwt_token', err);
										return res.status(500).json({
											success: false,
											error: true,
											data: Array(),
											message: _messages[0]
										});
									} else {
										const data_list = {
											user_id: created_user_result.insertId,
											email: req.body.email,
											username: req.body.username ? req.body.username : null,
											profile: null,
											user_type: 2
										};
										return res.status(200).json({
											success: true,
											error: false,
											data: data_list,
											token: 'JWT ' + token,
											message: _messages[6]
										});
									}
								});
							}
						});
					}
				});
			}
		});
	}
});

router.post('/login', function (req, res) {
	if (!req.body.password || !req.body.email) {
		return res.status(404).json({
			success: false,
			error: true,
			data: Array(),
			message: _messages[2]
		});
	} else {
		var email = req.body.email.trim();
		userController.checkUser(email, function (err, result) {
			if (err) {
				console.log('webhook/login : Check email already exist:', err);
				return res.status(500).json({
					success: false,
					error: true,
					data: Array(),
					message: _messages[10]
				});
			}
			if (empty(result)) {
				console.log('webhook/login : ' + _messages[12]);
				return res.status(409).json({
					success: false,
					error: true,
					data: Array(),
					message: 'User' + _messages[12]
				});
			} else {
				if (empty(result[0].password)) {
					return res.status(410).json({
						success: false,
						error: true,
						data: Array(),
						message: _messages[16]
					});
				} else {
					CheckPassword(result, result[0].password, req, res);
				}
			}
		});
	}
});

function CheckPassword(result, password_field_name, req, res) {
	bcrypt.compare(req.body.password, password_field_name, function (err, isMatch) {
		if (err) {
			console.log('webhook/login: CheckPassword : bcrypt.compare in CheckPassword() ', err);
			return res.status(500).json({
				success: false,
				error: true,
				data: Array(),
				message: _messages[0]
			});
		}
		if (isMatch) {
			commonController.get_jwt_token(result[0].user_id, result[0].email, function (err, token) {
				if (err) {
					console.log('webhook/login: CheckPassword : get_jwt_token', err);
					return res.status(500).json({
						success: false,
						error: true,
						data: Array(),
						message: _messages[0]
					});
				} else {
					return res.status(200).json({
						success: true,
						error: false,
						data: {
							user_id: result[0].user_id,
							email: result[0].email,
							username: result[0].username,
							profile: result[0].profile,
							user_type: 2
						},
						token: 'JWT ' + token,
						message: _messages[6]
					});
				}
			});
		} else {
			console.log('webhook/login : CheckPassword() ' + _messages[11]);
			return res.status(401).json({
				success: false,
				error: true,
				data: Array(),
				message: _messages[11]
			});
		}
	});
}


router.post('/verify-token', function (req, res) {
	if (!req.body.token) {
		return res.status(404).json({
			success: false,
			error: true,
			data: Array(),
			message: _messages[2]
		});
	} else {
		try {
			jwt.verify(req.body.token, process.env.JWT_SECRET_TOKEN, function (err, decoded) {
				if (err) {
					console.log(err);
					return res.status(401).json({
						success: false,
						error: true,
						data: Array(),
						message: _messages[17]
					});
				} else {
					var token_data = decoded;
					commonController.check_secret_code_is_exist(token_data.user_id, function (err, secretcode_result) {
						if (err) {
							console.log('verify/verify-token : check_secret_code_is_exist', err);
							return res.status(500).json({
								success: false,
								error: true,
								data: Array(),
								message: _messages[0]
							});
						} else {
							if (empty(secretcode_result)) {
								return res.status(500).json({
									success: false,
									error: true,
									data: Array(),
									message: _messages[17]
								});
							} else {
								return res.status(200).json({
									success: true,
									error: false,
									data: Array(),
									message: 'Token is Valid '
								});
							}
						}
					});

				}
			});
		} catch (e) {
			console.log(e)
				;
		}

	}
});

router.post('/reset', function (req, res) {
	if (!req.body.password || !req.body.token) {
		return res.status(404).json({
			success: false,
			error: true,
			data: Array(),
			message: _messages[2]
		});
	} else {
		jwt.verify(req.body.token, process.env.JWT_SECRET_TOKEN, function (err, decoded) {
			if (err) {
				console.log(err);
				return res.status(401).json({
					success: false,
					error: true,
					data: Array(),
					message: _messages[17]
				});
			} else {
				var token_data = decoded;
				commonController.bcryptPassword(req.body.password, function (err, hash) {
					if (err) {
						console.log('verify/reset : bcryptPassword', err);
						return res.status(500).json({
							success: false,
							error: true,
							data: Array(),
							message: _messages[0]
						});
					} else {
						userController.updateUserPassword(hash, token_data.email, function (err, update_pwd) {
							if (err) {
								console.log('verify/reset : updateUserPassword ', err);
								return res.status(500).json({
									success: false,
									error: true,
									data: err,
									message: _messages[0]
								});
							} else {
								return res.status(200).json({
									success: true,
									error: false,
									data: update_pwd,
									message: 'Your  Password is changed ' + _messages[13]
								});
							}
						});
					}
				});

			}
		});
	}
});

router.post('/forgot-password', function (req, res) {
	if (!req.body.email) {
		return res.status(404).json({
			success: false,
			error: true,
			data: Array(),
			message: _messages[2]
		});
	} else {
		userController.getUserIdByEmail(req.body.email, function (err, user_info) {
			if (err) {
				console.log('verify/forgot-password : getUserIdByEmail', err);
				return res.status(500).json({
					success: false,
					error: true,
					data: Array(),
					message: _messages[0]
				});
			} else {
				if (empty(user_info)) {
					return res.status(500).json({
						success: false,
						error: true,
						data: Array(),
						message: 'User ' + _messages[12]
					});
				} else {
					commonController.check_secret_code_is_exist(user_info[0].user_id, function (err, secretcode_result) {
						if (err) {
							console.log('verify/forgot-password : check_secret_code_is_exist', err);
							return res.status(500).json({
								success: false,
								error: true,
								data: Array(),
								message: _messages[0]
							});
						} else {
							if (!empty(secretcode_result)) {
								commonController.delete_secret_code(user_info[0].user_id, function (err, secretcode_result) {
									if (err) {
										console.log('verify/forgot-password : delete_secret_code', err);
										return res.status(500).json({
											success: false,
											error: true,
											data: Array(),
											message: _messages[0]
										});
									} else {
										if (!empty(secretcode_result)) {
											generateEmailToken(user_info, req, res)
										}
									}
								});
							} else {
								generateEmailToken(user_info, req, res);
							}
						}
					});
				}
			}
		});
	}
});

function generateEmailToken(user_info, req, res) {
	try {
		commonController.get_verify_email_jwt_token(user_info[0].user_id, req.body.email, function (err, token) {
			if (err) {
				console.log('verify/forgot-password : get_verify_email_jwt_token', err);
				return res.status(500).json({
					success: false,
					error: true,
					data: Array(),
					message: _messages[0]
				});
			} else {
				var insert_array = [[user_info[0].user_id, req.body.email, token]];
				commonController.insert_email_secret_code(insert_array, function (err, inserted_secretcode_result) {
					if (err) {
						console.log('verify/forgot-password : insert_email_secret_code', err);
						return res.status(500).json({
							success: false,
							error: true,
							data: Array(),
							message: _messages[0]
						});
					} else {
						var url = process.env.SITE_URL + 'reset/' + token;

						console.log(url);
						try {
							mailer.forgot_password_mail(req.body.email, url, user_info[0].username);
							return res.status(200).json({
								success: true,
								error: false,
								data: Array(),
								message: 'Email sent ' + _messages[13]
							});
						} catch (e) {
							return res.status(500).json({
								data: e,
								message: _messages[0]
							});
						}
					}
				});
			}
		});
	} catch (e) {
		console.log(e);
	}
}


router.get('/cards', function (req, res) {
	cardController.getAllCards(null, function (err, card_data) {
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


router.get('/decks', function (req, res) {
	deckController.getAllDeck(null, function (err, card_data) {
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

router.post('/deck-view', function (req, res) {
	if (!req.body.deck_id) {
		return res.status(404).json({
			success: false,
			error: true,
			data: Array(),
			message: _messages[2]
		});
	} else {
		try {
			deckController.getDeckById(req.body.deck_id, function (err, deck_data) {

				console.log(deck_data, 'deck_data')
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









const axios = require("axios");
router.get('/insertCards/:page', function (req, res) {
	try {
		const BASE_URL = `https://api.fabdb.net/cards?per_page=50&page=` + req.params.page;
		axios({
			method: "GET",
			url: BASE_URL
		}).then((response) => {
			const dataString = JSON.stringify(response.data.data);
			const data = JSON.parse(dataString);
			const _length = data.length - 1;

			data.forEach((element, i) => {
				var insertCard = [];
				const prints_array = element.printings.map(e => e.set).filter(e => e != null);

				insertCard['set'] = prints_array[0] ? prints_array[0] : null;
				if (element.rarity == 'R') {
					insertCard['rarity'] = 'Rare';
				} if (element.rarity == 'C') {
					insertCard['rarity'] = 'Common';
				} if (element.rarity == 'F') {
					insertCard['rarity'] = 'Fabled';
				} if (element.rarity == 'L') {
					insertCard['rarity'] = 'Legendary';
				} if (element.rarity == 'M') {
					insertCard['rarity'] = 'Majestic';
				} if (element.rarity == 'P') {
					insertCard['rarity'] = 'Promo';
				} if (element.rarity == 'S') {
					insertCard['rarity'] = 'Super Rare';
				} if (element.rarity == 'T') {
					insertCard['rarity'] = 'Tournament Prize';
				}

				insertCard['name'] = element.name;
				insertCard['cost'] = element.stats.cost ? element.stats.cost : 0;
				insertCard['pic'] = element.image;
				insertCard['tags'] = element.keywords.join(",");
				insertCard['attack'] = element.stats?.attack ? element.stats.attack : 1;
				insertCard['bonus_attack'] = 0;
				insertCard['block'] = element.stats.defense ? element.stats.defense : 1;
				insertCard['bonus_block'] = 0;
				insertCard['pitch'] = 1;

				const BASE_URL2 = `https://api.fabdb.net/cards/` + element.identifier;
				axios({
					method: "GET",
					url: BASE_URL2
				}).then((card_response) => {
					if (card_response.data.type) {
						const type_string = card_response.data.type;
						insertCard['type'] = type_string.charAt(0).toUpperCase() + type_string.slice(1);
					} else {
						insertCard['type'] = null
					}

					if (card_response.data.class) {
						const class_string = card_response.data.class;
						insertCard['class'] = class_string.charAt(0).toUpperCase() + class_string.slice(1);
					} else {
						insertCard['class'] = null
					}

					var insert_array = [[insertCard.name, insertCard.type, insertCard.class, insertCard.set, insertCard.rarity, insertCard.pic, insertCard.attack, insertCard.bonus_attack, insertCard.block, insertCard.bonus_block, insertCard.pitch, insertCard.cost, insertCard.tags, 2]];

					cardController.addNewCard(insert_array, function (err, card_data) {
						if (err) {
							console.log('card/add : addNewCard ', err);
							if (_length == i) {
								return res.status(500).json({
									success: false,
									error: true,
									data: Array(),
									message: _messages[2]
								});
							}
						} else {
							if (_length == i) {
								return res.status(200).json({
									data: response.data.data,
									links: response.data.links,
									// meta: response.data.meta,
									card_response: card_response.data
								});
							}
						}
					});



				});
			});

		});
		//	var cards = JSON.parse(response.data.data);


	} catch (e) {
		console.log(e);
	}

});



module.exports = router;