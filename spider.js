var express = require('express'),
    fs = require('fs'),//Salvar os dados em uma pasta (node)
    request = require('request'),//Para fazer chamadas HTTP
    cheerio = require('cheerio'),//Para acessar o DOM externo e extrair os dados
    app = express();

var url = 'https://www.hering.com.br/store/';

request(url, function(error,response,html){
	if(!error && response.statusCode === 200){
		var $ = cheerio.load(html);

		var corpo = $(html).find('body');

		fs.appendFile('home.html',corpo);
	}else{
		console.error('[] '+err);
	}
});