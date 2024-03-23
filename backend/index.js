require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression');
const bodyParser = require("body-parser");
var cors = require('cors');
const cardRouter = require('./routes/card.js')
const app = express()

app.use(compression())

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(express.json());
// get - gets all
//post - creates new
//get/:id - gets single
//delete - deletes single
//patch - updates single


app.use('/api/card', cardRouter)


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true , useUnifiedTopology:true})
    .then(()=>{
        app.listen(process.env.PORT, () => {
            console.log('listening on port ', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
app.get('/', (req, res) => {
    res.json({ msg: `server live at port ${process.env.PORT}`  })
})


