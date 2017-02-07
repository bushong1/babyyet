var express = require('express');

var app = express();

app.set("baby", false);

app.get('/', function(req, res) {
  if (req.app.get("baby")){
    res.send('<body style="height: 100%; width: 100%; padding: 0; margin: 0;"> <table id="tbl_wrap" style="height: 100%; width: 100%; padding: 0; margin: 0;"><tbody><tr><td id="td_wrap" style="vertical-align: middle; text-align: center;"><div style="font-size: 5em; font-family: sans; display: inline-block;">Yes!  Stop asking!</div></td></tr></tbody></table></body>');
  } else {
    res.send('<body style="height: 100%; width: 100%; padding: 0; margin: 0;"> <table id="tbl_wrap" style="height: 100%; width: 100%; padding: 0; margin: 0;"><tbody><tr><td id="td_wrap" style="vertical-align: middle; text-align: center;"><div style="font-size: 5em; font-family: sans; display: inline-block;">No!  Stop asking!</div></td></tr></tbody></table></body>');
  }
});
app.get('/update/:id', function(req, res) {
  if(req.params.id === "true") {
    req.app.set("baby", true);
    res.send("Updated to true.");
  } else if (req.params.id === "false"){
    req.app.set("baby", false);
    res.send("Updated to false.");
  } else {
    res.send("ERROR");
  }
});

app.listen(3000);
console.log('Listening on port 3000...');
