var waypoints = $('#followme-nav').waypoint({
  handler: function (direction) {
    if(direction === 'down') {
      $('#followme-nav').addClass('fixed');
    } else {
      $('#followme-nav').removeClass('fixed');
    }
  }
})

$("body").on('refreshWaypoint', function() { Waypoint.refreshAll();});

var maxRange = 50;
var minRange = 10;
var data = [
  {
    name: 'Lenny',
    gender: 'female',
    referrals: Math.floor(Math.random() * (maxRange - minRange)) + minRange
  },
  {
    name: 'Paul',
    gender: 'male',
    referrals: Math.floor(Math.random() * (maxRange - minRange)) + minRange
  },
  {
    name: 'Susan',
    gender: 'female',
    referrals: Math.floor(Math.random() * (maxRange - minRange)) + minRange
  },
  {
    name: 'Mary',
    gender: 'female',
    referrals: Math.floor(Math.random() * (maxRange - minRange)) + minRange
  },
  {
    name: 'John',
    gender: 'male',
    referrals: Math.floor(Math.random() * (maxRange - minRange)) + minRange
  }
];

(function componentChart(winnerArray, rank) {

  winnerArray = _.sortBy(winnerArray, 'referrals');

  var imageAsset = {
    male: "img/oi/male-02.svg",
    female: "img/oi/female-01.svg"
  };

  // basic variable for configuration
  var svg = d3.select("#chart"),
    targetWidth = 600 || parseInt(svg.style("width")),
    targetHeight = 480 || parseInt(svg.style("height")),
    margin = { top: 70, right: 0, bottom: 70, left: 0 },
    width = (targetWidth - margin.left - margin.right) * 0.8,
    height = targetHeight - margin.top - margin.bottom,
    g = svg.append("g")
      .attr("transform", "translate(" + (targetWidth * 0.2) + "," + margin.top + ")")
      .attr("id", "chart-content"),
    barGap = 20,
    minBarHeight = 5
    ;

  // setting the scale for d3
  var xScale = d3.scaleBand().range([0, width]),
    yScale = d3.scaleLinear().range([height, margin.top]);

  // axis according to the scale above
  var xAxisLine = d3.axisBottom(xScale);

  xScale.domain(winnerArray.map(function (w) {
    return w.name;
  }));
  yScale.domain([-minBarHeight,
  d3.max(winnerArray, function (w) { return w.referrals; })
  ]);



  // inserting the bars
  g.selectAll('.bar')
    .data(winnerArray)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) { return xScale(d.name) + (barGap / 2) })
    .attr('width', Math.floor(width / 5) - barGap)
    .attr('y', function (d) { return Math.floor(yScale(d.referrals)) })
    .attr('height', function (d) { return Math.floor(height - yScale(d.referrals)) });

  // insert icons
  g.selectAll('.icon')
    .data(winnerArray)
    .enter().append('image')
    .attr('class', 'icon')
    .attr('xlink:href', function (d) { return imageAsset[d.gender]; })
    .attr('x', function (d) { return xScale(d.name) + (barGap / 2) })
    .attr('width', Math.floor(width / 5) - barGap)
    .attr('y', function (d) { return yScale(d.referrals) - 100 });

  // insert corner
  svg.append('image')
    .attr('class', 'trophy')
    .attr('xlink:href', 'img/oi/trophy-01.svg')
    .attr('x', 10)
    .attr('y', 10);

  // insert corner text
  svg.append('text')
    .attr('class', 'your-rank')
    .attr('x', 110)
    .attr('y', 60)
    .text(function () { return 'Your Ranking: ' });

  // insert corner text rank no.
  svg.append('text')
    .attr('class', 'your-rank number')
    .attr('x', 230)
    .attr('y', 60)
    .text(function () { return '#' + rank });

  // insert text
  var offsetText = { x: 50, y: 15 };
  g.selectAll('.rank')
    .data(winnerArray)
    .enter().append('text')
    .attr('class', 'rank')
    .attr('font-family', 'Arial')
    .attr('text-anchor', 'middle')
    .attr('font-size', 20)
    .attr('fill', 'white')
    .attr('x', function (d) { return xScale(d.name) + (barGap / 2) + offsetText.x; })
    .attr('y', function (d) { return yScale(d.referrals) + offsetText.y; })
    .text(function (d, i) { return winnerArray.length - i });

  var offsetTextValue = { x: 50, y: 29 };
  g.selectAll('.value')
    .data(winnerArray)
    .enter().append('text')
    .attr('class', 'table value')
    .attr('text-anchor', 'middle')
    .attr('x', function (d) { return xScale(d.name) + Math.floor(width / 10); })
    .attr('y', function (d) { return height + offsetTextValue.y })
    .text(function (d) { return d.referrals });

  g.selectAll('.name')
    .data(winnerArray)
    .enter().append('text')
    .attr('class', 'table name')
    .attr('text-anchor', 'middle')
    .attr('x', function (d) { return xScale(d.name) + Math.floor(width / 10); })
    .attr('y', function (d) { return height + (offsetTextValue.y * 2) })
    .text(function (d) { return d.name });
  // insert xAxis
  // add the axis

  g.append("g")
    .attr("class", "axis axis--x-line")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisLine.tickArguments([5, "d"]));

  var freetextOffset = { x: 60, y: 27 };
  svg.append("g")
    .attr("transform", "translate(60, " + (targetHeight - margin.bottom + freetextOffset.y) + ")")
    .attr("class", "grey-text")
    .append("text")
    .attr("text-anchor", "middle")
    .text("Referrals Done");

  svg.append("g")
    .attr("transform", "translate(60," + (targetHeight - margin.bottom + (2 * freetextOffset.y + 5)) + ")")
    .attr("class", "red-text name")
    .append("text")
    .attr("text-anchor", "middle")
    .text("Name");

  // jquery trigger event for waypoints
  $("body").trigger("refreshWaypoint");

  })(data, 15);

$('.slider').on('click', function() {
  $(this).toggleClass('open');
});