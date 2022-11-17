const express = require('express')
const app = express()
// const PORT = 3000
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const Tweet = require('./models/tweet.js')

const mongoose = require('mongoose') // bringing in mongoose to use
const data_url = "mongodb+srv://rbecerril:sevboy09@sei-turmeric.1zuhmda.mongodb.net/tweeter?retryWrites=true&w=majority" //establishing link to our database in MongoDB
const db = mongoose.connection //creating a variable to refer to the actual connection to the db

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false})) // creates req.body

mongoose.connect(data_url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}); // tells mongoose to connect to our given database - useNew and useUnified are for login errors


db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
// telling the database to display status messages under different conditions

//CREATE ROUTE - MAKE A TWEET
app.post('/tweets', (req, res) => {
    Tweet.create(req.body, (error, createdTweet) => {
        if(error){
            res.send(`error bill robinson`)
            return
        }
        res.send(createdTweet)
    })
})

//INDEX ROUTE - SHOW ALL TWEETS
app.get('/tweets', (req, res) => {
    Tweet.find({}, (error, foundTweets) => {
        res.send(foundTweets)
    })
})

//SEED ROUTE - ADDING BULK TEST DATA INTO THE DATABASE AT THE START
app.get('/tweets/seed', (req, res) => {
    Tweet.create([
        {

            "title": "Deadpool is NOT op",
            "body": "it's cuttin time!",
            "author": "SLADE Wilson"
            
            },
            {

                "title": "Deadpool is NOT op",
                "body": "it's cuttin time!",
                "author": "SLADE Wilson"
                
                },
                {

                    "title": "Deadpool is NOT op",
                    "body": "it's cuttin time!",
                    "author": "SLADE Wilson"
                    
                    },
                    {

                        "title": "Deadpool is NOT op",
                        "body": "it's cuttin time!",
                        "author": "SLADE Wilson"
                        
                        },
                        {

                            "title": "Deadpool is NOT op",
                            "body": "it's cuttin time!",
                            "author": "SLADE Wilson"
                            
                            }
    ], (error, seededTweets) => {
        res.send(seededTweets)
    })
})

//SHOW ROUTE - SHOW 1 TWEET BY SEARCHING BY ID
app.get('/tweets/:id', (req, res) => {
    Tweet.findById(req.params.id, (error, foundTweet) => {
        res.send(foundTweet)
    })
})

//DESTROY ROUTE - REMOVE A TWEET
app.delete('/tweets/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (error, deletedTweet) => {
        res.send({success: true})
    })
})


//UPDATE ROUTE - EDIT A TWEET
app.put('/tweets/:id', (req, res) => {
    Tweet.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true},
        (error, updatedTweet) => {
            res.send(updatedTweet)
        }
    )
})




app.listen(PORT, () => {
    console.log(`You can dance if you want to, you can leave Port ${PORT} behind...`)
})