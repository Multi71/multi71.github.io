$('body').css("background",bgColor); 

var iterationcard = 1;
while(iterationcard <= channelcount) {

if (iterationcard == 1) {
	var htmlcard = '<div class="channel_'+iterationcard+' card activee"><img src="'+imgUrl+'" class="channelImage"><div class="card-content"><div class="channelName">'+chanName+'</div><div class="odometer subscriberCount">0</div></div></div>';
} else {
	var htmlcard = '<div class="channel_'+iterationcard+' card"><img src="'+imgUrl+'" class="channelImage"><div class="card-content"><div class="channelName">'+chanName+'</div><div class="odometer subscriberCount">0</div></div></div>';
}
$('body').append(htmlcard);
iterationcard++;
};

		function fn60sec() {

			
		var googleApiCallURL="";
		var channelList = [];
		var channelName = [];
		var channelImage = [];
		var subscriberCount = [];
		
		$.getJSON('channels.json', function(channels){
        
		channelList = channels.reverse();
		
	
				googleApiCallURL="https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=" + channelList + "&key="+ APIKeys[Math.floor(Math.random()*Math.floor(APIKeys.length))];
				
				$.getJSON(googleApiCallURL, function(result){
					console.log(result);
					ytJSON = result;
		  			var iteration = 0;
		  	   		while (iteration < result.items.length) {
   	   					var channelNumber = channelList.indexOf(result.items[iteration].id) + 1;
						channelName[iteration] = result.items[iteration].snippet.title;
						subscriberCount[iteration] = result.items[iteration].statistics.subscriberCount;
						channelImage[iteration] = result.items[iteration].snippet.thumbnails.medium.url;

						$(".channel_" + channelNumber + " .channelName").html(channelName[iteration]);
						$('.channel_' + channelNumber + ' .subscriberCount').html(subscriberCount[iteration]);
						$('.channel_' + channelNumber + ' .channelImage').attr('src',channelImage[iteration]);

						iteration++;
					};
					
				});
			});
			}

		

		
		fn60sec();
		setInterval(fn60sec, 45000);
