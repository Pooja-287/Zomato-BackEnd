const express = require('express');
const APIRouter = require('./Routes/APIRouter');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { dbAfter, dbBefore } = require('./Routes/debugger');
const app = express();
const PORT = 3000;
// const MONGODB_URI = 'mongodb://localhost:27017/BackEnd';
// const MONGODB_URI = 'mongodb://localhost:27017/Edureka';
const MONGODB_URI = 'mongodb+srv://Pooja:Pooja287@cluster0.fxzlj.mongodb.net/Edureka';


app.use(cors()); //enable cors pollicy
app.use(morgan('tiny'));
//eligible to access post data 
app.use(express.json());  // to parse JSON body
app.use('/api', APIRouter);
app.use(express.urlencoded({ extended: false})); // parse application/x-www-form-urlencoded post

//add external routing to app.js
//middleware
app.use('/', APIRouter);




//before starting server we need to check db connection 
dbBefore("Connecting to db ");
mongoose.connect(MONGODB_URI)
.then(()=> {
    // console.log('DB Connected Successfully')
    dbAfter('DB Connected Successfully')
    app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});
}).catch((error)=> {
    console.log('Error connecting to database');
    console.log(error);
});