const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/EnoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


const ConnectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo succesfully");
    })
}


module.exports = ConnectToMongo;