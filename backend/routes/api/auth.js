const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const {check, validationResult} = require("express-validator");

const User = require('../../models/Users')

// @route   GET /api/auth
// @desc    Get User
// @access  public
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    console.log(e.message);
    res.status(401).send('Server error!');
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

  const { email, password } = req.body;

  try {
    // See If user exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if(!user) {
      return res.status(400).json({ errors: [{msg: 'Invalid cridentials!'}] });
    }
    if(!user.confirmed) {
      return res.status(400).json({ errors: [{msg: 'Email has not been confirmed yet! Please, confirm your email.'}] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      console.log('Not Match!');
      return res.status(400).json({ errors: [{msg: 'Invalid cridentials!'}] });
    }

    // return jwt
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, (err, token) => {
      if(err) throw err;
      res.json({token});
    });

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }

});

// Authorize with Github
router.get('/oauth-callback', async (req, res) => {
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
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    const access_token = token.data.access_token;

    const body = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'token ' + access_token,
        Accept: 'application/json'
      }
    });

    const name = body.data.name;
    const email = body.data.email;
    const password = body.data.node_id;
    const avatar = body.data.avatar_url;
    const bio = body.data.bio;

    const payload = JSON.stringify({ name, email, password, avatar, bio });

    const regRes = await axios.post(`http://localhost:8000/api/users?access_token=${access_token}`, payload,
      { headers: { 'Content-Type': 'application/json' }
    });
    if (regRes.data.token) {
      const { token } = regRes.data;
      res.json({ token });
    }
    else {
      await axios.post('http://localhost:8000/api/auth', { email, password },
        { headers: { 'Content-Type': 'application/json' }
      })
      .then(logRes => {
        const { token } = logRes.data;
        res.json({ token });
      })
      .catch(err => res.status(500).send('Server error!'));
    }

  } catch (e) {
    console.log(e.message);
    res.status(500).send('Server error!');
  }
});

module.exports = router;
