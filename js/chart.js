//This section is the popular chart code//
function doAjax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then((json) => {
			callback(json);
		});
}
function makeChart(data)
{
    const cuisines = data;
	const canvasDiv = document.querySelector("#myChart");
    const ctx = canvasDiv.getContext("2d");
    const name = getCuisines()
    const percentages = getPercentages()

  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
        labels: name,
        datasets: [{
            label: '% Popularity',
            backgroundColor: 
				'rgba( 254, 175, 18, 1)',
            borderColor: 
                'rgba(254, 175, 18, 1)',
            borderWidth: 1,
            data: percentages
        }]
    },

    _options: {
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
    get options() {
        return this._options;
    },
    set options(value) {
        this._options = value;
    },
   });

	function getCuisines() {
		return cuisines.map(function (cuisine) {
			return cuisine.name;
		});
	}

	function getPercentages() {
		return cuisines.map(function (cuisine) {
			return cuisine.percentage;
		});
	}
}


function chartIt(){
    doAjax("./data/cuisines.json",makeChart);
  }



  hideChart();
	
//move to new file//
function hideChart() {
    window.onload = function () {
        document.getElementById("myChart").style.display = 'none';

    };
}
//move to new file//
function hideDiv() {
	const x = document.getElementById("myChart");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "block";
	}
  }
  
  runChart();

//move to new file//
function runChart() {
    window.addEventListener("load", chartIt);
}
// let showChart = document.getElementById("chart-button")
// showChart.addEventListener("click", event => {
// 	chartIt()
// 	event.preventDefault()
// 	showChart.classList.add("show")


// });
