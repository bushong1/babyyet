require('dotenv').config()
var express = require('express');

var app = express();

app.set("baby", "false");
app.set("custom", "No!  Stop asking!");

app.get('/', function(req, res) {
  if (req.app.get("baby") === "true"){
    res.send('<body style="height: 100%; width: 100%; padding: 0; margin: 0;"> <table id="tbl_wrap" style="height: 100%; width: 100%; padding: 0; margin: 0;"><tbody><tr><td id="td_wrap" style="vertical-align: middle; text-align: center;"><div style="font-size: 5em; font-family: sans; display: inline-block;">Yes!  Stop asking!</div></td></tr></tbody></table></body>');
  } else if (req.app.get("baby") === "hospital"){
    res.send('<body style="height: 100%; width: 100%; padding: 0; margin: 0;"> <table id="tbl_wrap" style="height: 100%; width: 100%; padding: 0; margin: 0;"><tbody><tr><td id="td_wrap" style="vertical-align: middle; text-align: center;"><div style="font-size: 5em; font-family: sans; display: inline-block;">No!  We\'re at the hospital!<br/>It will be a while.  Stop asking!</div></td></tr></tbody></table></body>');
  } else if (req.app.get("baby") === "custom"){
    res.send('<body style="height: 100%; width: 100%; padding: 0; margin: 0;"> <table id="tbl_wrap" style="height: 100%; width: 100%; padding: 0; margin: 0;"><tbody><tr><td id="td_wrap" style="vertical-align: middle; text-align: center;"><div style="font-size: 5em; font-family: sans; display: inline-block;">'+req.app.get("custom")+'</div></td></tr></tbody></table></body>');
  } else {
    res.send('<body style="height: 100%; width: 100%; padding: 0; margin: 0;"> <table id="tbl_wrap" style="height: 100%; width: 100%; padding: 0; margin: 0;"><tbody><tr><td id="td_wrap" style="vertical-align: middle; text-align: center;"><div style="font-size: 5em; font-family: sans; display: inline-block;">No!  Stop asking!</div></td></tr></tbody></table></body>');
  }
});
app.get('/update/:id', function(req, res) {
  if(req.query.pw === process.env.BABY_PASS){
    if(req.params.id === "true") {
      req.app.set("baby", "true");
      res.send("Updated to true.");
    } else if (req.params.id === "false"){
      req.app.set("baby", "false");
      res.send("Updated to false.");
    } else if (req.params.id === "hospital"){
      req.app.set("baby", "hospital");
      res.send("Updated to hospital.");
    } else if (req.params.id === "custom"){
      if(req.query.custom){
        req.app.set("baby", "custom");
        req.app.set("custom", req.query.custom);
        res.send("Updated to custom.");
      } else {
        res.send("No 'custom=' query string.");
      }
    } else {
      res.send("ERROR");
    }
  } else {
    res.send("no pw");
  }
});

app.listen(process.env.BABY_PORT);
console.log('Listening on port '+process.env.BABY_PORT+'...');
