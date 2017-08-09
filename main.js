let searchBar = document.querySelector(".textInput")
let button = document.querySelector(".searchBtn")

searchBar.addEventListener('keydown', function(event){
  if (event.which == 13 || event.keyCode == 13) {
    searchMusic();
    return false;
  }
  return true;
});

button.addEventListener('click', searchMusic);


//The goods are below
//
//${artistName} ${artworkUrl100} ${trackName} ${previewUrl} ${trackViewUrl}
// ${artistViewUrl}
//ISO 3166-2:US


function searchMusic(){
  let input = encodeURI(searchBar.value);
  let url = "https://itunes.apple.com/search?term=" + input + "&country=US";


  fetch(url)
    .then( function (data) {
      return data.json();
    })
    .then( function (data) {
      console.log(data);
    })
}
