// import JSON

d3.json("samples.json").then(function(data) {
    console.log(data);
  });

function init(){
  
  //////////////////////////////////////////////
  /// ID Dropdown List ///
  function optionChanged(){
      d3.json("samples.json").then(function(name){
        var id = name.names;
        console.log(id)
        
      d3.selectAll("#selDataset")
      .selectAll("option")
      .data(id)
        .enter()
        .append("option")
        .attr("value", function(n) {
          return n;
        })
        .text(function(n){
          return n;
        });
    });
  }
  optionChanged();

  
  //////////////////////////////////////////////
  /// Demographic Info (Metadata) ///


  //////////////////////////////////////////////
  /// Top 10 OTUs (Bar Chart) ///


  //////////////////////////////////////////////
  /// OTU ID vs Sample Values (Bubble Chart) ///


  //////////////////////////////////////////////
  /// OPT: Scrubs per Week (Gauge Chart) ///


}

init();