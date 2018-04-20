var markers = [];
var sokeRes = [];
var flag = 0;
var toa = 0;
var toilets;
var map;

window.onload = function() {
  initList();
}


function initMap() {


  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 60.3879681, lng: 5.334608}
  });

}

function hentUrl(url) {
    return new Promise(function(resolve, reject) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		    resolve(xhr.response);
		} else {
		    reject(xhr.statusText);
		}
	    }
	};
	xhr.send();
    });
}


function initList() {


  hentUrl("https://hotell.difi.no/api/json/bergen/dokart?").then(function (result) {
    toilets = JSON.parse(result);
    for(i = 0; i < toilets.entries.length; i++) {
      var node = document.createElement("LI");
      var textnode = document.createTextNode(i+1 + ": " + toilets.entries[i].plassering);
      node.appendChild(textnode);
      document.getElementById("toaliste").appendChild(node);
    }
    flag = 0;
    markAuto();

  });
}

function markAuto() {


    for(i = 0; i < toilets.entries.length; i++) {
      var content = document.createElement("div");
      content.setAttribute("class", "content");

      var sideNotice = document.createElement("div");
      sideNotice.setAttribute("class", "sideNotice");

      content.appendChild(sideNotice);

      var firstHeading = document.createElement("h1");
      firstHeading.setAttribute("id", "firstHeading");
      var headingText = document.createTextNode(toilets.entries[i].id + ". " + toilets.entries[i].plassering);
      firstHeading.appendChild(headingText);
      content.appendChild(firstHeading);

      var bodyContent = document.createElement("div");
      bodyContent.setAttribute("class", "bodyContent");
      var paraText = document.createTextNode(toilets.entries[i].adresse);
      bodyContent.appendChild(paraText);
      content.appendChild(bodyContent);

      var infoWindow = new google.maps.InfoWindow();
      var tempPos = {lat: parseFloat(toilets.entries[i].latitude), lng: parseFloat(toilets.entries[i].longitude)};
      var marker = new google.maps.Marker({
        position: tempPos,
        map: map,
        content: content,
        label: (i+1).toString()
      });

      marker.addListener('click', function() {
          infoWindow.setContent(this.content);
          infoWindow.open(map, this);
        });
      markers.push(marker);
    };
}





function refresh() {
  while(document.getElementById("toaliste").hasChildNodes()) {
     document.getElementById("toaliste").removeChild(document.getElementById("toaliste").firstChild);
  };
}

function printRes(res) {
  for(i = 0; i < res.length; i++) {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(i+1 + ": " + res[i].plassering);
    node.appendChild(textnode);
    document.getElementById("toaliste").appendChild(node);
  };
}


function showMarkers(para) {
  for(i = 0; i < markers.length; i++) {
    markers[i].setVisible(para);
  };
}



function flagCheck() {
  if(flag == 1) {
    refresh();
    initList();
    flag = 0;
    return true;
  };

}
//IndexOf + Include (js-funksjoner til å matche treff)

function sokeFunk() {
  if(document.getElementById("sokinput").value == "") return;

  var sokeParam = document.getElementById("sokinput").value.toUpperCase();
  var sokeRes = [];
  var x;
  for(i = 0; i < toilets.length; i++) {
    if(sokeParam == toilets[i].plassering.toUpperCase()) {
      sokeRes.push(toilets[i]);
      x = i;
      };
    }

  if(sokeRes == 0) return;

  showMarkers(false);
  markers[x].setVisible(true);

  refresh();
  printRes(sokeRes);
}



var treff;
var adresser = [];
function asokeFunk() {
  var sokeParam = document.getElementById("sokinput").value;
  adresser = Object.keys(toilets.adresse);
  adresser = new RegExp(toilets[0].adresse|toilets[1].adresse|toilets[2].adresse|toilets[3].adresse|toilets[4].adresse|toilets[5].adresse|toilets[6].adresse|toilets[7].adresse|toilets[8].adresse|toilets[9].adresse|toilets[10].adresse|toilets[11].adresse|toilets[12].adresse|toilets[13].adresse);
  treff = sokeParam.match(adresse);
//  var searchParams = Object.keys(searchObject);
  //for(i=0; i < toilets.length; i++) {
    //var truthChecker = [] // will contain boolean values "true" for each param checked.
    //for(y=0; y < searchParams.length; y++) {
        //if(persons[i][searchParams[y]] == searchObject[searchParams[y]]) {
          //  truthChecker.push(true);
      //  }
        //if(truthChecker.length == searchParams.length) { //if all params are true, person is pushed.
          //  searchResults.push(persons[i]);
      //  }
  //  }
//}

}



var now;

function openNow() {
 now = new Date();
}





function openSunday() {
  if(flagCheck() == true) return;

  var sokeRes = [];
  var x = [];
  for(i = 0; i < toilets.entries.length; i++) {
    if(toilets.entries[i].tid_sondag != "NULL") {
      x.push(i);
      sokeRes.push(toilets.entries[i]);
      };
    };

    showMarkers(false);
    for(i = 0; i < x.length; i++) {
      markers[x[i]].setVisible(true);
    };

  refresh();
  printRes(sokeRes);
  flag = 1;
}



function harDame() {
  if(flagCheck() == true) return;

  var sokeRes = [];
  var x = [];
  for(i = 0; i < toilets.entries.length; i++) {
    if(toilets.entries[i].dame != "NULL") {
      x.push(i);
      sokeRes.push(toilets.entries[i]);
      };
    };

    showMarkers(false);
    for(i = 0; i < x.length; i++) {
      markers[x[i]].setVisible(true);
    };

  refresh();
  printRes(sokeRes);
  flag = 1;
}

function harStell() {
  if(flagCheck() == true) return;

  var sokeRes = [];
  var x = [];
  for(i = 0; i < toilets.entries.length; i++) {
    if(toilets.entries[i].stellerom != "NULL") {
      x.push(i);
      sokeRes.push(toilets.entries[i]);
      };
    };

    showMarkers(false);
    for(i = 0; i < x.length; i++) {
      markers[x[i]].setVisible(true);
    };

  refresh();
  printRes(sokeRes);
  flag = 1;
}
