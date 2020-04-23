const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const {check, validationResult} = require("express-validator");

const User = require('../../models/Users');
const AccessToken = require('../../models/AccessToken');

// @route   POST /api/users
// @desc    Register user
// @access  public
router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 7 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  let { name, email, password, avatar, bio } = req.body;
  const { access_token } = req.query;

  try {
    // See If user exists
    let user = await User.findOne({ email });
    if(user) {
      return res.json({ erros: [{msg: 'User already exists, Please Log in to continue!'}] });
    }

    // Get users avatar
    if(!avatar) {
      avatar = gravatar.url( email, { s: '200', r: 'pg', d: 'mm' } );
    }
    user = new User({ name, email, password, avatar, bio });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    if(access_token) {
      let accToken = await AccessToken.findOne({ user: user._id });
      if(!accToken) {
        accToken = new AccessToken({ _id: access_token, user: user._id });
        await accToken.save();
      }
      else {
        accToken._id = access_token;
        await accToken.save();
      }
    }

    // return jwt
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }

});

module.exports = router;
