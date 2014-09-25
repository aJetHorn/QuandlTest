$(document).ready( function () 
{
	var auth_token = "VEUT87tRgmysCmNqsAfS";
	var auth_token_url = "?auth_token=" + auth_token;
	var base_url = "https://www.quandl.com/api/v1/";
	var result_id = "result";

	//var jsonData;

	//var loaded = false;

	$.ajaxSetup({'async': false});

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
   		updateDivContent(result_id, getClosingPrice());
	});

	function updateDivContent(id, content){
		$("#" + id).empty();
		$("#" + id).append(getContents("security") + " Closing Price: " + content);
	}

	function getContents(id){ //what is contained
		return $("#" + id).val().toUpperCase();
	}

	function getClosingPrice(){
		//console.log(data);
		var content = "datasets/WIKI/" + getContents("security") + ".json";
		var URL = buildQuandlURL(content, "");
		console.log("URL is " + URL);
		//var jsonData = getQuandlObject(URL);
		// while (jsonData == null){
		// 	var i;
		// 	console.log("not loaded " + i++);
		// 	jsonData = getQuandlObject(URL);
		// }

		//jsonData = getQuandlObject(URL);
		// var d;
		$.getJSON( URL, function( data ) {
  			var items = [];
  		//console.log(data);
  			//console.log(data.data[0][4]);
  			d = data;
  		//console.log(data.data[0][4]);
		})
		console.log(d);

		return d.data[0][4];
	}

	function getQuandlObject(URL){ //error checking...
		//https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?auth_token=VEUT87tRgmysCmNqsAfS
		$.getJSON( URL, function( data ) {
  			var items = [];
  		//console.log(data);
  			//console.log(data.data[0][4]);
  			return data;
  		//console.log(data.data[0][4]);
		})
	}

	function buildQuandlURL(content, trail){ //Won't work with all cases
		return base_url + content + auth_token_url + trail;
	}
})