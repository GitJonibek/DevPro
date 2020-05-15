const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const {check, validationResult} = require("express-validator");

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  rejectUnauthorized: false,
  auth: {
    user: 'norboev707@gmail.com',
    pass: 'vaqllfcjdzuxunjy',
  },
});

const User = require('../../../models/Users');
const AccessToken = require('../../../models/AccessToken');

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

  let { name, email, password, avatar, bio, subscribed } = req.body;

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
    user = new User({ name, email, password, avatar, bio, subscribed });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // return jwt
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, async (err, token) => {
      if(err) throw err;
      // res.json({ token });

      let accToken = new AccessToken({ _id: token, user: user._id });
      await accToken.save();

      const url = `${config.get('host')}/api/users/confirmation/${token}`;

      await transporter.sendMail({
        from: 'DevPro Team: <dv-team@devpro.com>',
        to: user.email,
        subject: 'Confirm Your Email!',
        html: `Please click this link to confirm your email: <a href='${url}'>${url}</a>`
      })
      .then(resp => {
        res.json({msg: `Varification token sent to <${user.email}>`})
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error');
      })

    });

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }

});

router.get('/confirmation/:token', async (req, res) => {

  const { token } = req.params;
  let accToken = await AccessToken.findOne({ _id: token });
  let user = null;
  try {
    let decoded = jwt.verify(token, config.get('jwtSecret'));
    let user = decoded ? await User.findById({_id: decoded.user.id}) : null;

    if(user) {
      if(user.confirmed) {
        return res.status(400).send('Account has already been varified! Please. login to continue');
      }
      user.confirmed = true;
      await user.save();

      console.log('/confirmation/:token ->', user);

      res.set('Content-Type', 'text/html');
      let html = `Account varified! Login to continue. <a href="${config.get('host')}/login">Login To Continue!</a>`
      res.status(200).send(new Buffer(html));
    }

  } catch (e) {
    console.error(e.message);
    if(accToken) {
      user = await User.findById({_id: accToken.user});
      let html = `Session expired! Click here to resend new link
      <a href="${config.get('host')}/api/users/resend/${token}">Resend The Link!</a>`;

      res.set('Content-Type', 'text/html');
      res.status(400).send(html);
    }
    else {
      res.status(500).send('Server Error!');
    }

  }


});

router.get('/resend/:token', async (req, res) => {
  const { token } = req.params;

  try {
    let access_token = await AccessToken.findById(token);

    const user = await User.findById(access_token.user).select('-password');
    // return jwt
    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, async (err, new_token) => {
      if(err) throw err;
      console.log(access_token._id);
      await AccessToken.deleteOne({_id: access_token._id});
      const newAccToken = new AccessToken({ _id: new_token, user: access_token.user });
      await newAccToken.save();
      console.log(newAccToken._id);
      const url = `http://localhost:8000/api/users/confirmation/${new_token}`;

      await transporter.sendMail({
        from: 'DevPro Team: <dv-team@devpro.com>',
        to: user.email,
        subject: 'Confirm Your Email!',
        html: `Please click this link to confirm your email: <a href='${url}'>${url}</a>`
      })
      .then(resp => {
        res.send(`Varification token sent to your email address: <${user.email}>`)
      })
      .catch(err => {
        console.error(err.message);
        res.status(400).send('Server Error');
      });

    });

  } catch (e) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

module.exports = router;
