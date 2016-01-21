$(document).ready(function(){
    
    $('#find-charging-station').click(function(){
        var zipcode = $('#zipnum').val();
        getsZip(zipcode);
    })
});

function getsZip(zip) {
    $.ajax({
      url: "https://developer.nrel.gov/api/alt-fuel-stations/v1.json",
 
      // The name of the callback parameter, as specified by the YQL service
      jsonp: "callback",
 
      // Tell jQuery we're expecting JSONP
      dataType: "jsonp",
 
      // Tell YQL what we want and that we want JSON
      data: {
        zip: zip,
        api_key: "ETYiicv4GVJxW3bxCcSNVO50mImWidNirU3SKmtb"
      },
 
      // Work with the response
      success: function( response ) {
        console.log(response)
        
        var output = "Here are your nearest stations:";
        response.fuel_stations.forEach(function(station, i) {
          // build the individual div
          // concatenate it with the output string
           var net = 'Network: ' + response.fuel_stations[i].ev_network;
           var phone = 'Phone: '+response.fuel_stations[i].station_phone;
           var address = "Address: "+response.fuel_stations[i].street_address;
           var website = "Website: "+response.fuel_stations[i].ev_network_web;
        
          var station ='<br/><div>' +
                      net + '<br />'+
                      phone + '<br />' +
                      address + '<br />' +
                      website + '<br/>'
                      
                    '</div>';
          // string1 += string2 ----> string1 = string1 + string2
          
          output += station;
        });
        
         
        $('#results').html(
          output
        );
      }
  });
}

/*
 *
 * if (!response) {
    $('#results').html('There are no charging stations);
 } else {
    
 }
 */