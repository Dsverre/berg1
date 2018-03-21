function initMap() {
  var upihl = {lat: 60.388395, lng: 5.323619};
  var stadion = {lat: 60.367101, lng: 5.357427};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: upihl
  });

  var contentString1 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">Ulrikke Pihls Hus</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Ulrikke Pihls hus</b> er et av mange universitetsbygg i Bergen sentrum.</p>'+
  '</div>'+
  '</div>';

  var infowindow1 = new google.maps.InfoWindow({
          content: contentString1
  });

  var marker1 = new google.maps.Marker({
    position: upihl,
    map: map
  });

  marker1.addListener('click', function() {
    infowindow1.open(map, marker1);
  });

  var contentString2 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">Brann Stadion</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Brann stadion</b> huser byens Eliteserielag i fotball.</p>'+
  '</div>'+
  '</div>';

  var infowindow2 = new google.maps.InfoWindow({
          content: contentString2
  });

  var marker2 = new google.maps.Marker({
    position: stadion,
    map: map
  });

  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });

}

function sokeFunk() {
  var searchResults = [];
}
