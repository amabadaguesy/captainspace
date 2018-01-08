const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 1337;

const app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials' );
app.use(express.static(__dirname +'/public'));
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url} ${req.ip}`;
  fs.appendFile(__dirname + 'server.log', `${log}\n`, (error) => {
    if(error) {
      console.log('damn dog');
      return;
    }



  });
  next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Yo dog sup dog'
  })
});
app.listen(port, () =>{
  console.log(`Server started on ${port}`);
})
