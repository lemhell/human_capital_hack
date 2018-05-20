window.onload = function () {

var dpoints = [];

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "dark2",

	title:{
		text:"Team rating"
	},
//	axisX:{
//		interval: 1
//	},
	toolTip: {
		shared: true
	},
	legend:{
		cursor: "pointer",
		itemclick: toggleDataSeries
	},

	data: [{
		type: "stackedBar",
		name: "Initial test",
		showInLegend: "true",
		dataPoints: []
	    },

        {
	    type: "stackedBar",
		name: "Java",
		showInLegend: "true",
		dataPoints: []
	    },

        {
	    type: "stackedBar",
		name: "Python",
		showInLegend: "true",
		dataPoints: []
	    },

	    {
		type: "stackedBar",
		name: "Git",
		showInLegend: "true",
		dataPoints: []
	    }
	]

//	data: [{
//		type: "bar",
//		name: "companies",
//		axisYType: "secondary",
//		dataPoints: dpoints
//	}]
});

function updateChart(path){

	function addData(data) {
		chart.options.data[0].dataPoints = data[0];
		chart.options.data[1].dataPoints = data[1];
		chart.options.data[2].dataPoints = data[2];
		chart.options.data[3].dataPoints = data[3];
		chart.render();
	}

	$.getJSON("http://127.0.0.1:5000/stats/".concat(path), addData);
}

updateChart('users')

setInterval(function() {updateChart('users')}, 1500);


function toggleDataSeries(e) {
	if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart.render();
}

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
