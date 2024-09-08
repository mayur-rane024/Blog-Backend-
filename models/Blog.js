const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  likes: { type: Number, default: 0 },
  bookmarks: { type: [String] } // Array of user IDs who bookmarked the blog
});

module.exports = mongoose.model('Blog', BlogSchema);
