const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const request = require('request');
const axios = require('axios');
const {check, validationResult} = require("express-validator");

const User = require('../../models/Users')

// @route   GET /api/auth
// @desc    Test route
// @access  public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   GET /api/auth
// @desc    Authenticate user & get token
// @access  public
router.post('/', [
  check('email', 'Please include a valid email!').isEmail(),
  check('password', 'Password is required!').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;

  try {
    // See If user exists
    let user = await User.findOne({ email });
    if(! user){
      return res.status(400).json({ erros: [{msg: 'Invalid cridentials!'}] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ erros: [{msg: 'Invalid cridentials!'}] });
    }

    // return jwt
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
      if(err) throw err;
      res.json({token});
    });

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }

});

// Authorize with Github
router.get('/github', async (req, res) => {
  const code = req.query.code;

  if(!code) {
    return res.send({ msg: 'Server error', success: false });
  }
  try {
    const route = `https://github.com/login/oauth/access_token?client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}&code=${code}`;

    const token = await axios({
      method: 'post',
      url: route,
      headers: {
        accept: 'application/json'
      }
    });

    const access_token = token.data.access_token;

    const body = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'token ' + access_token
      }
    });

    res.json(body.data);

  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
