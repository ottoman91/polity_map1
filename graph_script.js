// The svg
var svg = d3.select("#svg_1"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
var path = d3.geoPath()
    .projection(projection);

// Data and color scale
var data = d3.map();
var dataNames = d3.map();
var score_1980 = d3.map();
var score_1981 = d3.map();
var score_1982 = d3.map();
var score_1983 = d3.map();
var score_1984 = d3.map();
var score_1985 = d3.map();
var score_1986 = d3.map();
var score_1987 = d3.map();
var score_1988 = d3.map();
var score_1989 = d3.map();
var score_1990 = d3.map();
var score_1991 = d3.map();
var score_1992 = d3.map();
var score_1993 = d3.map();
var score_1994 = d3.map();
var score_1995 = d3.map();
var score_1996 = d3.map();
var score_1997 = d3.map();
var score_1998 = d3.map();
var score_1999 = d3.map();
var score_2000 = d3.map();
var score_2001 = d3.map();
var score_2002 = d3.map();
var score_2003 = d3.map();
var score_2004 = d3.map();
var score_2005 = d3.map();
var score_2006 = d3.map();
var score_2007 = d3.map();
var score_2008 = d3.map();
var score_2009 = d3.map();
var score_2010 = d3.map();
var score_2011 = d3.map();


//var colorScheme = d3.schemeReds[9];
//var colorScheme = ['black','grey','purple','red','brown','#ddd','orange','green', 'blue'];
var colorScheme = ['black','darkred','dimgrey','brown','lightslategrey','olive','saddlebrown','burlywood','maroon','moccasin','beige','chartreuse ','cornflowerblue','greenyellow','hotpink','lightblue','lightgreen','lightpink','lime','royalblue','springgreen'];
//var colorScheme = ['#ccc', 'lightblue', 'orange', '#ccc']; 

var countryShapes;

tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
    //.domain([-10,0,10])
    .domain([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10])
    .range(colorScheme); 
    
//variable for storing the year 
var year = "2011";
//console.log(year);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,20)");
g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Polity Scores");
var labels = ['Less than -10','-10','-9','-8','-7','-6','-5','-4','-3','-2','-1','0','1','2','3','4','5','6','7','8','9','10'];
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(6)
    .scale(colorScale);
    //.scale(schemeAccent);
svg.select(".legendThreshold")
    .call(legend);

// Load external data and boot
d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "polity_scores.csv", function(d) { data.set(d.code, +d.score); dataNames.set(d.code, d.name ); 
                                                      score_1980.set(d.code, +d.score_1980);
                                                      score_1981.set(d.code, +d.score_1981);
                                                      score_1982.set(d.code, +d.score_1982);
                                                      score_1983.set(d.code, +d.score_1983);
                                                      score_1984.set(d.code, +d.score_1984);
                                                      score_1985.set(d.code, +d.score_1985);
                                                      score_1986.set(d.code, +d.score_1986);
                                                      score_1987.set(d.code, +d.score_1987);
                                                      score_1988.set(d.code, +d.score_1988);
                                                      score_1989.set(d.code, +d.score_1989);
                                                      score_1990.set(d.code, +d.score_1990);
                                                      score_1991.set(d.code, +d.score_1991);
                                                      score_1992.set(d.code, +d.score_1992);
                                                      score_1993.set(d.code, +d.score_1993);
                                                      score_1994.set(d.code, +d.score_1994);
                                                      score_1995.set(d.code, +d.score_1995);
                                                      score_1996.set(d.code, +d.score_1996);
                                                      score_1997.set(d.code, +d.score_1997);
                                                      score_1998.set(d.code, +d.score_1998);
                                                      score_1999.set(d.code, +d.score_1999);
                                                      score_2000.set(d.code, +d.score_2000);
                                                      score_2001.set(d.code, +d.score_2001);
                                                      score_2002.set(d.code, +d.score_2002);
                                                      score_2003.set(d.code, +d.score_2003);
                                                      score_2004.set(d.code, +d.score_2004);
                                                      score_2005.set(d.code, +d.score_2005);
                                                      score_2006.set(d.code, +d.score_2006); 
                                                      score_2007.set(d.code, +d.score_2007);
                                                      score_2008.set(d.code, +d.score_2008);
                                                      score_2009.set(d.code, +d.score_2009);
                                                      score_2010.set(d.code, +d.score_2010);
                                                      score_2011.set(d.code, +d.score_2011);
 })
    .await(ready);


