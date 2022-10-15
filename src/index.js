const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');

const { default: mongoose } = require('mongoose');
const multer = require('multer')
const app = express();

<<<<<<< HEAD
const multer = require('multer')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());
=======

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
>>>>>>> 63c19b9629a2bdc63acc56f35bd2015ab972e5ab


mongoose.connect("mongodb+srv://mohdfayeem321:KsdXTXld88GQq4da@cluster0.8eqarb6.mongodb.net/group22Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
