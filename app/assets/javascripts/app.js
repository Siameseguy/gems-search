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
 							'<a href="' + data.project_uri + '"' + 'target="_blank" id="gemName">' + data.name + '</a>' +
 							'<span class="stars pull-right"><i class="fa fa-star-o" aria-hidden="true"></i></span>' +
 							'</div>';
 					gemName += '</div>';

 					gemName += '<div class="panel panel-default">';
 					gemName += '<div class="panel-heading"><h3 class="panel-title">Info</h3></div>';
 					gemName += '<div class="panel-body">' + data.info + '</div>';
 					gemName += '</div>';

 					gemName += '<div class="panel panel-default">';
 					gemName += '<div class="panel-heading"><h3 class="panel-title">Dependencies</h3></div>';
 					gemName += '<div class="panel-body"><ul class="list-unstyled">';
                   				$.each(data.dependencies.runtime, function(i, dep){
                        			gemName += '<li><a href="https://rubygems.org/gems/' + dep.name + '"target="_blank" id="depName">' + dep.name + '</a>' + 
 									'<span class="stars pull-right"><i class="fa fa-star-o" aria-hidden="true"></i></span></li>';						
                   				});
                   	gemName += '</ul>' + '</div>';
 					gemName += '</div>';

  					$('#searchResults').html(gemName);


  					// ------ FAVORITES FEATURE ------ //

  					// toggle star
  					let saved = false;
  					const favsArray = [];
  					$('.stars').on('click', function(){
  						saved = !saved;
  						if(saved) {
  							$(this).html('<i class="fa fa-star" aria-hidden="true"></i>');
  							// get gem name
  							let newVal = $('#gemName').html();
  							favsArray.push(newVal);
  							//console.log(favsArray);
  						} else {
  							$(this).html('<i class="fa fa-star-o" aria-hidden="true"></i>');
  						}

  						
  					
  						//console.log(favsArray);

  						// store new array in local storage
  						if (typeof(Storage) !== "undefined") {
						   localStorage.setItem("favsArray", JSON.stringify(favsArray));
						   let storedGems = JSON.parse(localStorage.getItem("favsArray"));
						   console.log(storedGems);
						   let listFavs = '<ul class="list-unstyled"><li>' + $.each(listFavs, function(index, gem){
						   		listFavs += '<li>' + gem + '</li>';
						   });
						   listFavs += '</ul>';
						   $('#favorites').html(listFavs);
						} else {
						    // Sorry! No Web Storage support..
						    console.log('doesn\'t work');	
						}	
  						
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