d3.select('body')
	.append('svg')
	.attr('width', 800)
	.attr('height', 500);

var data = [];

setInterval(function(){
	// Add new random element to data array
	if(data.length < 8){
		data.push(Math.random());
	} else {
		data = [];
	}
	// Redraw the scene
	draw();
}, 1000);

function draw(){
	var svg = d3.select('svg');

	// Bind data to selection
	var circles = svg.selectAll('circle').data(data);

	// Update pattern step 1: update existing
	circles.attr('fill', 'orange');

	// Update pattern step 2: update new
	circles.enter()
		.append('circle')
		.attr('fill', 'red')
		.attr('r', 40)
		.attr('cx', function(d, i){ return i*100 + 50; })
		.attr('cy', 50);

	// Update pattern step 3: update all
	circles
		.style('stroke', 'black');

	// Update pattern step 4: update exit
	circles.exit()
		.remove();
}
