function initGoogleMap(url) {
  var xmlhttp,
      url = "http://cls.vrvm.com/pois?id=5541&limit=10&latitude=37.7324&longitude=-121.8916";;

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      var status = xmlhttp.status;

      if(status === 200){
         console.info('AJAX request status is', status);
         displayPOIs(JSON.parse(xmlhttp.responseText));
      }
      else if(status === 400) {
         console.error('AJAX request status is', status);
      }
      else {
         console.error('AJAX request status is', status);
     }
   }
 };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function displayPOIs(response){
  var pois = response.pois,
      googleMapElem = document.getElementById('google-map'),
      listItem = '';

  pois.map(function(elem, index){
    var poi = elem;

    if(index === 0){
      // Use the first POI which is the nearest, to populate the Google Maps
      var map = new google.maps.Map(googleMapElem, {
        center: {
          lat: poi.latitude,
          lng: poi.longitude
        },
        zoom: 10
      });

      var marker = new google.maps.Marker({
        position: {
          lat: poi.latitude,
          lng: poi.longitude
        },
        map: map,
        icon: 'images/pin_69x36_2x.png'
      });
    }
    else {
      listItem += '<div>' +
                    '<div class="align-left">' +
                      '<div>' +
                        poi.address_1 +
                      '</div>' +
                      '<div>' +
                        poi.city + ' ' + poi.region + ' ' + poi.postal_code +
                      '</div>' +
                      '<div>' +
                        '<strong>' +
                          poi.miles + ' MILES AWAY' +
                        '</strong>' +
                      '</div>' +
                    '</div>' +
                    '<a href="#" id="' + poi.id + '">' +
                      '<div class="align-right">' +
                        '<span>' +
                          'Get Directions' +
                        '</span>' +
                      '</div>' +
                    '</a>' +
                 '</div>';
    }
  });

  document.getElementById('locations-list').innerHTML = listItem;
}
