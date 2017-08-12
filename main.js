const searchBar = document.querySelector(".textInput");
const button = document.querySelector(".searchBtn");
const playBtn = document.querySelector(".playBtn");
const resultsCont = document.querySelector(".results");
const player = document.querySelector('.music-player');
const progressBar = document.querySelector(".progressBar");
const volumeSlider = document.querySelector(".volume");
let audioState = false;


searchBar.addEventListener('keydown', function(event){
  if (event.which == 13 || event.keyCode == 13) {
    searchMusic();
    return false;
  }
  return true;
});

button.addEventListener('click', searchMusic);



// =========== Music Player Functions ================


function createSong(url){ /*creates the audio object*/
  if(audioState === true)
  {
    audio.pause(); /*pauses old audio obj, if there is one*/
  }
  return audio = new Audio(url);
}


function toggleSong(song){  /*makes play button play/pause*/
  if(audioState === true){
    song.pause();
    playBtn.setAttribute("src", "img/pause.png");
    audioState = false;
  }
  else {
    song.play();
    playBtn.setAttribute("src", "img/playsolid.png");
    audioState = true;
  }
}

function playSong(song){ /* plays song and tethers progress bar to time*/
  updateVolume();
  song.play();
  song.addEventListener("timeupdate", function(e){
    progressBar.value = Math.floor(song.currentTime);
  })
  playBtn.setAttribute("src", "img/playsolid.png");
  audioState = true;
}

function updateVolume(){
  let volumeVal = volumeSlider.value / 100;
  audio.volume = volumeVal;
  console.log(volumeVal);
}

// =============== Search Function =====================



function clearResults(){
  resultsCont.innerHTML = "";
}

function searchMusic(){
  let input = encodeURI(searchBar.value);
  let url = "https://itunes.apple.com/search?term=" + input + "&country=US&media=music";


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
            <img class="hoverPlay" src="img/playsolid.png" alt="">
            <img class="albumArt" src="${item[i].artworkUrl100}" alt="Album Cover" onclick='playSong(createSong("${item[i].previewUrl}"))'>
            <a class="songTitle" href="${item[i].trackViewUrl}"><p>${item[i].trackName}</p></a>
            <a class="artistName" href="${item[i].artistViewUrl}"><p>${item[i].artistName}</p></a>
          </div>`;

        resultsCont.innerHTML += tmpl;
      }
    })
    searchBar.value = "";
}
