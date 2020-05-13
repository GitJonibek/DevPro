const express = require('express');
const router = express.Router();
const axios = require('axios');
const { check, validationResult } = require('express-validator')

const Employer = require('../../models/Employer');

// @route   GET /api/companies/
// @desc    Get Companies list
// @access  public
router.get('/', async (req, res) => {
  try {
    const companies = await Employer.find().sort({ date: -1 });
    res.json(companies);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
});

// @route   POST /api/companies/company-form
// @desc    Create new company
// @access  public
router.post('/company-form', [
  check('name', 'Company name is required!').not().isEmpty(),
  check('email', 'Company email is required!').not().isEmpty(),
  check('location', 'Location is required!').not().isEmpty(),
  check('headline', 'headline is required!').not().isEmpty()
], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {
    name,
    email,
    avatar,
    headline,
    salary,
    location,
    website,
    phone_number,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    recruitment_page,
    employees,
    technologies,
    remote,
    benefits,
    visa_sponsorship
  } = req.body;

  const companyProfile = {};
  if(name) companyProfile.name = name;
  if(email) companyProfile.email = email;
  if(website) companyProfile.website = website;
  if(avatar) companyProfile.avatar = avatar;
  if(headline) companyProfile.headline = headline;
  if(salary) companyProfile.salary = salary;
  if(location) companyProfile.location = location;
  if(phone_number) companyProfile.phone_number = phone_number;

  companyProfile.social = {}
  if(youtube) companyProfile.social.youtube = youtube;
  if(twitter) companyProfile.social.twitter = twitter;
  if(facebook) companyProfile.social.facebook = facebook;
  if(linkedin) companyProfile.social.linkedin = linkedin;
  if(instagram) companyProfile.social.instagram = instagram;
  if(recruitment_page) companyProfile.social.recruitment_page = recruitment_page;

  companyProfile.details = {}
  if(employees) companyProfile.details.employees = employees;
  if(technologies) companyProfile.details.technologies = technologies;
  if(remote) companyProfile.details.remote = remote;
  if(benefits) companyProfile.details.benefits = benefits;
  if(visa_sponsorship) companyProfile.details.visa_sponsorship = visa_sponsorship;

  try {

    let company = new Employer(companyProfile);
    await company.save();

    res.json(company);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }

});

module.exports = router;
