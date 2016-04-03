d3.select('body')
	.append('svg')
	.attr('width', 800)
	.attr('height', 500);

function randPoint() {
	var rand = Math.random;
	return { x: rand()*10, y: rand()*10, r: rand()*10 };
}

var data = [];
// Generate 300 random elements
for(var i=0; i < 300; i++){
	data.push(randPoint());
}

function draw(){
	var svg = d3.select('svg');
	// Key function to identify elements
	function key(d, i){
		return d.x + '#' + d.y;
	}

	var circles = svg.selectAll('circle').data(data, key);

	circles.enter()
		.append('circle')
		.attr('r', function(d){ return d.r; })
		.attr('cx', function(d){ return d.x*70 + 10 })
		.attr('cy', function(d){ return d.y*40 + 10 })
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
}, 150);
