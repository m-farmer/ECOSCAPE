import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Circles = () => {
  const width = window.innerWidth;
  const height = window.innerHeight - 50;

  const Chart = useRef();

  const binLocations = "https://data.cityofnewyork.us/resource/sxx4-xhzg.json";

  const [bins, setBins] = useState([]);
  let hashMap = {
    Bronx: 0,
    Brooklyn: 0,
    Manhattan: 0,
    "Staten Island": 0,
    Queens: 0,
  };

  let boroughs = [];
  useEffect(() => {
    fetch(binLocations)
      .then((response) => response.json())
      .then((data) => {
        setBins(data);
        const boroughs = data.map((e) => {
          console.log("e.borough", e.borough);
          return e;
        });

        boroughs.forEach((each) => {
          hashMap[each.borough] = hashMap[each.borough] + 1;
        });
      });
  }, [bins.length]);

  bins.forEach((each) => {
    if (each.borough === "Brooklyn ") {
      each.borough = "Brooklyn";
    }
    hashMap[each.borough] = hashMap[each.borough] + 1;
  });
  console.log("hashMap", hashMap);

  let graphArr = [];

  for (let info in hashMap) {
    graphArr.push({
      category: info,
      count: hashMap[info],
    });
  }

  console.log("graphArr", graphArr);

  useEffect(() => {
    const svg = d3
      .select(Chart.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "black");

    const x = d3.scaleLinear().domain([0, graphArr.length]).range([0, width]);

    svg
      .append("g")
      .selectAll("text")
      .data(graphArr)
      .join("text")
      .text((d) => d.category)
      .attr("x", (d, i) => x(i))
      .attr("y", height / 2)
      .attr("fill", "white")
      .style("font-size", 20);

    svg
      .append("g")
      .selectAll("circle")
      .data(graphArr)
      .join("circle")
      .attr("r", (d) => d.count / 2)
      .attr("cx", (d, i) => x(i) + d.count / 2)
      .attr("cy", 200)
      .attr("fill", "white");
  });

  return (
    <div>
      <svg className="circleChart" ref={Chart}></svg>
    </div>
  );
};

export default Circles;
