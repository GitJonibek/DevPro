const mongoose = require('mongoose');

const EmployerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  headline: {
    type: String,
    required: true
  },
  salary: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  phone_number: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    recruitment_page: {
      type: String
    }
  },
  details: {
    employees: {
      type: String
    },
    technologies: {
      type: String
    },
    remote: {
      type: String
    },
    benefits: {
      type: String
    },
    visa_sponsorship: {
      type: String
    }
  },
  open_positions: [
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
      }
    }
  ]
});

const Employer = mongoose.model('employers', EmployerSchema);

module.exports = Employer;
