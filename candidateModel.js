const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  dateOfBirth: String,
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String,
});

module.exports = mongoose.model('Candidate', CandidateSchema);
