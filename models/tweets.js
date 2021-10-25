const mongoose = require('mongoose')
const Schema = mongoose.Schema


mongoose.connect('mongodb://localhost:27017/relationshipDemo', {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const userSchema = Schema({
    username: String,
    age: Number
})

const tweetSchema = Schema({
    text: String,
    likes: Number,
    user: { type: mongoose.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async() => {
//     // const user = new User({username: 'chickenlover99', age: 61});
//     const user = await User.findOne({username: 'chickenlover99'})
//     const tweet2 = new Tweet({text: 'My chickens go brr', likes: 654})
//     tweet2.user = user
//     tweet2.save()
//     user.save()
//     console.log(tweet2)
// }

// makeTweets()

const findTweet = async() => {
    const t = await Tweet.find({}).populate('user')
    console.log(t)
}

findTweet()