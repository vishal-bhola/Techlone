var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable =  require('formidable');

var app=express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

var con =mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'techlone'
    });
    
// con.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected!");
//     });
    
    


app.get('/',function(req,res){
     res.sendFile('/Techlone/home.html');
});


app.post('/',function(req,res){
    var filt = req.body.filter1;
    
console.log(filt);
});


app.get('/adminlogin',function(req,res){
     res.sendFile('/Techlone/adminlogin.html');
});

app.post('/adminlogin',function(req,res){
      res.redirect()
});

app.post('/signup',function(req,res){
   
   var uname = req.body.uname;
   var uid = req.body.uid;
   var pwd = req.body.pwd;
   var email = req.body.email;
   var desg = req.body.desg;

   // con.connect(function(err) {
   //    if (err) throw err;
   //    console.log("Connected!");
   //  });
   // <table>
   //    <tr><th>Name</th><th>Id</th><th>Pass</th><th>Email</th><th>Desg</th></tr>
   //    <tr><td>uname</td></tr>
   // </table> 


if(desg == "Student")
{
     var sql =  "insert into student values('"+req.body.uname+"','"+req.body.uid+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.desg+"')";
     con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
       
     });
  
}
else if(desg == "Alumni"){
   var sql = "insert into alumni values('"+req.body.uname+"','"+req.body.uid+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.desg+"')";
   con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
       
     });
}
   

  console.log("Inserted");



res.redirect('/');
});



app.post('/login',function(req,res){

   var username = req.body.uname;
   var password = req.body.pwd;
   var desg = req.body.desg;



   // con.connect(function(err) {
   //    if (err) throw err;
   //    console.log("Connected!");
   //  });
    

   if(username&&password)
   {

      if(desg=="Student")
      {
         con.query('select * from student where sname= ? and spwd =?' ,[username,password],function(err,result){
            
            if(result.length>0)
            {
               res.redirect('/');
            }

            else{
               res.send('Incorrect username or password');
            }
         });
      }

      else{
         con.query('select * from alumni where aname= ? and apwd =?' ,[username,password],function(err,result){
            
            if( result.length > 0)
            {
               res.redirect('/');
            }

            else{
               res.send('Incorrect username or password');
            }
         
         });
         } 
      }

      else{
         res.send('Please enter Username and/or Password!');
         res.end();
      }

  
});


app.post('/loginpage',function(req,res){
   res.sendFile("/Techlone/login.html");
});






//scon.end();
app.listen(5000);
console.log("Now Connected !");