const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  blogImg: {
    type: String

  }
},{timestamps: true})

module.exports = mongoose.model('blog', blogSchema)
