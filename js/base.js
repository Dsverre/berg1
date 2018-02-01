function initMap() {
  var bergen = {lat: 60.388395, lng: 5.323619};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: bergen
  });
  var marker = new google.maps.Marker({
    position: bergen,
    map: map
  });
}
