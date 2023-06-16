const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = 5200;

app.use(express.static(__dirname + '/web'));

app.get('/', (req, res) => res.sendFile(path.resolve('web/index.html')));
app.get('/forgetPassword', function(req, res) {
  if (req.query.code==undefined) {
   return res.redirect('/');
  }
    res.sendFile(__dirname + "/views/password.html")
  });

app.post('/forgetPassword' , (req,res) => {


  let {password} = req.body ;

  const url = 'https://api.cds-toubaouest.fr/v1/api/users/verif-code'
    const data = {
        password
    };
    const customHeaders = {
        "Content-Type": "application/json",
    }

fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: JSON.stringify(data),
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        res.redirect('/');
    });

});

const server = http.createServer(app);

server.listen(port, () => console.log(`App running  on: http://localhost:${port}`));