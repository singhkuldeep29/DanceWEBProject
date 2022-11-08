const express = require("express")
const path = require("path")
const app = express();
const port = 80; 
const bodyparser = require("body-parser")


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance');


//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('Contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static("static")); // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory

 
// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug' , params)
});
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug' , params)
});

// Data saving to db by post on contact 
app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database.")
    });

    // res.status(200).render('contact.pug')
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The app started successfully on port ${port}`)
});