'use strict';

var pointsOfInterest;

function initGoogleMap() {
  console.info('Initializing Google Map:');
  console.groupCollapsed();

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
      console.info("Requesting API data.");

      if(status === 200){
        console.info('AJAX status is', status);
        pointsOfInterest = JSON.parse(xmlhttp.responseText).pois;
        console.log(pointsOfInterest);
        console.groupEnd();
        displayPOIs(pointsOfInterest);
      }
      else if(status === 400) {
        console.error('AJAX status is', status);
        console.groupEnd();
      }
      else {
        console.error('AJAX status is', status);
        console.groupEnd();
      }
    }
 };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function displayPOIs(POIs){
  var pois = POIs,
      googleMapElem = document.getElementById('google-map'),
      listItem = '',
      count = 0;

  // Creating Google maps POI and Marker
  var map = new google.maps.Map(googleMapElem, {
    center: {
      lat: pois instanceof Array ? pois[0].latitude : pois.latitude,
      lng: pois instanceof Array ? pois[0].longitude : pois.longitude
    },
    zoom: 13
  });

  console.info('POI information:');
  console.groupCollapsed();

  // Always display two POIs
  for(var i = 0; i < 2; ++i){
    var element = [],
        poi = pois instanceof Array ? pointsOfInterest[i] : pois,
        marker = new google.maps.Marker({
          position: {
            lat: poi.latitude,
            lng: poi.longitude
          },
          map: map,
          icon: 'images/pin_69x36_2x.png'
        });

    // Logging POI data in a fancy way.
    for(var prop in poi){
      if(poi.hasOwnProperty(prop)){
        element.push({'key': prop, 'poi': poi[prop]});
      }
    }

    console.groupCollapsed();
    console.table(element);
    console.groupEnd();

    // We want to display the below data from the points of insterest array.
    poi = pointsOfInterest[i];

    // Adding POIs to HTML
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
                  '<a href="#" id="' + poi.id + '" onclick="getDirections(this)">' +
                    '<div class="align-right">' +
                      '<span>' +
                        'Get Directions' +
                      '</span>' +
                    '</div>' +
                  '</a>' +
               '</div>';
  }

  console.groupEnd();

  document.getElementById('locations-list').innerHTML = listItem;
}

function getDirections(link){
  var pois = pointsOfInterest;

  for(var poi in pois){
    if(pois.hasOwnProperty(poi)){
      if(pois[poi].id === parseInt(link.id)){
        displayPOIs(pois[poi]);
      }
    }
  }
}
