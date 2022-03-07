// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
  .append("svg")
  .attr("class", "holder")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Initialize brush for Scatterplot1 and points. We will need these to be global. 
// Initialize brush for Scatterplot2 and points. We will need these to be global.
// Initialize bars. We will need these to be global. 
let brush1;
let brush2;
let myCircles1;
let myCircles2;
let bars;

// append svg object to the body of the page to house Scatterplot2 (call it svg2)
const svg2 = d3.select("#vis-holder")
  .append("svg")
  .attr("class", "holder")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


// append svg object to the body of the page to house bar chart 
const svg3 = d3.select("#vis-holder")
  .append("svg")
  .attr("class", "holder")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const databar = [
  { species: 'setosa', count: 50 },
  { species: 'versicolor', count: 50 },
  { species: 'virginica', count: 50 },
];


// Define color scale
const color = d3.scaleOrdinal()
  .domain(["setosa", "versicolor", "virginica"])
  .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {

  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    x1 = d3.scaleLinear()
      .domain([0, maxX1])
      .range([margin.left, width - margin.right]);

    // Add x axis 
    svg1.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x1))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", margin.bottom - 4)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(xKey1)
      );

    // Finx max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    y1 = d3.scaleLinear()
      .domain([0, maxY1])
      .range([height - margin.bottom, margin.top]);

    // Add y axis 
    svg1.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y1))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", 0)
        .attr("y", margin.top)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(yKey1)
      );

    // Add points
    myCircles1 = svg1.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", (d) => x1(d[xKey1]))
      .attr("cy", (d) => y1(d[yKey1]))
      .attr("r", 8)
      .style("fill", (d) => color(d.Species))
      .style("opacity", 0.5);

    // Define a brush (call it brush1)
    // Code modeled after https://www.d3-graph-gallery.com/graph/interactivity_brush.html
    brush1 = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("start", clear)
      .on("brush", updateChart1)

    // Add brush1 to svg1
    svg1.call(brush1)

  }

  // Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)
  {
    xKey2 = "Sepal_Width";
    yKey2 = "Petal_Width";

    // Find max x
    let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create X scale
    x2 = d3.scaleLinear()
      .domain([0, maxX2])
      .range([margin.left, width - margin.right]);

    // Add x axis 
    svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x2))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", margin.bottom - 4)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(xKey2)
      );

    // Finx max y 
    let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create Y scale
    y2 = d3.scaleLinear()
      .domain([0, maxY2])
      .range([height - margin.bottom, margin.top]);

    // Add y axis 
    svg2.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y2))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", 0)
        .attr("y", margin.top)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(yKey2)
      );


    // Add points
    myCircles2 = svg2.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", (d) => x2(d[xKey2]))
      .attr("cy", (d) => y2(d[yKey2]))
      .attr("r", 8)
      .style("fill", (d) => color(d.Species))
      .style("opacity", 0.5);

    // Define a brush (call it brush2)
    // Code modeled after https://www.d3-graph-gallery.com/graph/interactivity_brush.html
    brush2 = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("start", clear)
      .on("brush", updateChart2)

    // Add brush2 to svg2
    svg2.call(brush2)

  }

  // Barchart with counts of different species
  {
    // Bar chart code here 

    xKey3 = "species";
    yKey3 = "count";

    // Find the maximum y value provided within 'databar' by going through scores column
    let maxY3 = d3.max(databar, function (d) { return d.count; });

    // For y value, lists what pixel value to plot, linearly scales data 
    let yScale3 = d3.scaleLinear()
      .domain([0, maxY3])
      .range([height - margin.bottom, margin.top]);

    // For x values, add bar plot scale
    let xScale3 = d3.scaleBand() // uses scaleBand rather than linearly scaling data
      .domain(d3.range(databar.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Adds the left y axis to the barchart by appending the axis to previously created svg
    svg3.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale3))
      .attr("font-size", '20px');

    // Adds the x axis to the svg
    svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale3) // gives the x axis scale
        .tickFormat(i => databar[i].species))  // use .tickformat to add specific labels to each tick mark
      .attr("font-size", '20px');


    bars = svg3.selectAll(".bar") // select everything from the class bar for svg 1
      .data(databar) // binds data to empty selection
      .enter()  // makes a placeholder svg for each row in data1
      .append("rect") // appends a rectangle to svg 1 for each row in databar
      .attr("x", (d, i) => xScale3(i)) // setting x position for the rectangles based on the data and what row we are on
      //, return x scale of the row we are on
      .attr("id", (d) => d.species)
      .style("fill", (d) => color(d.species))
      .style("opacity", 0.5)
      .attr("y", (d) => yScale3(d.count)) // setting y position based on yscale of the score
      .attr("height", (d) => (height - margin.bottom) - yScale3(d.count)) // set height for the bars
      .attr("width", xScale3.bandwidth()) // set width for the bars, bandwith allows d3 to go through number of categories and space and 
    // choose appropriate bandwith
  }

  //Brushing Code---------------------------------------------------------------------------------------------

  // Call to removes existing brushes 
  function clear() {
    svg1.call(d3.brush().clear);
    svg2.call(d3.brush().clear);
  }

  // Call when Scatterplot1 is brushed 
  function updateChart1(brushEvent) {
    // Find coordinates of brushed region 
    // extent is an array holding the coordinates of each corner of a selection
    // [ (bottom left)[x1 , y1] , (top right)[x2 , y2] ]
    let extent = brushEvent.selection;

    // Give bold outline to all points within the brush region in Scatterplot1
    myCircles1.classed("brushed", (d) => { return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1])); })

    // Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
    myCircles2.classed("brushed", (d) => { return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1])); })

  }

  // Call when Scatterplot2 is brushed 
  function updateChart2(brushEvent) {
    // Find coordinates of brushed region 
    // extent is an array holding the coordinates of each corner of a selection
    // [ (bottom left)[x1 , y1] , (top right)[x2 , y2] ]
    let extent = brushEvent.selection;

    // Start an empty set that you can store names of selected species in 
    let species = [];

    // Give bold outline to all points within the brush region in Scatterplot2
    myCircles2.classed("brushed", (d) => { return isBrushed(extent, x2(d[xKey2]), y2(d[yKey2])); })




    // Give bold outline to all points in Scatterplot1 corresponding to points within the brush region in Scatterplot
    myCircles1.classed("brushed", (d) => {
      let yes = isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]));
      item = d["Species"];
      // collect names of brushed species
      if (yes && !species.includes(item)) {
        species.push(item);
      }
      return yes;
    })

    // Give bold outline to all bars in bar chart with corresponding to species selected by Scatterplot2 brush
    d3.select("#setosa").classed("brushed", species.includes("setosa"));
    d3.select("#versicolor").classed("brushed", species.includes("versicolor"));
    d3.select("#virginica").classed("brushed", species.includes("virginica"));

    species = [];
  }

  //Finds dots within the brushed region
  function isBrushed(brush_coords, cx, cy) {
    if (brush_coords === null) return;

    var x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
  }
});
