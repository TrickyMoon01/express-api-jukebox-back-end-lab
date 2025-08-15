const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const methodOverride = require('method-override')
const trackHandler = require('./controlers/track.js')


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.json());
app.use(cors());//later we need to set up cors settings to match React app
app.use(logger('dev'));
app.use('/tracks',trackHandler)
app.get('/',(req,res)=>{
  return res.send('Welcome on Track API backend')
})

// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});
