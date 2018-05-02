var markers = []; //Et array med alle markørene. Fylles i markAuto(), som kalles av intitList, via window.onload. Brukes senere for å skjule alle markørene før man via et midlertidig array viser kun de man har treff på.
var sokeRes = []; //Et array som holder json-objekter man har truffet i søk. Brukes per nå av alle funksjoner som manipulerer datasettet. Vet ikke om helt det trenger å være globalt, se printRes().
var flag = 0; //Et flagg som brukes av de booleanske funksjonene via flagCheck(), for å rense listen når man "unchecker". Er kanskje overflødig.
var dataset; //Arrayet som holder alle JSON-objektene som sidene er bygget rundt. Klargjøres vha løftet hentUrl() utført av initList(). Blir ikke manifulert av noe per nå. Må ha .entries med begge datasettene, og de har dessverre forskjellige navn på egenskapene, derav disse if og else if'ene.
var map; //Holder hele kartet? Måtte være global for at markørene skulle kunne skjules, men kan være overflødig.
var syntax; //Brukes for å avgjøre hvilket datasett siden bruker. Blir satt via onload-sjekken.


// Ved lasting av vinduet kjøres en skreddersydd funksjon.
// Denne funksjonen starter med å splitte nettadressen ved /, før den lagrer det siste leddet av denne splitten som en variabel.
// Deretter følger en sjekk av denne variabelen, hvor resultatet avgjør hvilket datasett som fødes til initList(), samt at syntax settes.
window.onload = function() {
  var currentUrl = window.location.href;
  var page = currentUrl.split("/")[currentUrl.split("/").length-1];
  if(page == "toaletter.html") {
    initList("https://hotell.difi.no/api/json/bergen/dokart?");
    syntax = "toaletter";
  }
  else if(page == "lekeplasser.html" || page == "fav-leke.html") {
     initList("https://hotell.difi.no/api/json/bergen/lekeplasser?");
     syntax = "leke"
  }

}

// Initiering av kartet. Her settes den globale variabelen map.
// Zoom settes og koordinatene til et passende sted i Bergen sentrun styre sentrum av kartet.
function initMap() {


  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 60.3879681, lng: 5.334608}
  });

}


// Løftet som henter datasettet.
// Det returneres et løfte, som deretter kan manipuleres vha .then og .catch.
//
// Den skreddersydde(anonyme) funksjonen som løftet utfører er en HttpRequest.


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



// Funksjon for å printe et dataset til elementet #liste
// Ble gjort global for å gi flagCheck() muligheten til å printe kun lista, og ikke måtte kjøre hele initList()
// Inneholder en sjekk for å avgjøre kilde-syntax.
// Tar et dataset med JSON objekter som parameter.
function printSet(set) {
  for(i = 0; i < dataset.entries.length; i++) {
    if(syntax == "leke") var holder = set.entries[i].navn;
    else if(syntax == "toaletter") var holder = set.entries[i].plassering;
    var node = document.createElement("LI");
    var textnode = document.createTextNode(i+1 + ": " + holder);
    node.appendChild(textnode);
    document.getElementById("liste").appendChild(node);
  };
}




// Funksjonen som er ryggraden i hele skriptet.
// Her hentes datasettet, #liste elementet fylles av objektene datasettet inneholder via printSet().
// Etter dette kjøres markAuto() for å initialisere markørene.
//
// For å få tak i selve datasettet, så må man gi det til den anonyme funksjonen(result).
//
function initList(url) {


  hentUrl(url).then(function (result) {
    dataset = JSON.parse(result);
    printSet(dataset);
    markAuto();

  });
}

