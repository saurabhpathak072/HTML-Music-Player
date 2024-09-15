const dataJSON = [
  {
    title: "Death Bed",
    genre: "Hip Hop",
    artist: "Powfu",
    artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    id: "1",
  },
  {
    title: "Bad Liar",
    genre: "Hip Hop",
    artist: "Imagine Dragons",
    artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    id: "2",
  },
  {
    title: "Faded",
    genre: "Hot",
    artist: "Alan Walker",
    artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
    url: "https://samplesongs.netlify.app/Faded.mp3",
    id: "3",
  },
  {
    title: "Hate Me",
    genre: "Divotional",
    artist: "Ellie Goulding",
    artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
    id: "4",
  },
  {
    title: "Solo",
    genre: "Hip Hop",
    artist: "Clean Bandit",
    artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
    url: "https://samplesongs.netlify.app/Solo.mp3",
    id: "5",
  },
  {
    title: "Without Me",
    genre: "Hip Hop",
    artist: "Halsey",
    artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    url: "https://samplesongs.netlify.app/Without%20Me.mp3",
    id: "6",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  console.log(dataJSON);
    const songList = [...dataJSON]
  const bodyElement = document.getElementsByTagName('body');
  const genreElement = document.getElementById("genre");
  const songListElement = document.getElementById("songList");
  const songImageElement = document.getElementById("songImage");
  const songNameElement = document.getElementById("songName");
  const artistElement = document.getElementById("artist");
  const audioContainerElement = document.getElementById("audioContainer");
  const checkDarkmodeElement = document.getElementById("checkDarkmode");
  const controlContainerElement = document.getElementById("controlContainer");

  checkDarkmodeElement.addEventListener('click',function(event){
    console.log(this.checked)
    console.log(bodyElement) // 565657
    if(this.checked){

        bodyElement[0].classList.remove('backgroundColor');
        bodyElement[0].classList.add('darkbackgroundColor');
    }else{
        bodyElement[0].classList.add('backgroundColor');
        bodyElement[0].classList.remove('darkbackgroundColor');
    }


  })


  const allGenreList = songList.map((el) => el.genre);
  const genreList = [...new Set(allGenreList)];

  genreList.forEach((element) => {
    const optionElement = document.createElement("option");
    optionElement.value = element;
    optionElement.textContent = element;
    genreElement.append(optionElement);
  });

  console.log("Test>>");
  console.log(dataJSON);

  function loadSongTile(song, songList, control={}) {
    const {autoplay} = control;
    console.log(song);
    const getcurrentindex = songList.findIndex(songEl=>songEl.id === song.id);
    const prevSong = songList[getcurrentindex-1];
    const nextSong = songList[getcurrentindex+1];
    songImageElement.src = song.artwork;
    songNameElement.textContent = song.title;
    artistElement.textContent = song.artist;

    audioContainerElement.innerHTML = "";
    const audioElement = document.createElement("audio");
    const sourceElement = document.createElement("source");
    audioElement.controls = true;
    audioElement.autoplay = autoplay;
    sourceElement.src = song.url;
    sourceElement.type = "audio/mp3";

    audioElement.append(sourceElement);
    audioElement.classList.add("audioClass");
    audioContainerElement.append(audioElement);

    controlContainerElement.innerHTML = '';


    const prevButtom = document.createElement('button');
    prevButtom.textContent = '<=';
    prevButtom.disabled = !prevSong;
    prevButtom.classList.add('buttonControls');
    controlContainerElement.append(prevButtom)
    const addToPlayListButtom = document.createElement('button');
    addToPlayListButtom.textContent = "Add To Playlist";
    addToPlayListButtom.classList.add('buttonControls');
    controlContainerElement.append(addToPlayListButtom)
    const nextButtom = document.createElement('button');
    nextButtom.textContent = '=>';
    nextButtom.disabled = !nextSong;
    nextButtom.classList.add('buttonControls');
    controlContainerElement.append(nextButtom)

    prevButtom.addEventListener('click',function(){
        loadSongTile(prevSong, songList, {autoplay:true});
    })

    nextButtom.addEventListener('click',function () {
        loadSongTile(nextSong, songList, {autoplay:true});
    })

  }

  function renderSong(songList) {
    songListElement.innerHTML = null;
    const ulElement = document.createElement("ul");
    ulElement.className = "songItem";
    songList.forEach((el) => {
      const liElement = document.createElement("li");
      const divElement = document.createElement("div");
      divElement.textContent = `${el.title} - ${el.artist}`;
      divElement.classList.add("songItemList");
      liElement.addEventListener("click", function () {
        loadSongTile(el, songList);
      });
      liElement.append(divElement);
      ulElement.append(liElement);
    });
    songListElement.append(ulElement);
    loadSongTile(songList[0], songList);
  }

  renderSong(songList);

  genreElement.addEventListener("change", function (event) {
    const selectedGenre = event.target.value;
    console.log('selectedGenre',selectedGenre);
    console.log('this.value',this.value);
   
    if(parseInt(this.value) === 0){
        console.log('inside block')
        console.log('songList',songList)
        renderSong(songList);
    }else{

        const filterSongs = songList.filter((data) => data.genre === selectedGenre);
        renderSong(filterSongs);
    }
  });
});
