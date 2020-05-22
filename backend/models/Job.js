const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employers',
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    details: {
      remote: {
        type: String
      },
      benefits: {
        type: String
      },
      visa_sponsorship: {
        type: String
      }
    }
  },
  technologies: {
    type: String,
    required: true
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
  description: {
    type: String,
    required: true
  },
  qualifications: {
    required: [
      {
        required_skill: {
          type: String
        }
      }
    ],
    preffered: [
      {
        preffered_skill: {
          type: String
        }
      }
    ]
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
