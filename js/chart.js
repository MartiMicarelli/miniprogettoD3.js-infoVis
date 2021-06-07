var border = 40; // margin
var width = 1550 - 2 * border; // width of the actual drawing
var height = 600 - 2 * border; // height of the actual drawing
var padding = 1; // padding value

var svg = d3.select("body").append("svg")
    .attr("width", width + 2*border)      
    .attr("height", height + 2*border);

var transitionTime = 1000; // duration of each transition

var graph = svg.append('g')
		.attr('transform', `translate(${border}, ${border})`);
	
// x is the scale for x-axis (the scale for y-axis instead is not used because not useful for the purpose of the project)
// domain instead is updated by updateXScaleDomain()
var xScale = d3.scaleBand()
	.range([0,width])
	.padding(padding);
	
// domain of the scale for x-axis
function updateXScaleDomain(data) {
    xScale.domain(data.map((s) => s.id)); 
}

// function to draw the x-axis (y-axis instead is not drawn)
function drawXAxis(){
    graph.append("g")
    	.attr('transform', `translate(0, ${height})`)
    	.call(d3.axisBottom(xScale) ); 
}  

halfRadius = 25; // maximum of the range used to scale each petal

// to scale the petal dimension each variable will be mapped to the chosen range
// the domain instead is set by the scaleRadius function	
var sizeA = d3.scaleLinear()
  	.range([0, halfRadius]);
var sizeB = d3.scaleLinear()
  	.range([0, halfRadius]);
var sizeC = d3.scaleLinear()
  	.range([0, halfRadius]);
var sizeD = d3.scaleLinear()
  	.range([0, halfRadius]);

// function to set the domain of the petals size
function scaleRadius(values){
	// the maximum of the domain for each variable is computed as the maximum of that variable in the dataset
	sizeA.domain([0, d3.max(values, function(d) { return d.a; })]);
	sizeB.domain([0, d3.max(values, function(d) { return d.b; })]);
	sizeC.domain([0, d3.max(values, function(d) { return d.c; })]);
	sizeD.domain([0, d3.max(values, function(d) { return d.d; })]);
}

// chosen path used to draw each petal
petalPath = "M0,0 " + "C" + 0.9 + ",-" + 1.3 + " " + 2.3 + ",-" + 2.5 + " 0,-" + 2.8 + " C-" + 2.3 + ",-" + 2.5 + " -" + 0.9 + ",-" + 1.3 + " 0,0";


function updateDrawing(values){

// petals for the 'a' variable
var petalA = graph.selectAll(".petalA").data(values,function(d){return d.a})
  // enter clause, to add new petals for the 'a' variable
  petalA.enter().append("path")
  .attr("class", "petalA")
  // each petal is translated to the right position and scaled according to the value of the 'a' variable
  // rotation instead is not necessary in this case because this is the petal above
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") scale(" + sizeA(d.a) + ") "; })
  .attr("d", petalPath)
  .style("fill", "rgb(51,153,255)");

  // exit clause, to remove elements if necessary
  petalA.exit().remove();

  // update at each transition, to update the position on the x-axis 
  petalA.transition().duration(transitionTime)
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") scale(" + sizeA(d.a) + ") "; });

// petals for the 'b' variable
var petalB = graph.selectAll(".petalB").data(values,function(d){return d.b})
  // enter clause, to add new petals for the 'b' variable
  petalB.enter().append("path")
  .attr("class", "petalB")
  // each petal is translated to the right position, rotated of 90 degrees (right petal) and scaled according to the value of the 'b' variable
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") rotate(" + 90 + ") scale(" + sizeB(d.b) + ") "; })
  .attr("d", petalPath)
  .style("fill", "rgb(255,51,51)");

  // exit clause, to remove elements if necessary
  petalB.exit().remove();

  // update at each transition, to update the position on the x-axis 
  petalB.transition().duration(transitionTime)
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") rotate(" + 90 + ") scale(" + sizeB(d.b) + ") "; });
  
