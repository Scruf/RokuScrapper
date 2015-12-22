var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var arr = [];
var name,url,description;
var app     = express();
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
    console.log(arr[0].url);
    arr.splice(20,arr.length);
  for(var a in arr){
    	var path = buildPath(DEFAULT_URL,arr[a].url);
    	request(path,function(err,response,html){
          if(!err)
    		{
    			var $ = cheerio.load(html);
    			$(".field-item").each(function(){
    				var data = $(this);
                    arr.push(new RokuChannels(arr[a].name,path,data.children(':nth-child(1)').text()));
    				/*arr[a].description=data.children(':nth-child(1)').text();*/
                    
    			})
    		}else
    			throw err;
    	})
    }
   
 console.log(arr.length);
}


fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})


res.send('Check your console!')

    }) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;