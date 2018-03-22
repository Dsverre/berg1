var markers = []

function initMap() {
  var nonnesoer = {lat: 60.3879681, lng: 5.334608};
  var nonnenord = {lat: 60.3884988, lng: 5.3345382};
  var skyss = {lat: 60.388868, lng: 5.3337597};
  var jernb = {lat: 60.39041, lng: 5.332995};
  var mathall = {lat: 60.394554, lng: 5.324099};
  var strakai = {lat: 60.3951003, lng: 5.3220606};
  var bkomm = {lat: 60.3913793, lng: 5.3290558};
  var bstor = {lat: 60.3891105, lng: 5.3322315};
  var sundt = {lat: 60.392209, lng: 5.324011};
  var xhib = {lat: 60.3927098, lng: 5.3262019};
  var gall = {lat: 60.3932345, lng: 5.3252363};
  var kløv = {lat: 60.3944194, lng: 5.3205649};
  var brygge = {lat: 60.3975913, lng: 5.3244317};
  var csundt = {lat: 60.3973581	, lng: 5.3132629};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: nonnesoer
  });

  var contentString1 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">1. NONNESETER TERMINAL, SØR</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Lungegårdskaien</b></p>'+
  '</div>'+
  '</div>';

  var infowindow1 = new google.maps.InfoWindow({
          content: contentString1
  });

  var marker1 = new google.maps.Marker({
    position: nonnesoer,
    map: map
  });

  marker1.addListener('click', function() {
    infowindow1.open(map, marker1);
  });

  var contentString2 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">2. NONNESETER TERMINAL, NORD</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Østre Strømkai</b></p>'+
  '</div>'+
  '</div>';

  var infowindow2 = new google.maps.InfoWindow({
          content: contentString2
  });

  var marker2 = new google.maps.Marker({
    position: nonnenord,
    map: map
  });

  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });

  var contentString3 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">3. SKYSS KUNDESENTER</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Østre Strømkai</b></p>'+
  '</div>'+
  '</div>';

  var infowindow3 = new google.maps.InfoWindow({
          content: contentString3
  });

  var marker3 = new google.maps.Marker({
    position: skyss,
    map: map
  });

  marker3.addListener('click', function() {
    infowindow3.open(map, marker3);
  });

  var contentString4 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">4. JERNBANESTASJONEN</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Strømgaten 4</b></p>'+
  '</div>'+
  '</div>';

  var infowindow4 = new google.maps.InfoWindow({
          content: contentString4
  });

  var marker4 = new google.maps.Marker({
    position: jernb,
    map: map
  });

  marker4.addListener('click', function() {
    infowindow4.open(map, marker4);
  });

  var contentString5 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">5. MATHALLEN</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Strandkaien 3</b></p>'+
  '</div>'+
  '</div>';

  var infowindow5 = new google.maps.InfoWindow({
          content: contentString5
  });

  var marker5 = new google.maps.Marker({
    position: mathall,
    map: map
  });

  marker5.addListener('click', function() {
    infowindow5.open(map, marker5);
  });

  var contentString6 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">6. STRANDKAITERMINALEN</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Strandkaien</b></p>'+
  '</div>'+
  '</div>';

  var infowindow6 = new google.maps.InfoWindow({
          content: contentString6
  });

  var marker6 = new google.maps.Marker({
    position: strakai,
    map: map
  });

  marker6.addListener('click', function() {
    infowindow6.open(map, marker6);
  });

  var contentString7 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">7. BERGEN KOMMUNE</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Østre Strømkai</b></p>'+
  '</div>'+
  '</div>';

  var infowindow7 = new google.maps.InfoWindow({
          content: contentString7
  });

  var marker7 = new google.maps.Marker({
    position: nonnenord,
    map: map
  });

  marker7.addListener('click', function() {
    infowindow7.open(map, marker7);
  });

  var contentString8 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">8. BERGEN STORSENTER</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Strømgaten 8</b></p>'+
  '</div>'+
  '</div>';

  var infowindow8 = new google.maps.InfoWindow({
          content: contentString8
  });

  var marker8 = new google.maps.Marker({
    position: bstor,
    map: map
  });

  marker8.addListener('click', function() {
    infowindow8.open(map, marker8);
  });

  var contentString9 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">9. SUNDT MOTEHUS</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Torgallmenningen 14</b></p>'+
  '</div>'+
  '</div>';

  var infowindow9 = new google.maps.InfoWindow({
          content: contentString9
  });

  var marker9 = new google.maps.Marker({
    position: sundt,
    map: map
  });

  marker9.addListener('click', function() {
    infowindow9.open(map, marker9);
  });

  var contentString10 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">10. XHIBITION</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Småstrandgaten 3</b></p>'+
  '</div>'+
  '</div>';

  var infowindow10 = new google.maps.InfoWindow({
          content: contentString10
  });

  var marker10 = new google.maps.Marker({
    position: xhib,
    map: map
  });

  marker10.addListener('click', function() {
    infowindow10.open(map, marker10);
  });

  var contentString11 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">11. GALLERIET</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Torgallmenningen 8</b></p>'+
  '</div>'+
  '</div>';

  var infowindow11 = new google.maps.InfoWindow({
          content: contentString11
  });

  var marker11 = new google.maps.Marker({
    position: gall,
    map: map
  });

  marker11.addListener('click', function() {
    infowindow11.open(map, marker11);
  });

  var contentString12 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">12. KLØVERHUSET</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Strandgaten 13-15</b></p>'+
  '</div>'+
  '</div>';

  var infowindow12 = new google.maps.InfoWindow({
          content: contentString12
  });

  var marker12 = new google.maps.Marker({
    position: kløv,
    map: map
  });

  marker12.addListener('click', function() {
    infowindow12.open(map, marker12);
  });

  var contentString13 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">13. BRYGGEN BESØKSSENTER</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Jacobsfjorden, Bryggen</b></p>'+
  '</div>'+
  '</div>';

  var infowindow13 = new google.maps.InfoWindow({
          content: contentString13
  });

  var marker13 = new google.maps.Marker({
    position: brygge,
    map: map
  });

  marker13.addListener('click', function() {
    infowindow13.open(map, marker13);
  });

  var contentString14 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">14. C. SUNDTSGT</h1>'+
  '<div id="bodyContent">'+
  '<p><b>C. Sundts gt</b></p>'+
  '</div>'+
  '</div>';

  var infowindow14 = new google.maps.InfoWindow({
          content: contentString14
  });

  var marker14 = new google.maps.Marker({
    position: sundt,
    map: map
  });

  marker14.addListener('click', function() {
    infowindow14.open(map, marker14);
  });

  markers = [marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10, marker11, marker12, marker13, marker14];


}


function hideMarkers() {
  for(i = 0; i < markers.length; i++) {
    markers[i].setVisible(false);
  };
}



function sokeFunk() {
  if(document.getElementById("sokinput").value == "") return;

  var sokeParam = document.getElementById("sokinput").value.toUpperCase();
  var sokeRes = [];
  var x;
  for(i = 0; i < toilets.length; i++) {
    if(sokeParam == toilets[i].plassering) {
      sokeRes.push(toilets[i]);
      x = i;
      };
    }

  if(sokeRes == 0) return;

  hideMarkers();
  markers[x].setVisible(true);

  var Parent = document.getElementById("toaliste");
  while(Parent.hasChildNodes()) {
     Parent.removeChild(Parent.firstChild);
  };

  for(i = 0; i < sokeRes.length; i++) {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(sokeRes[i].num +". " + sokeRes[i].plassering);
    node.appendChild(textnode);
    document.getElementById("toaliste").appendChild(node);
  };

}