//function that updates the value of the year whenever the new value in the slider is selected
    function update(year){
    slider.property("value", year);
    d3.select(".year").text(year);
    //TODO. add a switch statement that selects specific year values when the value is selected
    // countryShapes.style("fill",function(d){
    //   switch(year){
    //     case "1980":
    //         d.1980 = data.get(d.id) || 0;
    //         return colorScale(d.1980);
    //         break;
    //   }
      

    //})
    
  }

    var slider = d3.select(".slider")
    .append("input")
      .attr("type", "range")
      .attr("min", 1980)
      .attr("max", 2011)
      .attr("step", 1)
      .on("input", function() {
        year = this.value;
        update(year);
        console.log(year);
        switch(year){
          case "1980":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1980);
              });  
                countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1980 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1981":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1981);
              });  
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1981 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1982":
              countryShapes.style("fill",function(d){
                //d.score_1982 = data.get(d.id) || 0;
                return colorScale(d.score_1982);
              });  
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1982 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1983":
              countryShapes.style("fill",function(d){
                //d.score_1983 = data.get(d.id) || 0;
                return colorScale(d.score_1983);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1983 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "1984":
              countryShapes.style("fill",function(d){
                //d.score_1984 = data.get(d.id) || 0;
                return colorScale(d.score_1984);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1984 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "1985":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1985);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1985 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1986":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1986);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1986 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1987":
              countryShapes.style("fill",function(d){
                //d.score_1982 = data.get(d.id) || 0;
                return colorScale(d.score_1987);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1987 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1988":
              countryShapes.style("fill",function(d){
                //d.score_1983 = data.get(d.id) || 0;
                return colorScale(d.score_1988);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1988 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "1989":
              countryShapes.style("fill",function(d){
                //d.score_1984 = data.get(d.id) || 0;
                return colorScale(d.score_1989);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1989 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break;
          case "1990":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1990);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1990 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1991":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1991);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1991 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1992":
              countryShapes.style("fill",function(d){
                //d.score_1982 = data.get(d.id) || 0;
                return colorScale(d.score_1992);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1992 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1993":
              countryShapes.style("fill",function(d){
                //d.score_1983 = data.get(d.id) || 0;
                return colorScale(d.score_1993);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1993 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "1994":
              countryShapes.style("fill",function(d){
                //d.score_1984 = data.get(d.id) || 0;
                return colorScale(d.score_1994);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1994 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1995":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1995);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1995 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1996":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_1996);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1996 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1997":
              countryShapes.style("fill",function(d){
                //d.score_1982 = data.get(d.id) || 0;
                return colorScale(d.score_1997);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1997 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "1998":
              countryShapes.style("fill",function(d){
                //d.score_1983 = data.get(d.id) || 0;
                return colorScale(d.score_1998);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1998 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "1999":
              countryShapes.style("fill",function(d){
                //d.score_1984 = data.get(d.id) || 0;
                return colorScale(d.score_1999);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_1999 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2000":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_2000);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2000 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2001":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_2001);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2001 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2002":
              countryShapes.style("fill",function(d){
                //d.score_1982 = data.get(d.id) || 0;
                return colorScale(d.score_2002);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2002 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2003":
              countryShapes.style("fill",function(d){
                //d.score_1983 = data.get(d.id) || 0;
                return colorScale(d.score_2003);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2003 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "2004":
              countryShapes.style("fill",function(d){
                //d.score_1984 = data.get(d.id) || 0;
                return colorScale(d.score_2004);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2004 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break;
          case "2005":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_2005);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2005 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2006":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_2006);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2006 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2007":
              countryShapes.style("fill",function(d){
                //d.score_1982 = data.get(d.id) || 0;
                return colorScale(d.score_2007);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2007 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2008":
              countryShapes.style("fill",function(d){
                //d.score_1983 = data.get(d.id) || 0;
                return colorScale(d.score_2008);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2008 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "2009":
              countryShapes.style("fill",function(d){
                //d.score_1984 = data.get(d.id) || 0;
                return colorScale(d.score_2009);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2009 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break;  
          case "2010":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_2010);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2010 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2011":
              countryShapes.style("fill",function(d){
                return colorScale(d.score_2011);
              }); 
              countryShapes
                     .on("mouseover", function(d) {
                     tooltip.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip.html(
                    "<p><strong>" + "Polity Score:" + d.score_2011 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
        }
      });


function ready(error, topo) {
    if (error) throw error;  

    //store name of country here

    // Draw the map
    countryShapes = svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this count
                  d.score = data.get(d.id) || 0;
                  d.name = dataNames.get(d.id);
                  d.score_1980 = score_1980.get(d.id);
                  d.score_1981 = score_1981.get(d.id);
                  d.score_1982 = score_1982.get(d.id);
                  d.score_1983 = score_1983.get(d.id);
                  d.score_1984 = score_1984.get(d.id);
                  d.score_1985 = score_1985.get(d.id); 
                  d.score_1986 = score_1986.get(d.id);
                  d.score_1987 = score_1987.get(d.id);
                  d.score_1988 = score_1988.get(d.id);
                  d.score_1989 = score_1989.get(d.id);
                  d.score_1990 = score_1990.get(d.id);
                  d.score_1991 = score_1991.get(d.id);
                  d.score_1992 = score_1992.get(d.id);
                  d.score_1993 = score_1993.get(d.id);
                  d.score_1994 = score_1994.get(d.id);
                  d.score_1995 = score_1995.get(d.id);
                  d.score_1996 = score_1996.get(d.id);
                  d.score_1997 = score_1997.get(d.id); 
                  d.score_1998 = score_1998.get(d.id);
                  d.score_1999 = score_1999.get(d.id);
                  d.score_2000 = score_2000.get(d.id);
                  d.score_2001 = score_2001.get(d.id);
                  d.score_2002 = score_2002.get(d.id);
                  d.score_2003 = score_2003.get(d.id);
                  d.score_2004 = score_2004.get(d.id);
                  d.score_2005 = score_2005.get(d.id); 
                  d.score_2006 = score_2006.get(d.id);
                  d.score_2007 = score_2007.get(d.id);
                  d.score_2008 = score_2008.get(d.id);
                  d.score_2009 = score_2009.get(d.id);
                  d.score_2010 = score_2010.get(d.id);
                  d.score_2011 = score_2011.get(d.id);         
            }) 
            .attr("d", path);  

// //TODO move this in the switch statement
  
} 


//javascript code that generates the HDI graph 
//TODO
// The svg
var svg2 = d3.select("#svg_2"),
    width = +svg.attr("width"),
    height = +svg.attr("height"); 

// Data and color scale
var data2 = d3.map();
var names2 = d3.map();
var hdi_1980 = d3.map();
var hdi_1990 = d3.map();
var hdi_2000 = d3.map();
var hdi_2005 = d3.map();
var hdi_2006 = d3.map();
var hdi_2007 = d3.map();
var hdi_2008 = d3.map();
var hdi_2009 = d3.map();
var hdi_2011 = d3.map(); 

var colorScheme2 = ['cyan','lightskyblue','lightblue','dodgerblue','blue','darkblue'];

var countryShapes2; 

tooltip2 = d3.select("body").append("div")
  .attr("class", "tooltip2")
  .style("opacity", 0);

colorScheme2.unshift("#eee")
var colorScale2 = d3.scaleThreshold()
    //.domain([-10,0,10])
    .domain([0.350,0.554,0.7,0.800,1.000])
    .range(colorScheme2); 

//variable for storing the year 
var year2 = "1980";
//console.log(year); 

// Legend
var g2 = svg2.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,20)");
g2.append("text")
    .attr("class", "caption2")
    .attr("x", 0)
    .attr("y", -6)
    .text("Human Development Index Values");
var labels2 = ['Data Unavailable','0.350-0.554(very low)','0.555-0.699(medium)','0.700-0.799(high)','0.800-1.000(very high'];
var legend2 = d3.legendColor()
    .labels(function (d) { return labels2[d.i]; })
    .shapePadding(6)
    .scale(colorScale2);
    //.scale(schemeAccent);
svg2.select(".legendThreshold")
    .call(legend2); 

// Load external data and boot
d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "hdi_scores.csv", function(d) {    names2.set(d.code, d.name ); 
                                                      hdi_1980.set(d.code, +d.HDI_1980);
                                                      hdi_1990.set(d.code, +d.HDI_1990);
                                                      hdi_2000.set(d.code, +d.HDI_2000);
                                                      hdi_2005.set(d.code, +d.HDI_2005);
                                                      hdi_2007.set(d.code, +d.HDI_2007);
                                                      hdi_2008.set(d.code, +d.HDI_2008);
                                                      hdi_2009.set(d.code, +d.HDI_2009);
                                                      hdi_2011.set(d.code, +d.HDI_2011);
 })
    .await(ready2); 

//function that updates the value of the year whenever the new value in the slider is selected
    function update2(year2){
    slider1.property("value", year2);
    d3.select(".year1").text(year2);
    //TODO. add a switch statement that selects specific year values when the value is selected
    // countryShapes.style("fill",function(d){
    //   switch(year){
    //     case "1980":
    //         d.1980 = data.get(d.id) || 0;
    //         return colorScale(d.1980);
    //         break;
    //   }
       }

    //}) 


    var slider1 = d3.select(".slider1")
    .append("input")
      .attr("type", "range")
      .attr("min", 1980)
      .attr("max", 2011)
      .attr("step", 5)
      .on("input", function() {
        year2 = this.value;
        update2(year2);
        console.log(year2);
        switch(year2){
          case "1980":
              countryShapes2.style("fill",function(d){
                return colorScale2(d.HDI_1980);
              });  
                countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_1980 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break;          
          case "1990":
              countryShapes2.style("fill",function(d){
                return colorScale2(d.HDI_1990);
              }); 
              countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_1990 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
         
          case "2000":
              countryShapes2.style("fill",function(d){
                return colorScale2(d.HDI_2000);
              }); 
              countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_2000 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          
          case "2005":
              countryShapes2.style("fill",function(d){
                return colorScale2(d.HDI_2005);
              }); 
              countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_2005 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          
          case "2007":
              countryShapes2.style("fill",function(d){
                //d.score_1982 = data.get(d.id) || 0;
                return colorScale2(d.HDI_2007);
              }); 
              countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_2007 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
          case "2008":
              countryShapes2.style("fill",function(d){
                //d.score_1983 = data.get(d.id) || 0;
                return colorScale2(d.HDI_2008);
              }); 
              countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_2008 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 

          case "2009":
              countryShapes2.style("fill",function(d){
                //d.score_1984 = data.get(d.id) || 0;
                return colorScale2(d.HDI_2009);
              }); 
              countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_2009 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break;  
          
          case "2011":
              countryShapes2.style("fill",function(d){
                return colorScale2(d.HDI_2011);
              }); 
              countryShapes2
                     .on("mouseover", function(d) {
                     tooltip2.transition()
                    .duration(250)
                    .style("opacity", 1);
                    tooltip2.html(
                    "<p><strong>" + "HDI:" + d.HDI_2011 +  "</strong></p>" +
                    "<p><strong>" + d.name +  "</strong></p>")
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                    tooltip2.transition()
                    .duration(250)
                    .style("opacity", 0);
                });  
              break; 
        }
      }); 

function ready2(error, topo) {
    if (error) throw error;  

    //store name of country here

    // Draw the map
    countryShapes2 = svg2.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this count
                  d.name = names2.get(d.id);
                  d.HDI_1980 = hdi_1980.get(d.id);
                  d.HDI_1990 = hdi_1990.get(d.id);
                  d.HDI_2000 = hdi_2000.get(d.id);
                  d.HDI_2005 = hdi_2005.get(d.id); 
                  d.HDI_2007 = hdi_2007.get(d.id);
                  d.HDI_2008 = hdi_2008.get(d.id);
                  d.HDI_2009 = hdi_2009.get(d.id);
                  d.HDI_2011 = hdi_2011.get(d.id);         
            }) 
            .attr("d", path);  

//TODO move this in the switch statement
  
} 
