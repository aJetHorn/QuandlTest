$(document).ready( function () 
{
	var auth_token = "VEUT87tRgmysCmNqsAfS";
	var auth_token_url = "?auth_token=" + auth_token;
	var base_url = "https://www.quandl.com/api/v1/";
	var result_id = "result";

	//var jsonData;

	//var loaded = false;

	// $.ajaxSetup({'async': false});

// 	$.getJSON( "https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?auth_token=VEUT87tRgmysCmNqsAfS", function( data ) {
//   var items = [];

//   console.log(data.data[0][4]);
//   // $.each( data, function() {
//   //   //items.push( "<li id='" + key + "'>" + val + "</li>" );
//   //   console.log(data);
//   //   console.log(data.code);
//   //   console.log(data.data[0][4]);
//   // });
// })
	$( "#lookupButton" ).on( "click",   function() {
		// TODO: Create spinner
		$("#" + result_id).empty();
		getClosingPrice(function(data) {
			// TODO: Stop spinner
			console.log(data);
			updateDivContent(result_id, data.name + " | From " + data.source_name);
			updateDivContent(result_id, "Last updated at: " + data.updated_at);
			updateDivContent(result_id, "");
			for (var i = 0; i < 7; i++){
				updateDivContent(result_id, "Date: " + data.data[i][0]);
				updateDivContent(result_id, "Opening Price: " + data.data[i][1]);
				updateDivContent(result_id, "Closing Price: " + data.data[i][4]);
				updateDivContent(result_id, "Daily Percent change: " + (100 - (data.data[i][1] / data.data[i][4]) * 100));
				updateDivContent(result_id, "Volume: " + data.data[i][5]);
				updateDivContent(result_id, "");
			}
		})
	});

	function updateDivContent(id, content){
		//$("#" + id).empty();
		$("#" + id).append(content + "<br>");
			//getContents("security") + " Closing Price: " + content);
	}

	function getContents(id){ //what is contained
		return $("#" + id).val().toUpperCase();
	}

	function getClosingPrice(callback){
		//console.log(data);
		var content = "datasets/WIKI/" + getContents("security") + ".json";
		var URL = buildQuandlURL(content, "");
		console.log("URL is " + URL);
		getQuandlObject(URL, function(data) {
			callback(data);
		});
	}

	function getQuandlObject(URL, callback){ //error checking...
		//https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?auth_token=VEUT87tRgmysCmNqsAfS
		$.getJSON( URL, function( data ) {
  			callback(data);
		})
	}

	function buildQuandlURL(content, trail){ //Won't work with all cases
		return base_url + content + auth_token_url + trail;
	}
})