
  //////////////////////////////////////////////
  /// ID Dropdown List ///
  function optionChanged(){
    d3.json("samples.json").then(function(data){
      var name_list = data.names;
      // console.log(name_list);
      
    d3.selectAll("#selDataset")
      .selectAll("option")
      .data(name_list)
      .enter()
      .append("option")
      .attr("value", function(name) {
        return name;
      })
      .text(function(name){
        return name;
      });
    });

    // Store Chosen ID for later reference //
    var chosen_id = d3.select("#selDataset").node().value;
    
    // Call the "UpdateCharts" Function with "chosen_id" //
    UpdateCharts(chosen_id);
    
  }
  optionChanged();



  function UpdateCharts(chosen_id){
    
    // Identify JSON Data source for each plot //
    d3.json("samples.json").then(function(data){
      var samples_data = data.samples;
      var demo_info = data.metadata;

      // console.log(samples_data);
      // console.log(demo_info);

      //////////////////////////////////////////////
      /// Demographic Info (Metadata) ///
      demo_info.forEach(function(row){
        if (row.id === parseInt(chosen_id)) {
          d3.select("#sample-metadata").html("");
          // console.log(row.id);

          var test_subject_info = Object.entries(row)
          // console.log(test_subject_info);
          
          test_subject_info.forEach((info) => {
            d3.selectAll("#sample-metadata")
            .append("div")
            .data(info)
            .text(`${info[0]}: ${info[1]}`)
          });
        }
      });
      
      //////////////////////////////////////////////
      /// Dashboard Visuals ///

      samples_data.forEach(function(row){
        if (row.id === chosen_id) {

          var otu_ids = row.otu_ids;
          var otu_labels = row.otu_labels;
          var samp_vals = row.sample_values;
          // console.log(chosen_id);


          /// Top 10 OTUs (Bar Chart) ///

          var trace1 = {
            x: samp_vals.slice(0,10),
            y: otu_ids.map(id => String( `OTU ${id}`)),
            type: "bar",
            orientation: "h",
            text: otu_labels,
            transforms: [{
              type: 'sort',
              target: 'y',
              order: 'descending'
            }],
          };

          var barchart = [trace1];
          console.log(barchart)

          var layout1 = {
            title: `Test Subject #${chosen_id} Results`,
            yaxis: {
              autorange: true,
            },
            xaxis: {
              autorange: true,
            },
          };

          Plotly.newPlot("bar", barchart, layout1);
        
        
          /// OTU ID vs Sample Values (Bubble Chart) ///

          var trace2 = {
            x: otu_ids,
            y: samp_vals,
            text: otu_labels,
            type: "scatter",
            mode: 'markers',
            marker: {
              size: samp_vals,
              color: otu_ids
            },
            transforms: [{
              type: 'sort',
              target: 'y',
              order: 'descending'
            }],
          };

          var bubblechart = [trace2];
          console.log(bubblechart)

          var layout2 = {
              yaxis: {
              autorange: true,
            },
            xaxis: {
              title: `OTU ID`,
              autorange: true,
            },
          };

          Plotly.newPlot("bubble", bubblechart, layout2);


        }
      });
    });
  };
