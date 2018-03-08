"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/env_config');

const jwtMiddleware = {
	start: name => {
		jwt.sign({
			name: name,
			expiresIn: config.expiresIn
		}, config.secret);

		this.name = name;
	},
	verify: (req, res, next) => {
		jwt.verify(req.body.token, config.secret, function callback(err, decoded) {
			if (decoded === this.name) {
				next();
			} else {
				// verified failed, redirect to login
				res.redirect('/login?verify_failed');
			}
		});
	},
	end: () => {
		this.name = '';
	}
};

module.exports = jwtMiddleware;