
let currentSong = new Audio()
let songs;
let currentFolder
const play = document.getElementById("play1")

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currentFolder = folder
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text()
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as);
    songs = []
    for (let i = 0; i < as.length; i++) {
        const e = as[i];
        if (e.href.endsWith(".mp3")) {
            songs.push(e.href.split(`/${folder}/`)[1])
        }
    }


    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML += `<li>
        <img src="img/music.svg" alt="" class="invert">

        <div class="info">
            <div>${song.split(".")[0].replaceAll("%20", " ")}</div>
            <div>Ronil</div>
        </div>

        <div class="playNow">
            <span>Play Now</span>
            <img src="img/play.svg" alt="" class="invert">
        </div>
    </li>`;
    }
    // var audio = new Audio(songs[0]);
    // audio.play();
    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentTime, audio.currentSrc);
    // });

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            // playMusic(songs[0].replaceAll("%20", " ").replaceAll(".mp3", ""))
        })
    })
    return songs
}

// const playMusic = (track,pause=false) => {
const playMusic = (track) => {
    // var audio = new Audio("songs/" + track + ".mp3")
    currentSong.src = `${currentFolder}/` + track + ".mp3"
    // if(!pause){
    //     currentSong.play()
    // }
    currentSong.play()
    play.src = "img/pause.svg"
    document.querySelector(".songInfo").innerHTML = track
    document.querySelector(".songTime").innerHTML = "00:00/05:00"
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let allAs = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(allAs)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];


        if (e.href.includes("/songs/")) {
            let folder = (e.href.split("/").slice(-1)[0]);
            // Get meta data of the folder
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
            let response = await a.json()
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + ` <div class="card" data-folder="${folder}">
            <div class="play greenBackground" style="width: 30px; height: 30px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"
                    fill="none" id="play">
                    <path fill="#000"
                        d="M7 17.259V6.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 7 17.259Z">
                    </path>
                </svg>
            </div>
            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`
        }
    }

    console.log(div);
    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            // console.log(item.currentTarget.dataset.folder);
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0].replaceAll("%20", " ").replaceAll(".mp3", ""))
        })
    })
}

async function main() {

    songs = await getSongs("songs/Bollywood")
    // playMusic(songs[0],true)

    //Display all the albums on the page
    displayAlbums()

    function togglePlayPause() {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    }

    play.addEventListener("click", togglePlayPause)
    document.addEventListener("keydown", function (e) {
        if (e.key === " ") {
            e.preventDefault();
            togglePlayPause();
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekBar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0 ";
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-90%";
    })

    prev.addEventListener("click", () => {
        console.log("Previous is called");
        console.log(songs);
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1].replaceAll("%20", " ").replaceAll(".mp3", ""))
        }
    })

    next.addEventListener("click", () => {
        // currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1].replaceAll("%20", " ").replaceAll(".mp3", ""))
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e,e.target,e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100
        if(currentSong.volume>0){
            document.querySelector(".volume img").src = document.querySelector(".volume img").src.replace("img/mute.svg","img/volume.svg")
        }
    })

    //Add event listeners to mute the track
    document.querySelector(".volume img").addEventListener("click",(e) => {
        if(e.target.src.includes("volume.svg")){
            e.target.src =  e.target.src.replace("img/volume.svg","img/mute.svg") 
            currentSong.volume = 0
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else{
            e.target.src = e.target.src.replace("img/mute.svg","img/volume.svg")
            currentSong.volume = 1
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10
        }
    })
}
main()