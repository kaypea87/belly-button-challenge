//load json file

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//Function to create charts 
function createCharts(sample) {
    d3.json(url).then(function (data) {
        let dataArray = data.samples
        let result = dataArray.filter(x => x.id == sample)[0]
        console.log(result);
        let otu_ids = result.otu_ids
        let otu_labels = result.otu_labels
        let sample_values = result.sample_values
        //create bar chart
        let trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0.10).map(u => `OTU ${u}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        };

        let data_bar = [trace1];

        let layout = {
            title: "The Top 10 OTUs"
        };
        Plotly.newPlot("bar", data_bar, layout);

        //create bubble chart
        let trace2 = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Portland"
            }
        
        };

        let data_bubble = [trace2];

        let layout2 = {
            title: "Bacteria Cultures per Sample",
            xaxis: {
                title: "OTU ID"
            }
        };
        Plotly.newPlot("bubble", data_bubble, layout2);




    });
};


//function to create Panel
function createPanels(y) {
    d3.json(url).then(function (data) {
        let dataArray = data.metadata
        let result = dataArray.filter(x => x.id == y)[0]
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



//let sample = data.names.filter(d =>d.id ==subject)
//console.log(sample)