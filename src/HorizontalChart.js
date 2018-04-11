import React, { Component } from 'react';
import * as d3 from 'd3';
// import './chart.css';
class HorizontalChart extends Component {
    // render(){
    //     return <div>sdf</div>
    // }
    render() {

        var data = this.props.data;
        var chartContainer = this.props.chartContainer;
        var div = d3.select("body").append("div").attr("class", "toolTip");
        var containerDiv = d3.select("body").append("div").attr("id", chartContainer);
        var axisMargin = 20,
            margin = 40,
            valueMargin = 4,
            width = parseInt(d3.select('body').style('width'), 10) - 300,
            height = parseInt(d3.select('body').style('height'), 10),
            barHeight = (height - axisMargin - margin * 2) * 0.4 / data.length,
            barPadding = (height - axisMargin - margin * 2) * 0.6 / data.length,
            bar, svg, scale, xAxis, labelWidth = 0;

        let max = d3.max(data, function (d) { return d.value; });

        svg = d3.select('body')
            .append("svg")
            .attr("width", width)
            .attr("height", height);


        bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

        bar.attr("class", "bar")
            .attr("cx", 0)
            .attr("transform", function (d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        bar.append("text")
            .attr("class", "label")
            .attr("y", barHeight / 2)
            .attr("dy", ".35em") //vertical align middle
            .text(function (d) {
                return d.label;
            }).each(function () {
                labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
            });

        scale = d3.scaleLinear()
            .domain([0, max])
            .range([0, width - margin * 2 - labelWidth]);

        xAxis = d3.axisBottom()
            .scale(scale)
            .ticks(2, ",f") 
            .tickSize(-height + 2 * margin + axisMargin)
        //.orient("bottom");

        bar.append("rect")
            .attr("transform", "translate(" + labelWidth + ", 0)")
            .attr("height", barHeight)
            .attr("width", function (d) {
                return scale(d.value);
            });

        bar.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function (d) {
                return (d.value + "%");
            })
            .attr("x", function (d) {
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scale(d.value));
            });

        bar
            .on("mousemove", function (d) {
                div.style("left", d3.event.pageX + 10 + "px");
                div.style("top", d3.event.pageY - 25 + "px");
                div.style("display", "inline-block");
                div.html((d.label) + "<br>" + (d.value) + "%");
            });
        bar
            .on("mouseout", function (d) {
                div.style("display", "none");
            });

        svg.insert("g", ":first-child")
            .attr("class", "axisHorizontal")
            .attr("transform", "translate(" + (margin + labelWidth) + "," + (height - axisMargin - margin) + ")")
            .call(xAxis);
        return (
            <div></div>
        );
    }
}

export default HorizontalChart;