// petals for the 'c' variable  
var petalC = graph.selectAll(".petalC").data(values,function(d){return d.c})
  // enter clause, to add new petals for the 'c' variable
  petalC.enter().append("path")
  .attr("class", "petalC")
  // each petal is translated to the right position, rotated of 180 degrees (petal below) and scaled according to the value of the 'c' variable
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") rotate(" + 180 + ") scale(" + sizeC(d.c) + ") "; })
  .attr("d", petalPath)
  .style("fill", "rgb(51,255,51)");
  
  // exit clause, to remove elements if necessary
  petalC.exit().remove();
  
  // update at each transition, to update the position on the x-axis 
  petalC.transition().duration(transitionTime)
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") rotate(" + 180 + ") scale(" + sizeC(d.c) + ") "; });

// petals for the 'd' variable   
var petalD = graph.selectAll(".petalD").data(values,function(d){return d.d})
  // enter clause, to add new petals for the 'd' variable
  petalD.enter().append("path")
  .attr("class", "petalD")
  // each petal is translated to the right position, rotated of 270 degrees (left petal) and scaled according to the value of the 'd' variable
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") rotate(" + 270 + ") scale(" + sizeD(d.d) + ") "; })
  .attr("d", petalPath)
  .style("fill", "rgb(255,255,51)");

  // exit clause, to remove elements if necessary
  petalD.exit().remove();

  // update at each transition, to update the position on the x-axis
  petalD.transition().duration(transitionTime)
  .attr("transform", function(d) { return "translate(" + xScale(d.id) + "," + height/2 + ") rotate(" + 270 + ") scale(" + sizeD(d.d) + ") "; });
 
}


d3.json("data/dataset.json")
	.then(function(data) {

		// drawing of the x-axis and initial drawing
		updateXScaleDomain(data);
		drawXAxis();
		scaleRadius(data);
		updateDrawing(data);
		
        // mouse over and mouse out over petals event
		var petalA = svg.selectAll(".petalA")
			.on("mouseover", function(d){
				d3.select(this).attr("opacity",0.5);	
				})
			.on("mouseout", function(d){
				d3.select(this).attr("opacity",1);
				})

		var petalB = svg.selectAll(".petalB")
			.on("mouseover", function(d){
				d3.select(this).attr("opacity",0.5);	
				})
			.on("mouseout", function(d){
				d3.select(this).attr("opacity",1);
				})

		var petalC = svg.selectAll(".petalC")
			.on("mouseover", function(d){
				d3.select(this).attr("opacity",0.5);	
				})
			.on("mouseout", function(d){
				d3.select(this).attr("opacity",1);
				})

		var petalD = svg.selectAll(".petalD")
			.on("mouseover", function(d){
				d3.select(this).attr("opacity",0.5);	
				})
			.on("mouseout", function(d){
				d3.select(this).attr("opacity",1);
				})
		
		// to handle the click event on petals	
		petalA.on("click", function(d){	
			// reordering of data according to 'a' variable
			data.sort( function (x,y) { return d3.ascending(x.a,y.a)});
			updateXScaleDomain(data);
			updateDrawing(data);
			})
		petalB.on("click", function(d){	
		    // reordering of data according to 'b' variable	
			data.sort( function (x,y) { return d3.ascending(x.b,y.b)})
			updateXScaleDomain(data);
			updateDrawing(data);
			})
		petalC.on("click", function(d){	
		    // reordering of data according to 'c' variable	
			data.sort( function (x,y) { return d3.ascending(x.c,y.c)})
			updateXScaleDomain(data);
			updateDrawing(data);
			})
		petalD.on("click", function(d){	
		    // reordering of data according to 'd' variable	
			data.sort( function (x,y) { return d3.ascending(x.d,y.d)})
			updateXScaleDomain(data);
			updateDrawing(data);
			}) 
			
		
	})
	.catch(function(error) {
		console.log(error); 
  	});