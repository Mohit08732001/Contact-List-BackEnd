//require the library
const mongoose=require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//establish connection for checking if successfull
const db=mongoose.connection;

//if error
db.on('err',console.error.bind(console,'error connecting to db'));

//if success display message connected
db.once('open',function(){
    console.log('Successfully connected to database');
});