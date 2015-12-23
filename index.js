var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var arr = [];
var name,url,description;
var app     = express();
var api_key = "mS1eukopD5Ulis8iu5qjc7ykx0YpsUYb";
var mongoose = require('mongoose');
var Channel = require('./Channel');
var mongodbURI = "mongodb://ek5442:NokiaLumia920@ds033875.mongolab.com:33875/movies";
mongoose.connect(mongodbURI);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
function buildPath(a,b){
	return a+b;
}
function RokuChannels(name,url,description){
	this.name = name;
	this.url = url;
	this.description = description;
  
}

DEFAULT_URL = 'http://www.rokuguide.com';
SCRAPE_LINKS_URL='http://www.rokuguide.com/channels'
app.get('/scrape', function(req, res){



request(SCRAPE_LINKS_URL, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

  
    var json = [{ name : "", url : "",description: ""}];
  
    $('div.view-content  table  tbody tr td').each(function(){
        var data = $(this);
      	url=data.children().next().children().children().attr('href');
    	name = data.children().next().children().text();
		arr.push(new RokuChannels(name,url,null));
    	
    })
    console.log("Exiting scraping urls");
    arr.splice(20,arr.length);
   

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');
    

})


res.send('Check your console!')
for(var i=0;i<arr.length;i++)
{
    var temp = arr[i].name;
    var path = buildPath(DEFAULT_URL,arr[i].url);
    console.log(path);
    request(path,function(err,res,body){
        if(!err){

            var $ = cheerio.load(body);
           
            $(".field-item").each(function(){
                 var data = $(this);
                 description =data.children(':nth-child(1)').text();
                 console.log(temp);
                    console.log(description)
            });
          
           
        }
           
        else
            throw err;
    });
}

           
}
    }) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;