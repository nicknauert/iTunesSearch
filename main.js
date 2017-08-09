let searchBar = document.querySelector(".textInput");
let button = document.querySelector(".searchBtn");
let resultsCont = document.querySelector(".results");

searchBar.addEventListener('keydown', function(event){
  if (event.which == 13 || event.keyCode == 13) {
    searchMusic();
    return false;
  }
  return true;
});

button.addEventListener('click', searchMusic);


function clearResults(){
  resultsCont.innerHTML = "";
}


//The goods are below
//
//${artistName} ${artworkUrl100} ${trackName} ${previewUrl} ${trackViewUrl}
// ${artistViewUrl}
// US


function searchMusic(){
  let input = encodeURI(searchBar.value);
  let url = "https://itunes.apple.com/search?term=" + input + "&country=US";

  clearResults();

  fetch(url)
    .then( function (data) {
      return data.json();
    })
    .then( function (data) {

      for(i=0;i<20;i++){
        let item = data.results;
        let tmpl =
          `<div class="resultItem">
            <img src="${item[i].artworkUrl100}" alt="Album Cover">
            <a class="songTitle" href="${item[i].trackViewUrl}"><p>${item[i].trackName}</p></a>
            <a class="artistName" href="${item[i].artistViewUrl}"><p>${item[i].artistName}</p></a>
          </div>`;

          resultsCont.innerHTML += tmpl;
      }
    })
}
