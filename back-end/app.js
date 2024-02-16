require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})


// const aboutData = {
//   title: "About Us",
//   content: [
//     "Hello! My name is Owen Ou. I am a senior undergraduate student in NYU, majoring in Computer Science and Data Science.",
//     "I like to play basketball when I am free. I am also into freediving. I play piano as well.",
//     "Thank you!"
//   ],
//   image: "https://www.dropbox.com/scl/fi/2nzmt0g4xf6l9ybbhzl6a/.jpg?rlkey=xib7m7f0dathmudjf7jlvjdcw&dl=0"
// };

// app.get('/aboutUs', (req, res) => {
//   res.json(aboutData);
// });


const data = {
  image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fliwen-ou-a178a624b&psig=AOvVaw0apvrELI27_gkdeSJTag3L&ust=1708137706368000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDAw6frroQDFQAAAAAdAAAAABAE",
  content: "Hello! My name is Owen Ou. I am a senior undergraduate student in NYU, majoring in Computer Science and Data Science. I like to play basketball when I am free. I am also into freediving. I play piano as well. Thank you!"
};

app.get('/about_us', (req, res) => {
  res.json(data);
});

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
