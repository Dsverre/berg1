var markers = [];
var sokeRes = [];
var flag = 0;
var toa = 0;
var dataset;
var map;

window.onload = function() {
  var currentUrl = window.location.href;
  var page = currentUrl.split("/")[currentUrl.split("/").length-1];
  if(page == "toaletter.html") initList("https://hotell.difi.no/api/json/bergen/dokart?", "plassering");
  else if(page == "lekeplasser.html") initList("https://hotell.difi.no/api/json/bergen/lekeplasser?", "navn");
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


function initList(url, syntax) {


  hentUrl(url).then(function (result) {
    dataset = JSON.parse(result);
    for(i = 0; i < dataset.entries.length; i++) {
      if(syntax == "navn") var holder = dataset.entries[i].navn;
      else if(syntax == "plassering") var holder = dataset.entries[i].plassering;
      var node = document.createElement("LI");
      var textnode = document.createTextNode(i+1 + ": " + holder);
      node.appendChild(textnode);
      document.getElementById("liste").appendChild(node);
    }
    flag = 0;
    markAuto(syntax);

  });
}


function markAuto() {


    for(i = 0; i < dataset.entries.length; i++) {
      var content = document.createElement("div");
      content.setAttribute("class", "content");

      var sideNotice = document.createElement("div");
      sideNotice.setAttribute("class", "sideNotice");

      content.appendChild(sideNotice);

      var firstHeading = document.createElement("h1");
      firstHeading.setAttribute("id", "firstHeading");
      if(arguments[0] == "navn") var holder1 = dataset.entries[i].navn;
      else if(arguments[0] == "plassering") var holder1 = dataset.entries[i].plassering;
      var headingText = document.createTextNode((i+1) + ". " + holder1);
      firstHeading.appendChild(headingText);
      content.appendChild(firstHeading);

      var bodyContent = document.createElement("div");
      bodyContent.setAttribute("class", "bodyContent");
      if(arguments[0] == "navn") var holder2 = "";
      else if(arguments[0] == "plassering") var holder2 = dataset.entries[i].adresse;
      var paraText = document.createTextNode(holder2);
      bodyContent.appendChild(paraText);
      content.appendChild(bodyContent);

      var infoWindow = new google.maps.InfoWindow();
      var tempPos = {lat: parseFloat(dataset.entries[i].latitude), lng: parseFloat(dataset.entries[i].longitude)};
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
     document.getElementById("toaliste").removeChild(document.getElementById("liste").firstChild);
  };
}

function printRes(res) {
  for(i = 0; i < res.length; i++) {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(i+1 + ": " + res[i].plassering);
    node.appendChild(textnode);
    document.getElementById("liste").appendChild(node);
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
    initToa();
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
  for(i = 0; i < dataset.length; i++) {
    if(sokeParam == dataset[i].plassering.toUpperCase()) {
      sokeRes.push(dataset[i]);
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
  adresser = Object.keys(dataset.adresse);
  adresser = new RegExp(dataset[0].adresse|dataset[1].adresse|dataset[2].adresse|dataset[3].adresse|dataset[4].adresse|dataset[5].adresse|dataset[6].adresse|dataset[7].adresse|dataset[8].adresse|dataset[9].adresse|dataset[10].adresse|dataset[11].adresse|dataset[12].adresse|dataset[13].adresse);
  treff = sokeParam.match(adresse);
//  var searchParams = Object.keys(searchObject);
  //for(i=0; i < dataset.length; i++) {
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
  for(i = 0; i < dataset.entries.length; i++) {
    if(dataset.entries[i].tid_sondag != "NULL") {
      x.push(i);
      sokeRes.push(dataset.entries[i]);
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
  for(i = 0; i < dataset.entries.length; i++) {
    if(dataset.entries[i].dame != "NULL") {
      x.push(i);
      sokeRes.push(dataset.entries[i]);
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
  for(i = 0; i < dataset.entries.length; i++) {
    if(dataset.entries[i].stellerom != "NULL") {
      x.push(i);
      sokeRes.push(dataset.entries[i]);
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