// Funksjonen som lager markører og infovindu(er).
// Først lages innholdet til variabelen content. Her er en og en sjekk for å avgjøre kildesyntaksen til innholdet.
// Koordinatene vi vil ha markøren på lagres, før markøren lages.
// Markøren gis en posisjon, det sies hvilket kart den tilhører og vi gir markøren et label.
// Vi lagrer også innholde i content, som ble opprettet i starten av funksjonen, i en vilkårlig navngitt variabel, content.
// Slik kan vi få tak i den når vi etterpå skreddersyr en funksjon for å vise infovinduet, som limes på hver eneste markør via en click-listener.
// Det er viktig at this brukes for å få tak i innholdet vi lagrer i markøren.
//
// Til slutt fylles markers-arrayet.
function markAuto() {


    for(i = 0; i < dataset.entries.length; i++) {
      var content = document.createElement("div");
      content.setAttribute("class", "content");

      var sideNotice = document.createElement("div");
      sideNotice.setAttribute("class", "sideNotice");
      content.appendChild(sideNotice);

      var firstHeading = document.createElement("h1");
      firstHeading.setAttribute("id", "firstHeading");
      if(syntax == "leke") var holder1 = dataset.entries[i].navn;
      else if(syntax == "toaletter") var holder1 = dataset.entries[i].plassering;
      var headingText = document.createTextNode((i+1) + ". " + holder1);
      firstHeading.appendChild(headingText);
      content.appendChild(firstHeading);

      var bodyContent = document.createElement("div");
      bodyContent.setAttribute("class", "bodyContent");
      if(syntax == "leke") var holder2 = "";
      else if(syntax == "toaletter") var holder2 = dataset.entries[i].adresse;
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

// kan fjerne alle markørene.


// Funksjon for å tømme #liste-elementet. Føles smått overflødig eller i det minste meget uelegant.
function refresh() {
  while(document.getElementById("liste").hasChildNodes()) {
     document.getElementById("liste").removeChild(document.getElementById("liste").firstChild);
  };
}


// Funksjon som brukes av de fleste søkefunksjonene for å skrive en ny liste.
// Per nå sjekket det et flagg for å tømme listen før man fyller den med resultatet av denne funksjonen, men føles uelegant.
// Blir fødd med et sokeRes av de fleste funksjoner som bruker den, så kanskje kan sokeRes derfor gjøres lokal.
// Bemerk at res, altså en lokal sokeRes, har blitt fyllt med JSON-objektene, noe som betyr at man ikke trnger .entries som ellers.
function printRes(res) {
  for(i = 0; i < res.length; i++) {
    var node = document.createElement("LI");
    if(syntax == "leke") var holder = res[i].navn;
    else if(syntax == "toaletter") var holder = res[i].plassering;
    var textnode = document.createTextNode(i+1 + ": " + holder);
    node.appendChild(textnode);
    document.getElementById("liste").appendChild(node);
  };
}



// Brukes av de fleste søkefunksjonene for å skjule alle markørene før de med treff skal vises.
// Fødes ofte med true.
function showMarkers(para) {
  for(i = 0; i < markers.length; i++) {
    markers[i].setVisible(para);
  };
}



// Flaggsjekkfunksjonen.
// Tanken er at når funksjoner har manipulert listen eller markørene, så skal flag settes til 1.
// På denne måten kan man sjekke om noe har blitt manipulert, slik at dette kan resettes før et nytt søk.
// Den er per nå et stykke unna full funksjonalitet.
// De fleste funksjoner bør forholde seg til denne, og den bør også har kotroll over innholdet til mange variabler, om enn indirekte.
// Enten det, eller så bør den erstattes med alternative løsninger eller lokale løsninger-
//
// V1.5 printing av dataset skjer vi egen funksjon.
// Showmarker() brukes for å vise alle markørene.
// Funker nå ganske bra som funksjon.
function flagCheck() {
  if(flag == 1) {
    refresh();
    printSet(dataset);
    showMarkers(true);
    flag = 0;
    return true;
  };

}




// Funksjon som lager et søkeobjekt.
//
//

function makeSearchobj() {
  var gender = /(dame|ladies)/i;
  var price = /(pris:|price:)\d+|(gratis|free)/i;
  var wheelchair = /(rullestol|wheel chair)/i;
  var nursery = /(stellerom|nursery)/i;
  var opennow = /(åpen|open)/i;
  var open = /(åpen:|open:)\d+.\d+|(åpen:|open:)\d+/;
  var searchParam =  document.getElementById("sokinput").value;
  searchObj = {};

  if(!gender.test(searchParam.split(/\s/)[0])&!price.test(searchParam.split(/\s/)[0])&!wheelchair.test(searchParam.split(/\s/)[0])&!nursery.test(searchParam.split(/\s/)[0])&!open.test(searchParam.split(/\s/)[0])&!opennow.test(searchParam.split(/\s/)[0])) searchObj["navn"] = searchParam.split(/\s/)[0];


  if(gender.test(searchParam)) {
    searchObj["gender"] = "1";
  }
  if(price.test(searchParam)) {
    searchObj["price"] = searchParam.match(price)[0].split(/:/)[1];
    if(searchObj.price == null) searchObj["price"] = "0"; // Dette er for å fange opp bruk av gratis som søkeord, slik at et søk kjører maksPris(0) hvis gratis eller free er til stede.
  }
  if(wheelchair.test(searchParam)) {
    searchObj["wheelchair"] = "1";
  }
  if(nursery.test(searchParam)) {
    searchObj["nursery"] = "1";
  }
  if(open.test(searchParam)) {
    searchObj["open"] = searchParam.match(open)[0].split(/:/)[1];
  }
  if(opennow.test(searchParam)) {
    if(!open.test(searchParam)) searchObj["opennow"] = "1";
  }
  return searchObj;
}




function nysokeFunk() {
  makeSearchobj();
  if(searchObj.price != null) maksPris(searchObj.price);
  if(searchObj.gender == "1") harDame();
  if(searchObj.nursery == "1") harStell();
  if(searchObj.opennow == "1") openNow();
  if(searchObj.wheelchair == "1") hasWheelchair();

  //etc
}


//IndexOf + Include (js-funksjoner til å matche treff)
//
// Siste utgave av sokeFunk().
// Ser nå at grunnen til at sokeRes er global, er for at man kan sjekke om den er tom før man fyller den med treff.
// Kanskje dette kan unngås via flagCheck()?
//
// sokeRes[] og tempMarkers[] fylles med hhv JSON-objektene og de tilhørende markørene som søket resulterer i.
// Skjuler alle markørene før kun de med treff vises igjen.
//
// Lista tømmes før den fylles med treffene via printRes. Her ses kode som kanksje kan erstatte eller tas opp i flagCheck().
function sokeFunk() {
  if(document.getElementById("sokinput").value == "") return;
  if(sokeRes.length != 0) sokeRes = [];
  var sokeParam = document.getElementById("sokinput").value.toUpperCase();
  var tempMarkers = [];
  for(i = 0; i < dataset.entries.length; i++) {
    if(dataset.entries[i].navn.toUpperCase().includes(sokeParam)) {
      sokeRes.push(dataset.entries[i]);
      tempMarkers.push(markers[i])
      };
    }

  if(sokeRes == 0) return;

  showMarkers(false);
  for(i = 0; i < tempMarkers.length; i++) {
    tempMarkers[i].setVisible(true);
  };

  refresh();
  printRes(sokeRes);
}




// Uferdig funksjon for å sjekke hvilke toaletter som er åpne nå.
var now;
var tid;
function openNow() {
  var time = new Date();
  now = time.getHours() + "." + time.getMinutes();
  if(flagCheck() == true) return;

  sokeRes = [];
  var x = [];

  for(i = 0; i < dataset.entries.length; i++) {
    tid = [];
    tid = dataset.entries[i].tid_hverdag.split(/[\s,]+/);
    if(dataset.entries[i].tid_hverdag == "ALL") {
      x.push(i);
      sokeRes.push(dataset.entries[i]);
    }
    else if(parseFloat(now) >= tid[0] && parseFloat(now) <= tid[2]) {
      x.push(i);
      sokeRes.push(dataset.entries[i]);
      }
    };

    showMarkers(false);
    for(i = 0; i < x.length; i++) {
      markers[x[i]].setVisible(true);
    };
    refresh();
    printRes(sokeRes);
    flag = 1;
}

//Funksjon for å vise representere hvilke objekter som er åpne på søndag.
// Her brukes flagCheck() for å resette både lista og markørene og returnere hvis man allerede har "checket" checkboxen.
// Ellers ganske intuitiv kode, dog noe gammel.
function openSunday() {
  if(flagCheck() == true) return;

  sokeRes = [];
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


// Funksjon for å representere hvilke objekter som har dametoalett.
// Nesten identisk som den over.
function harDame() {
  if(flagCheck() == true) return;

  sokeRes = [];
  var x = [];
  for(i = 0; i < dataset.entries.length; i++) {
    if(dataset.entries[i].dame != "NULL") {
      x.push(i);
      sokeRes.push(dataset.entries[i]);
      };
    };
    //if(sokeObj.length > 1) return sokeRes;

    showMarkers(false);
    for(i = 0; i < x.length; i++) {
      markers[x[i]].setVisible(true);
    };

  refresh();
  printRes(sokeRes);
  flag = 1;
}


// Samme som de over, bare det handler om stellerom.
function harStell() {
  if(flagCheck() == true) return;

  sokeRes = [];
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


// Funksjon for å representerere de objektene som har pris under parameteren "pris".
// Om man vil vise toaletter som er gratis føder man inn 0.
function maksPris(pris) {
//  if(flagCheck() == true) return;

  sokeRes = [];
  var x = [];
  for(i = 0; i < dataset.entries.length; i++) {
    if(parseFloat(dataset.entries[i].pris) <= parseFloat(pris) | dataset.entries[i].pris == "NULL") {
      x.push(i);
      sokeRes.push(dataset.entries[i]);
      };
    };
    //if(sokeObj.length > 1) return sokeRes;

    showMarkers(false);
    for(i = 0; i < x.length; i++) {
      markers[x[i]].setVisible(true);
    };

  refresh();
  printRes(sokeRes);
  flag = 1;
}

function hasWheelchair() {
  //  if(flagCheck() == true) return;

    sokeRes = [];
    var x = [];
    for(i = 0; i < dataset.entries.length; i++) {
      if(dataset.entries[i].rullestol == "1") {
        x.push(i);
        sokeRes.push(dataset.entries[i]);
        };
      };
      //if(sokeObj.length > 1) return sokeRes;

      showMarkers(false);
      for(i = 0; i < x.length; i++) {
        markers[x[i]].setVisible(true);
      };

    refresh();
    printRes(sokeRes);
    flag = 1;
}



// Funksjon som regner ut avstanden fra talett nr 1. til nr 14.
<<<<<<< HEAD
//window.alert(getDistanceFromLatLonInKm(60.3879681,5.334608,60.3973581,5.3132629).toFixed(1));
=======

>>>>>>> a8a390eb48387339d16fdd4af4d6f909c85097a9
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
var R = 6371; // Radius av jorden i km
var dLat = deg2rad(lat2-lat1);
var dLon = deg2rad(lon2-lon1);
var a =
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c; // distanse i km
return d;
}
function deg2rad(deg) {
return deg * (Math.PI/180); // svaret på utregningen.
}

// Funksjon som gjør lekeplass datasettet om til et DOM element.

var content = document.createElement("div");
content.setAttribute("class", "content");
document.body.appendChild(content);
document.createTextNode(content)
var textnode = document.createTextNode(content)


// eksempel:

var div_element = document.getElementById("main");

var h2_element = document.createElement("h2");
var h2_text = document.createTextNode(leke[i].navn);
h2_element.appendChild(h2_text);
div_element.appendChild(h2_element);

var p_element = document.createElement("p");
var p_text = document.createTextNode(leke[i].latitude);
p_element.appendChild(p_text);
div_element.appendChild(p_element);

var p_element = document.createElement("p");
var p_text = document.createTextNode(leke[i].longitude);
p_element.appendChild(p_text);
div_element.appendChild(p_element);

// markersfiks

var markers = [];

function addMarkers() {
  for(let marker in markers)
    markers.setMap(null);
}
