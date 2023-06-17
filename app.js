const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");

const port = 5200;

app.use(express.static(__dirname + '/web'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');


app.get('/', (req, res) => res.sendFile(path.resolve('web/index.html')));
// app.get('/forgetPassword', (req, res) => {
//   console.log(req.query);

//   if (req.query.code==undefined) {
//    return res.redirect('/');
//   }
//     res.sendFile(__dirname + "/views/password.html")
//   });

// app.post('/forgetPassword' , async (req,res) =>  {

//   console.log("req.body => ");
//   console.log(req.body);
  

//   let {password} = req.body ;

//   const data = {
//     "password": password
//   }
    
//   console.log('dada => ',data);

//   try {
//     const response = await axios.post(`https://api.cds-toubaouest.fr/v1/api/users/verif-code`, data);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
  
   

//     });

const server = http.createServer(app);

server.listen(port, () => console.log(`App running  on: http://localhost:${port}`));