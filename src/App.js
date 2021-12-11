import "./App.css";
import { useState, useEffect } from "react";
import Table from "./Components/Table/Table";
import DescriptionContainer from "./Components/DescriptionContainer/DescriptionContainer";
import * as d3 from "d3";
import { FormattedMessage } from "react-intl";


// eslint-disable-next-line
let linkEs = "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
// eslint-disable-next-line
let linkEn = "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";

function App() {
  const [series, setSeries] = useState([]);
  const [selected, setSelected] = useState();
  // eslint-disable-next-line
  

  useEffect(() => {
    if(!navigator.onLine){
      if(localStorage.getItem("seriesPWA") === null) {
        setSeries("Cargando series...");
      } else {
        // eslint-disable-next-line
        setSeries(JSON.parse(localStorage.getItem("seriesPWA")));
      }
    }else{
      const getSeries= async () => {
        let seriesFromServer = await fetchSeries()
        setSeries(seriesFromServer);  
        localStorage.setItem("seriesPWA", JSON.stringify(seriesFromServer));

        
      let canvas = setCanvas();
      let scales = setScales(seriesFromServer);
      setAxesToCanvas(canvas, scales);
      console.log("seriess", seriesFromServer)
      setPointsToCanvas(canvas, seriesFromServer, scales);
      
      }
      getSeries();
      
    }

    
  },  // eslint-disable-next-line
    []);

  const fetchSeries = async () => {
    
    if (<FormattedMessage id="Name"/> === "es"){
    const res = await fetch(
      "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json"
    );
    const data = await res.json();
    console.log("data", data);
    return data;
    } else {
      const res = await fetch(
        "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json"
      );
      const data = await res.json();
      console.log("data", data);
      return data;
    }
  };

  const handleSelection = (id) => {
    setSelected(id);
    let serie = series.find((obj) => {
      return obj.id === id;
    });
    console.log(serie.poster);
    setSelected(serie);
  };

  //d3 setup
  const HEIGHT = 360;
  const WIDTH = 565;

  const OFFSET_TOP = 20;
  const OFFSET_BOTTOM = 30;
  const OFFSET_LEFT = 40;
  const OFFSET_RIGHT = 20;

  // eslint-disable-next-line 
  function setCanvas() {
    d3.selectAll("#d3Container > svg").remove();
    let svg = d3
      .select("#d3Container")
      .append("svg")
      .style("background-color", "#354560")
      .style("color", "#FFFFFF") //With this we've got the color of the axis too
      .attr("height", HEIGHT)
      .attr("width", WIDTH);

    return svg;
  }

    // eslint-disable-next-line 
  function setScales(data) {
    let xRange = [OFFSET_LEFT, WIDTH - OFFSET_RIGHT];
    let yRange = [OFFSET_TOP, HEIGHT - OFFSET_BOTTOM]; // flip order because y-axis origin is upper LEFT

    let xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => parseFloat(d.episodes)),
        d3.max(data, (d) => parseFloat(d.episodes)),
      ])
      .range(xRange);

    let yScale = d3
      .scaleLinear()
      .domain([
        d3.max(data, (d) => parseFloat(d.seasons)),
        d3.min(data, (d) => parseFloat(d.seasons)),
      ])
      .range(yRange);

    return { xScale: xScale, yScale: yScale, xRange: xRange, yRange: yRange };
  }

  // eslint-disable-next-line 
  function setAxesToCanvas(canvas, scales) {
    let y2 = 0;
    let y1 = HEIGHT - OFFSET_BOTTOM;
    console.log("y1: " + y1 + " y2: " + y2);

    //Add scale to X axis
    let xAxis = d3.axisBottom().scale(scales.xScale);

    //Add scale to Y axis
    let yAxis = d3.axisLeft().scale(scales.yScale);

    //Add x-axis to the canvas
    canvas
      .append("g")
      .attr("transform", "translate(0, " + y1 + ")")
      .call(xAxis);

    //Add y-axis to the canvas
    canvas
      .append("g")
      .attr("transform", "translate(" + OFFSET_LEFT + "," + y2 + ")")
      .call(yAxis);
  }

  // eslint-disable-next-line 
  function setPointsToCanvas(canvas, data, scales) {
    console.log(".....", data ) 
    var g = canvas
      .selectAll("circle")
      .data(data)
      .enter();

      g.append("circle")
      .attr("class", "dot")
      .attr("r", 5.5) //Radius size, could map to another dimension
      .attr("cx", function (d) {
        return scales.xScale(parseFloat(d.episodes));
      }) //x position
      .attr("cy", function (d) {
        return scales.yScale(parseFloat(d.seasons));
      }) //y position
      .style("fill", "#FFC107");

      g.append("text")
      .data(data)
      .text(function (d){return d.name})
      .attr("x", function (d) {
        return scales.xScale(parseFloat(d.episodes));
      }) //x position
      .attr("y", function (d) {
        return scales.yScale(parseFloat(d.seasons));
      })
      .style("fill", "#FFFFFF");;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ width: "60%" }}>
          {series.length > 0 ? (
            <>
              <h1 style={{ padding: "10px" }}><FormattedMessage id="Title"/></h1>
              <Table data={series} onSelected={handleSelection}></Table>{" "}
            </>
          ) : (
            "No hay info"
          )}
        </div>
        <div className="col" style={{ width: "40%", padding: "10px" }}>
          <DescriptionContainer selected={selected}></DescriptionContainer>
        </div>
      </div>
      {
        series.length > 0 ? <div className="row" id="d3Container"></div> : ""
      }
      
    </div>
  );
}

export default App;
