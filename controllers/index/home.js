var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

// import models
var ansNum = require('../../models/ansNum');
var commNum = require('../../models/commNum');
var tag = require('../../models/tag');
var users = require('../../models/user');
var ques = require('../../models/ques');

var commonFunctions = require('../commonFunctions');
// slide show 

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// load homepage
function home(req, res)
{
  var userNumber = 0;
	var quesNumber = 0;
	var ansNumber = 0;
	var commNumber = 0;
	users.find( {}, function( err, data )
  {
		if(err) throw err;
		userNumber = data.length;
		ques.find( {}, function( err, data )
		{
			quesNumber = data.length;
			if( data.length > 0 )
			{
				data.forEach( function( partQues )
				{
					ansNumber += partQues.qAns.length;
					commNumber += partQues.qComm.length;
					if( data[ data.length - 1 ] == partQues )
					{
						res.render('index', { userNumber : userNumber,
																	quesNumber : quesNumber,
																  ansNumber : ansNumber,
																  commNumber : commNumber });
					}
				});
			}
			else
			{
				res.render('index', { userNumber : userNumber,
															quesNumber : quesNumber,
															ansNumber : ansNumber,
															commNumber : commNumber });
			}
		});
	});
}


module.exports =
{
  home: home
}
