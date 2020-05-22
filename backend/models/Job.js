const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employers',
  },
  application_email: {
    type: String,
  },
  application_url: {
    type: String,
  },
  location: {
    type: String,
    required: true
  },
  job_type: {
    type: String,
    required: true
  },
  education_level: {
    type: String,
    required: true
  },
  experience_level: {
    type: String,
    required: true
  },
  working_hours: {
    type: String
  },
  details: {
    type: String,
    required: true
  },
  application_type: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model('jobs', JobSchema);

module.exports = Job;
