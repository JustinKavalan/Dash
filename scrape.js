console.log("Scraping from Facebook...");
var pages;
$(document).ready(function(){
	setTimeout(function() {
    	FB.getLoginStatus(function(response) {
	   	if (response.status === 'connected') {
			loadFacebook(response);
	   	}else {
	    	FB.login(function(response) {}, {scope: 'user_friends, user_likes'});
	    	loadFacebook(response);
    	}
    	/*function()
    	});*/
    	});
	},2000);
});	

function loadFacebook(response){
	console.log('Logged in.');
	FB.api("/" + response.authResponse.userID + "/likes", function (response) {
   		if (response && !response.error) {
  			pages = response.data;
  		}
  		console.log(pages);
  		for(var i = 0; i < parseInt(pages.length, 10); i++){
   			FB.api("/" + pages[i].id +"/feed", function(response) {
   		   		console.log(response);
   		   		for(var j = 0; j < response.data.length; j++){
   		   			if(response.data[j].story != undefined)
    		   			$("#fb_posts").append("<p/>"/* + pages[i].name + ": "*/ + response.data[j].story);
    		   		if(response.data[j].message != undefined)
    		   			$("#fb_posts").append("<p/>"/* + pages[i].name + ": "*/ + response.data[j].message);
   		   		}
			});
  		}
	});
}