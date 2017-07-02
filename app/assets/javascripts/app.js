$(document).ready(function(){

	$('#searchInput').focus();

	$('form').submit(function (evt) {
		evt.preventDefault();

  		const searchVal = $('#searchInput').val().toLowerCase();

  		const rubyGems = 'https://rubygems.org/api/v1/gems/' + searchVal + '.json';  

  		function getGems(data) {
 	$.each(data, function(index,gem) {	
 	let gemName = '<div class="panel panel-default">';
 	gemName += '<div class="panel-heading"><h3 class="panel-title">Gem</h3></div>';
 	gemName += '<div class="panel-body">' +
 	'<a href="' + data.project_uri + '"' + 'target="_blank">' + data.name + '</a>' +
 	'<span class="stars pull-right"><i class="fa fa-star-o" aria-hidden="true"></i></span>' +
 	'</div>';
 	gemName += '</div>';

 	gemName += '<div class="panel panel-default">';
 	gemName += '<div class="panel-heading"><h3 class="panel-title">Info</h3></div>';
 	gemName += '<div class="panel-body">' +
 	data.info +
 	'</div>';
 	gemName += '</div>';

 	gemName += '<div class="panel panel-default">';
 	gemName += '<div class="panel-heading"><h3 class="panel-title">Dependencies</h3></div>';
 	gemName += '<div class="panel-body"><ul class="list-unstyled">';
                   $.each(data.dependencies.runtime, function(i, dep){
                        gemName += '<li><a href="https://rubygems.org/gems/' + dep.name + '" target="_blank">' + dep.name + '</a>' + 
 						'<span class="stars pull-right">' + 
 							'<i class="fa fa-star-o" aria-hidden="true"></i>' + 
 						'</span>' + 
 						'</li>';
                   });
                   gemName += '</ul>' + 
 	'</div>';
 	gemName += '</div>';

  $('#searchResults').html(gemName);


 	$('.stars').click(function(evt){
 	const favoritesArray = [];
  favoritesArray.push(data.name);
 	console.log(favoritesArray);

 	$('#favorites').html('hello world');
 	});
     }); // end each
   	}


    	$.getJSON(rubyGems, getGems).fail(function(){
    		if(searchVal === "") {
    			$('#searchResults').html('<h3 class="text-center">Doh! Please type in a gem name.</h3><br><p class="text-center"><img src="https://media.giphy.com/media/xT5LMESsx1kUe8Hiyk/giphy.gif"></p>');	
    		} else {
    			$('#searchResults').html('<h3 class="text-center">Oh snap! Couldn\'t find that gem. Please try again.</h3><br><p class="text-center"><img src="https://media.giphy.com/media/26AHLBZUC1n53ozi8/giphy.gif"></p>');
    		}
    		
    	});
  	}); // end click
});