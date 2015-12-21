var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var arr = [];
var name,url,description;
var app     = express();
function RokuChannels(name,url,description){
	this.name = name;
	this.url = url;
	this.description = description;
}
app.get('/scrape', function(req, res){

url = 'http://www.rokuguide.com/channels';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

  
    var json = [{ name : "", url : "",description: ""}];
  
    $('div.view-content  table  tbody tr td').each(function(){
        var data = $(this);
      	name=data.children().children().children().children().attr('alt');
    	url = data.children().children().children().children().attr('src');
		arr.push(new RokuChannels(name,url,null));
      	
    })
	for(var a in arr){
		if(arr[a].url!="undefined")
			console.log(arr[a].url);
	}
 
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;