const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const axios = require('axios');
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/Users');

// @route   GET /api/profile/me
// @desc    Test route
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {

    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({msg: 'No profile for this user!'});
    }

    res.json(profile);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!')
  }
});

// @route   Post /api/profile
// @desc    Create || Update
// @access  Private
router.post('/', [ auth, [
  check('status', 'status is required!').not().isEmpty(),
  check('skills', 'Skills are required!').not().isEmpty(),
  check('githubusername', 'GitHub username is required!').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req);
   if(!errors.isEmpty()){
     return res.status(400).json({errors: errors.array()});
   }

   const {
     company,
     website,
     location,
     bio,
     status,
     githubusername,
     skills,
     youtube,
     facebook,
     twitter,
     instagram,
     linkedin
   } = req.body;

   const profileFields = {};
   profileFields.user = req.user.id;

   if(company) profileFields.company = company;
   if(website) profileFields.website = website;
   if(location) profileFields.location = location;
   if(bio) profileFields.bio = bio;
   if(status) profileFields.status = status;
   if(githubusername) profileFields.githubusername = githubusername;
   if(skills) profileFields.skills = (Array.isArray(skills)) ? skills : skills.split(',').map(skill => skill.trim());

   profileFields.social = {}
   if(youtube) profileFields.social.youtube = youtube;
   if(facebook) profileFields.social.facebook = facebook;
   if(twitter) profileFields.social.twitter = twitter;
   if(instagram) profileFields.social.instagram = instagram;
   if(linkedin) profileFields.social.linkedin = linkedin;

   if(githubusername) {
     const body = await axios.get(`https://api.github.com/users/${githubusername}`);
     await User.updateOne({_id: req.user.id}, { $set: { avatar: body.data.avatar_url }});
     await Post.updateMany({user: req.user.id}, { $set: { avatar: body.data.avatar_url }})
     .catch (err => {
       console.log(err);
     });
   }

   try {
     let profile = await Profile.findOne({user: req.user.id});
     let posts = await Post.find({user: req.user.id});
     if(profile) {
       // Update
       profile = await Profile.findOneAndUpdate(
         { user: req.user.id },
         { $set: profileFields },
         { new: true }
       );

       return res.json(profile);
     }

     // Create
     profile = new Profile(profileFields);

     console.log(avatar);

     await profile.save();
     res.json(profile);


   } catch (e) {
     console.error(e.message);
     res.status(500).send('Server error!');
   }

});

// @route   Get/api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   Get/api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const person = await User.findById(req.params.user_id).select('_id name avatar');

    const profile = await Profile.findOne({ user: req.params.user_id }).populate('users', ['name', 'avatar']);
    if(!profile){
      return res.status(400).json({msg: 'Profile not found!'});
    }

    profile.user = person;

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    if(e.kind == 'ObjectId') {
      return res.status(400).json({msg: 'Profile not found!'});
    }
    res.status(500).send('Server error!');
  }
});

// @route   Delete /api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // TODO: rem,ove user's posts
    await Post.deleteMany({user: req.user.id})

    // Remove profile
    await Profile.findOneAndRemove({user: req.user.id});

    // Remove user
    await User.findOneAndRemove({_id: req.user.id});

    res.json({msg: 'User profile Deleted!'});
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   Put /api/profile/experience
// @desc    Add Profile experience
// @access  Private
router.put('/experience', [auth, [
  check('title', 'Title is required!').not().isEmpty(),
  check('company', 'Company is required!').not().isEmpty(),
  check('from', 'From date is required!').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {title, company, location, from, to, current, description} = req.body;
  const newExp = { title, company, location, from, to, current, description };

  try {
    const profile = await Profile.findOne({user: req.user.id});

    profile.experience.unshift(newExp);
    await profile.save();

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   Delete /api/profile/experience/:exp_id
// @desc    Delete Profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});

    const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
    if(removeIndex == -1) {
      return res.status(400).json({msg: 'Invalid params!'});
    }
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   Put /api/profile/education
// @desc    Add Profile education
// @access  Private
router.put('/education', [auth, [
  check('school', 'School is required!').not().isEmpty(),
  check('degree', 'Degree is required!').not().isEmpty(),
  check('fieldofstudy', 'Field of study is required!').not().isEmpty(),
  check('from', 'From date is required!').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {school, degree, fieldofstudy, from, to, current, description} = req.body;
  const newSchool = {school, degree, fieldofstudy, from, to, current, description};

  try {
    const profile = await Profile.findOne({user: req.user.id});

    profile.education.unshift(newSchool);
    await profile.save();

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   Delete /api/profile/education/:edu_id
// @desc    Delete Profile edication
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});

    const removeIndex = profile.education.map(item => item._id).indexOf(req.params.edu_id);
    console.log(removeIndex);
    if(removeIndex == -1) {
      return res.status(400).json({msg: 'Invalid params!'});
    }
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   Get /api/profile/github/:username
// @desc    get user repos from github
// @access  Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
        sort=pushed:des&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (error, response, body) => {
      if(error) console.error(error);

      if(response.statusCode !== 200) {
        return res.status(404).json({msg: 'No Github profile found!'});
      }

      res.json(JSON.parse(body));
    });

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
