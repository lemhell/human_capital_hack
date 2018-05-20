window.onload = function () {

var dpoints = [];

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",

	title:{
		text:"Hackathons rating"
	},
	axisX:{
		interval: 1
	},

	data: [{
		type: "bar",
		name: "companies",
		axisYType: "secondary",
		dataPoints: dpoints
	}]
});

function updateChart(path){

	function addData(data) {
		chart.options.data[0].dataPoints = sort_and_remove_x(data);
		chart.render();
	}

	$.getJSON("http://127.0.0.1:5000/stats/".concat(path), addData);
}

updateChart('hacks')

setInterval(function() {updateChart('hacks')}, 150000);


function sort_and_remove_x(data){
   data.sort(function(a, b){return a.y - b.y;})
	    .map(function(a) {
	        delete a.x;
	        return a
	        })
   return data;
}

//$("#mkChinaGreatAgain").click(function () {
//	console.log("!")
//	var objIndex = chart.options.data[0].dataPoints.findIndex((obj => obj.label == 'China'));
//	var objValue = chart.options.data[0].dataPoints[objIndex].y
//	chart.options.data[0].dataPoints[objIndex].y = objValue + 1
//
//	chart.options.data[0].dataPoints
//	  .sort(
//    	function(a, b){
//    		return a.y - b.y;
//    	})
//	  .map(function(p) {
//	  delete p.x;
//	  return p
//	});
//
//	chart.render();
//})

}