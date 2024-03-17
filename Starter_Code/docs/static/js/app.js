// Fetch the JSON data and console log it
function plotchart(rowitem){

d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
.then((data) => {

let sampleArray=data.samples.filter(X=>X.id==rowitem)
let ids = sampleArray[0].otu_ids 
let sv = sampleArray[0].sample_values
let labels = sampleArray[0].otu_labels
let yticks = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
trace= {
    type:"bar",
    x : sv.slice(0,10).reverse(),
    y: yticks,
    orientation:"h",
    hovertext:labels
  }
  bar_data= [trace]
  let barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };
  Plotly.newPlot("bar", bar_data,barLayout);

//create a bubble chart that displays each sample
trace1={
x: ids,
y: sv,
hovertext:labels,
mode: 'markers',
marker: {
    size: sv,
    color: ids,
    colorscale: 'Earth'
}}
bubble_data= [trace1]
let bubbleLayout = {
title: "Bacteria Sample"
// margin: { t: 30, l: 150 }
};
Plotly.newPlot("bubble", bubble_data,bubbleLayout);
  });
}
function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
.then((data) =>{

selecteddata=data.names;    
    selecteddata.forEach((name) => {
        dropdownMenu.append("option").text(name).property("value", name);
});

rowitem=selecteddata[0]

plotchart(rowitem)
buildMetadata(rowitem)
})

}
init()

function optionChanged(rowitem) {
    plotchart(rowitem);
    buildMetadata(rowitem);
}

function buildMetadata(rowitem){
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
.then((data) => {

    selecteddata=data.metadata;
    let sampleArray1=selecteddata.filter(X=>X.id==rowitem)
    rowdata=sampleArray1[0]

    let PANEL = d3.select("#sample-metadata");

    //Use '.html("") to clear any exsisting metadata
    PANEL.html("");

    for (key in rowdata){
        PANEL.append("h6").text(`${key.toUpperCase()}: ${rowdata[key]}`);
    };
}  
)
}
