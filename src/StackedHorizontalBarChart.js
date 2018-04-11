import React, {
    Component
} from 'react';
import * as d3 from 'd3';
import './stackedHorizontalBarChart.css';
class StackedHorizonalBarChart extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }
    createBarChart() {
        const node = this.node
        
        d3
            .select("body")
            .append("div")
            .attr("id", "tooltip")
            .attr("class", "hidden").html(`
    <p><span id="value">100</span>
    </p>`);
        var initStackedBarChart = {
            draw: function (config) {
                let stackKey = config.key,
                    data = config.data;
                let margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 50
                },
                    width = 560 - margin.left - margin.right,
                    height = 460 - margin.top - margin.bottom,
                    xScale = d3.scaleLinear().rangeRound([0, width]),
                    yScale = d3
                        .scaleBand()
                        .rangeRound([height, 0])
                        .padding(0.1), // spacing between the bars
                    color = d3.scaleOrdinal(d3.schemeCategory10),
                    xAxis = d3.axisBottom(xScale).ticks(4, ",f") // number of ticks
                        .tickSize(-height, 0),
                    yAxis = d3.axisLeft(yScale), //.tickFormat(d3.timeFormat("%b")),
                    svg = d3
                        .select(node)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr(
                            "transform",
                            "translate(" + margin.left + "," + margin.top + ")"
                        );

                var stack = d3
                    .stack()
                    .keys(stackKey)
                    /*.order(d3.stackOrder)*/
                    .offset(d3.stackOffsetNone);

                var layers = stack(data);
                data.sort(function (a, b) {
                    return b.total - a.total;
                });
                yScale.domain(
                    data.map(function (d) {
                        return d.date;
                    })
                );
                xScale
                    .domain([
                        0,
                        d3.max(layers[layers.length - 1], function (d) {
                            return d[0] + d[1];
                        })
                    ])
                    .nice();
                var dynamicColor;
                var layer = svg
                    .selectAll(".layer")
                    .data(layers)
                    .enter()
                    .append("g")
                    .attr("class", "layer")
                    .style("fill", function (d, i) {
                        return color(i);
                    });

                layer
                    .selectAll("rect")
                    .data(function (d) {
                        return d;
                    })
                    .enter()
                    .append("rect")
                    .attr("y", function (d) {
                        return yScale(d.data.date);
                    })
                    .attr("x", function (d) {
                        return xScale(d[0]);
                    })
                    .attr("height", yScale.bandwidth())
                    .attr("width", function (d) {
                        return xScale(d[1]) - xScale(d[0]);
                    })
                    .on("mouseover", function (data) {
                        d3.select(this).attr("class", "applied");

                        // var xPos = parseFloat(d3.select(this).attr("x"));
                        var xPos = d3.event.pageX + 10;
                        var yPos = d3.event.pageY - 25;
                        // parseFloat(d3.select(this).attr("y")) + yScale.bandwidth() / 2;

                        d3
                            .select("#tooltip")
                            .style("left", xPos + "px")
                            .style("top", yPos + "px")
                            .select("#value")
                            .html(data.data.date + "<br>"
                                + "Tickers:" + (data[1] - data[0]))

                        d3.select("#tooltip").classed("hidden", false);
                    })

                    .on("mouseout", function (data) {
                        d3.select(this).attr("class", "borderRemoved");
                        d3.select("#tooltip").classed("hidden", true);
                    });

                svg
                    .append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + (height + 5) + ")")
                    .call(xAxis);

                svg
                    .append("g")
                    .attr("class", "axis axis--y")
                    .attr("transform", "translate(0,0)")
                    .call(yAxis);
            }
        };
        var data = this.props.data; 
        var key = ["other", "tickerSent", "tickerNotSent"];
        initStackedBarChart.draw({
            data: data,
            key: key
        });

    }
    render() {
        return <svg ref={node => this.node = node}
            width={500} height={500}>
        </svg>
    }

}
    export default StackedHorizonalBarChart;