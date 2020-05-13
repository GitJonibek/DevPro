const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const axios = require('axios');
const { check, validationResult } = require('express-validator')

let encoding = require('encoding-japanese');
let Parser = require('rss-parser');
let parser = new Parser();

const Job = require('../../models/Job');

// @route   GET /api/jobs/global
// @desc    Get All global Jobs
// @access  public
router.get('/global', async (req, res) => {

  const { query, location } = req.query;
  let q, l = '';

  q = query.split(' ').join('+');
  l = location.split(' ').join('+');

  try {
    let feed = await parser.parseURL(`https://stackoverflow.com/jobs/feed?q=${q}&l=${l}`);
    const arr = feed.items.slice(0, 200);
    res.json(arr);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error!');
  }
});

// @route   POST /api/jobs/post-job
// @desc    Post a Job
// @access  public
router.post('/post-a-job', [
  check('title', 'Job title is required!').not().isEmpty(),
  check('location', 'Job location is required!').not().isEmpty(),
  check('job_type', 'Job type is required!').not().isEmpty(),
  check('education_level', 'Education level is required!').not().isEmpty(),
  check('experience_level', 'Experience level is required!').not().isEmpty(),
  check('details', 'Job description is required!').not().isEmpty()
], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {



  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
})

module.exports = router;
