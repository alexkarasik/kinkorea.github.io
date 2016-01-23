$(document).ready(function(){

    $('#find-charging-station').click(function(){
        var zipcode = $('#zipnum').val();
        getsZip(zipcode);
    })

    $('#zipnum').keydown(function(e){
        if(e.keyCode == 13){
          var zipcode = $('#zipnum').val();
          getsZip(zipcode);
        }
      console.log(e);
    })
});

function getsZip(zip) {
  var regex = new RegExp('^[0-9]+$')

  if(zip.length == 0) {
    alert("Please enter a zipcode")
  }
  else if (!zip.match(regex)) {
    alert("Must be a number");
  }

  else if(zip.length !== 5){
    alert("Must be five digits!");
  }
  else {
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
        if (response.total_results == 0) {
          var output = "Sorry, there are no charging stations in your zip code."
        }else{
          var output = "<h3>Here are your nearest stations:</h3>";
          response.fuel_stations.forEach(function(station, i) {
            // build the individual div
            // concatenate it with the output string
            var net =   '<span class="glyphicon glyphicon-globe" aria-hidden="true"></span>' +
                          'Network: ' + response.fuel_stations[i].ev_network;
            var phone = '<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>' +
                          ' Phone: '+response.fuel_stations[i].station_phone;
            var address = "Address: "+response.fuel_stations[i].street_address;
            var website = "Website: "+response.fuel_stations[i].ev_network_web;

            var station ='<br/><div class="location">' +
                        net + '<br />'+
                        phone + '<br />' +
                        address + '<br />' +
                        website + '<br/>' +

                        '</div>';
            // string1 += string2 ----> string1 = string1 + string2

            output += station;
          });
        }

        $('#results').html(
          output
        );
      }
    })
}
}

/*
 *
 * if (!response) {
    $('#results').html('There are no charging stations);
 } else {

 }
 */
