const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const axios = require('axios');

let encoding = require('encoding-japanese');
let Parser = require('rss-parser');
let parser = new Parser();

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
router.post('/post-job', async (req, res) => {
  try {

  } catch (e) {

  }
})

module.exports = router;
