const express = require('express');
const cors = require('cors');
const User = require('./models/user')
const Razorpay  = require('razorpay');
const userAuthentication = require('./routes/userAuthentication')
const paymentRoute = require('./routes/paymentRoute')

const app = express();

const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())

// Middleware to handle CORS (Cross-Origin Resource Sharing)

var corsOptions = {
    origin: 'http://localhost:1234/',
    optionsSuccessStatus: 200 
}

// some legacy browsers (IE11, various SmartTVs) choke on 204
app.get('/' , cors(corsOptions) , (req, res)=>{
    res.send(` This is home page`);
});

app.use('/api', userAuthentication);
app.use('/payment', paymentRoute);

// app.get('/user' , cors(corsOptions) , async (req, res)=>{
//     const data = req.body;
//     const createdUser = await User.create({
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         age: data.age
//     })
//     res.send(` Crated User is ${createdUser.name}`);
// });

// app.post('/login', cors(corsOptions) , async (req, res)=>{
//     const data = req.body;
//     const foundUser = await User.findOne({email:data.email});

//     if(foundUser){
//         if(foundUser.password == data.password){
//             res.send(`Logged In User is ${foundUser.name}`);
//         }
//         else{
//             res.send('Invalid Password');
//         }
//     }
//     else{
//         res.send('User not found');
//     }
// })

// app.get('/about' , cors(corsOptions) , (req, res)=>{
//     res.send("<h1>This is about Page</h1>");
// });

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}...`));

