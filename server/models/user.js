const mongoose =  require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/KitchenUser', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err)=>{
    console.log("Error connecting to MongoDB " , err );
})

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
})


module.exports = mongoose.model('User', userSchema)