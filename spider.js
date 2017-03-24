var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');//Salvar os dados em uma pasta (node)

var url = 'https://www.hering.com.br/store/';

request(url, function(error,response,body){
	if(error) console.log('[Error] '+ error);

	var $ = cheerio.load(body);

	fs.appendFile('home.html',body);
});