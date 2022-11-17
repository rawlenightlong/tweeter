const mongoose = require('mongoose'); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// Takes an object item
// Recource: https://mongoosejs.com/docs/guide.html
const tweetSchema = new Schema(
	{
		title: String,
		body: String,
		author: String,
		likes: { type: Number, default: 0 }, //new tweets start with 0 likes
		sponsored: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

// Creating Tweet model : We need to convert our schema into a model-- will be stored in 'tweets' collection.  Mongo does this for you automatically
// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// Resource: https://mongoosejs.com/docs/models.html

const Tweet = mongoose.model('Tweet', tweetSchema); //going to create a collection called 'Tweet' utilizing the tweetShema to build it

// Export Tweet model so it can be used in our controllers
module.exports = Tweet;