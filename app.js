
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('node-xlsx');
const async = require('async');
const cors = require('cors');
const Candidate = require('./candidateModel');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());


mongoose.connect('//database url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

app.post('/api/upload', upload.single('excelFile'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const excelData = xlsx.parse(req.file.buffer);
  
    for (const row of excelData[0].data) {
      const [
        name,
        email,
        mobile,
        dateOfBirth,
        workExperience,
        resumeTitle,
        currentLocation,
        postalAddress,
        currentEmployer,
        currentDesignation,
      ] = row;
  
      try {
        const existingCandidate = await Candidate.findOne({ email });
        console.log(existingCandidate);
        if (existingCandidate) {
          continue; 
        }
  
        const newCandidate = new Candidate({
          name,
          email,
          mobile,
          dateOfBirth,
          workExperience,
          resumeTitle,
          currentLocation,
          postalAddress,
          currentEmployer,
          currentDesignation,
        });
        console.log(newCandidate);
        await newCandidate.save();
      } catch (err) {
        return res.status(500).json({ error: 'Error processing the Excel file' });
      }
    }
  
    return res.status(200).json({ message: 'Excel processed successfully' });
  });
  

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
