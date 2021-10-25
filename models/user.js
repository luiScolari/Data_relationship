const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/relationshipDemo', {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const userSchema = mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('user', userSchema)

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.address.push({
        street: '123 Sesame',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.address.push(
        {
            street: '99 3rd St.',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        }
    )
    const res = await user.save()
    console.log(res)
}

makeUser();
addAddress('617639e781426ff5daf18884')