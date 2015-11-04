var data = d3.csv("csvFile.csv", function(data) {
	return {
		"k1" : d.k1,
		"doverA" : d.doverA
		};
	}, function(data) {
		console.log(data[0]);
});

margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};

width = 960 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;

var x = d3.time.scale().range([margin.left, width - margin.right])
    .domain([d3.min(data, function (d) { return (d.k1);}),
    d3.max(data, function(d) { return (d.k1);})
    ]);

var y = d3.scale.linear().range([height - margin.top, margin.bottom])
    .domain([d3.min(data, function (d) { return (d.doverA); }),
    d3.max(data, function(d) { return (d.doverA); })
    ]);

var line = d3.svg.line()
    .x(function (d) {
    return x(d.k1);
})
    .y(function (d) {
    return y(d.doverA);
});

var zoom = d3.behavior.zoom()
    .x(x)
    .y(y)
    .on("zoom", zoomed);

svg = d3.select('#chart')
    .append("svg:svg")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append("svg:g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

svg.append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "plot");

var make_x_axis = function () {
    return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5);
};

var make_y_axis = function () {
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);
};

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)
    .tickFormat(d3.format(",.0f"));

svg.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
    .attr("class", "x grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_axis()
    .tickSize(-height, 0, 0)
    .tickFormat(""));

svg.append("g")
    .attr("class", "y grid")
    .call(make_y_axis()
    .tickSize(-width, 0, 0)
    .tickFormat(""));

var clip = svg.append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height);

var chartBody = svg.append("g")
    .attr("clip-path", "url(#clip)");

chartBody.append("svg:path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

function zoomed() {
    console.log(d3.event.translate);
    console.log(d3.event.scale);
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
    svg.select(".x.grid")
        .call(make_x_axis()
        .tickSize(-height, 0, 0)
        .tickFormat(""));
    svg.select(".y.grid")
        .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat(""));
    svg.select(".line")
        .attr("class", "line")
        .attr("d", line);
}
