const express=require('express');
const path=require('path');
const PORT=8000;

const db=require('./config/mongoose');
const app=express();
const Contact=require('./models/contact');

//middleware 1
// app.use(function(req,res,next){
//    console.log('Middleware1 Called');
//    next();
// });

// //middleware 2
// app.use(function(req,res,next){
//     console.log('Middleware2 Called');
//     next();
//  });


app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// var contactList=[
//     {
//         name:"Mohit",
//         phone:9128932922
//     },
//     {
//         name:"Aryan",
//         phone:777932922
//     }
// ]


app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('<h1>It is running</h1>');
    Contact.find({},function(err,contact){
        if(err){
            console.log("Error in fetching data from database");
            return;
        }
        return res.render('home',
        {title:'My Contacts List',
        contact_list: contact});
    });
    })
   

app.post('/create-contact',function(req,res){
    // contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in adding contact ");
            return;
        }
            console.log("New Contact ",newContact);
            return res.redirect('back');
    })

    // return res.redirect('/');
    //back works same as going to start page
    //res.redirect('back');
});

app.get('/delete-contact',function(req,res){
//   console.log(req.params);
     console.log(req.query);
     //Find the id of contact to delete
     let id=req.query.id;
  
     //Finding the id and deleting from DB
     Contact.findByIdAndDelete(id,function(err){
           if(err){
               console.log('Error in deleting from database');
               return;
           }
           return res.redirect('back');
     });
    //  let contactIndex=contactList.findIndex((contact)=>{contact.phone==contact1});
    //  contactList.splice(contactIndex,1);
     
});

app.get('/practise',function(req,res){
    return res.render('practise',{title:"Iron Man"});
})



app.listen(PORT,(err)=>{
    if(err){
        console.log('Error : ', err);
    }else{
        console.log('My express server is running on PORT : ', PORT);
    }
})