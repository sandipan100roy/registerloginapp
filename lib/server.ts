import app from "./app";
const port = 4040;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

app.get('/hello', function(req, res){
	console.log("I am from server!!!");

});