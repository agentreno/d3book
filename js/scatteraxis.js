// Set up the containers
var width = 800;
var height = 500;
var svg = d3.select('body')
	.append('svg')
	.attr('width', width)
	.attr('height', height);
var svg_data = svg.append('g')
	.attr('class', 'data');
var svg_axis = svg.append('g')
	.attr('class', 'axis');
var svg_x_axis = svg.append('g')
	.attr('class', 'x-axis');
var svg_y_axis = svg.append('g')
	.attr('class', 'y-axis');

var margin = {top: 40, right: 40, bottom: 40, left: 60};

// Domain for values
var start = new Date('2013-01-01');
var end = new Date('2013-12-31');

// Random data point generator
var randPoint = function () {
	var rand = Math.random;
	var rand_time = start.getTime() + rand() *
		(end.getTime() - start.getTime());
	return { x:new Date(rand_time), y: rand() * 5000, r: rand() * 10 };
}

// Generate 300 random elements
var data = d3.range(300).map(randPoint);

function draw(){
	var svg = d3.select('svg');
	// Key function to identify elements
	function key(d, i){
		return d.x + '#' + d.y;
	}

	// x-axis runs from start of year to latest date
	// maps to available width within margins
	var x_scale = d3.time.scale()
		.domain([start, d3.max(data, function(d){ return d.x })])
		.range([margin.left, width - margin.right])
		.nice();

	// y-axis runs from 0 to maximum data point (0-5000)
	// maps to available height within margins
	var y_scale = d3.scale.linear()
		.domain([0, d3.max(data, function(d){ return d.y })])
		.range([margin.top, height - margin.bottom])
		.nice();

	// x-axis uses short month name, ticks above the axis
	var x_axis = d3.svg.axis()
		.scale(x_scale)
		.orient('top')
		.tickFormat(d3.time.format('%b'));

	// Move the axis down to the end of the top margin
	svg_x_axis
		.attr('transform', 'translate(0, ' + margin.top + ')')
		.call(x_axis);

	// y-axis SI prefix (e.g. 2K, 5M) to 3 decimal places
	// ticks to the left of the axis
	var y_axis = d3.svg.axis()
		.scale(y_scale)
		.orient('left')
		.tickFormat(d3.format('.3s'));

	// Move the axis across to the end of the left margin
	svg_y_axis
		.attr('transform', 'translate(' + margin.left + ', 0)')
		.call(y_axis);

	var circles = svg.selectAll('circle').data(data, key);

	circles.enter()
		.append('circle')
		.attr('r', function(d){ return d.r; })
		.attr('cx', function(d){ return x_scale(d.x) })
		.attr('cy', function(d){ return y_scale(d.y) })
		.attr('fill', function(d){
			return 'rgb(' + parseInt(d.r*25) + ',0,0)';
		});

	circles
		.attr('fill', function(d){
			return 'rgb(' + parseInt(d.r*25) + ',0,0)';
		});

	circles.exit()
		.remove();
}

setInterval(function(){
	data.shift();
	data.push(randPoint());
	draw();
}, 50);
