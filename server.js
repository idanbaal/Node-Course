const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log' , log + '\n' , (error) => {
    if (error)
      console.log('unable to append to server.log');
   });
   next();
});

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

app.get('/',(req,res) =>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    wellcomeMessage: 'Wellcome To My website'
  })
});


app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/projects',(req,res) =>{
  res.render('projects.hbs',{
    pageTitle: 'Projects Page',
  });
});

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage : 'error handle'
  });
});



app.listen(port, () => {
console.log(`Server is up in port ${port}`);});
