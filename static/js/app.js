//load json file

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//Function to create charts 
function createCharts(x) {
    d3.json(url).then(function (data) {
        let dataArray = data.samples
        let result=dataArray.filter(x=>x.id == x)[0]
        console.log(result);
    });
};


//function to create Panel
function createPanels(y) {
    d3.json(url).then(function (data) {
        let dataArray = data.metadata
        let result=dataArray.filter(x=>x.id == y)[0]
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("")
        for (x in result) {
        PANEL.append("h6").text(`${x}: ${result[x]}`)
        }
    });
}

function optionChanged(x) {
    createCharts(x);
    createPanels(x);
}

function init() {
    d3.json(url).then((data) => {
        // Populate the dropdown menu
        var select = d3.select("#selDataset");
        data.names.forEach((name) => {
            select.append("option").text(name).property("value", name);
        });
        createCharts(data.names[0]);
        createPanels(data.names[0]);
    });
}

init();

//create bar chart
// let trace1 = {
//     x: x.reverse(),
//     y: y,
//     type: "bar",
//     orientation: "h",
// };

// let data = [trace1];

// let layout = {
//     title: "The Top 10 OTUs"
// };
// Plotly.newPlot("plot", data, layout);


//let sample = data.names.filter(d =>d.id ==subject)
//console.log(sample)