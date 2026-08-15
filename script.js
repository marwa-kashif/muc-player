const songs = [
    {
        title: "Dreams",
        artist: "Music Artist",
        src: "song1.mp3"
    },
    {
        title: "Summer Vibes",
        artist: "Music Artist",
        src: "song2.mp3"
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const songNumber = document.getElementById("song-number");

let songIndex = 0;

function loadSong(index) {
    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;

    songNumber.textContent = `Song ${index + 1} of ${songs.length}`;

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}

function playSong() {
    audio.play();

    playBtn.textContent = "⏸";
}

function pauseSong() {
    audio.pause();

    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener("click", () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
    audio.volume = 1;
});

previousBtn.addEventListener("click", () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
});
volume.addEventListener("input", function () {
    audio.volume = volume.value;
});

audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
    nextBtn.click();
});

function formatTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

loadSong(songIndex);
