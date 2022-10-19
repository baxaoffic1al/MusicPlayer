const btnPlay = document.querySelector('#btn-play');
const btnPlayIcon = document.querySelector('#btn-play-icon');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
const musicName = document.querySelector('#music-name');
const musicAuthor = document.querySelector('#music-author');
const playerCurrentTime = document.querySelector('#player-current-time');
const playerDuration = document.querySelector('#player-duration');
const playerProgress = document.querySelector('#player-progress');
const audioPlayer = document.querySelector('#audio-player');


let currentMuic = 0;

const musics = [
    {
        name: 'Между Нами',
        author: 'Gayo',
        path: './Music/Gayo.mp3'
    },
    {
        name: 'Нейна',
        author: 'Gayo',
        path: './Music/Gayo-Нейна.mp3'
    },
    {
        name: 'Jundullah',
        author: 'Muhammad',
        path: './Music/Jundullah.mp3'
    },
    {
        name: 'Зависай',
        author: 'Stange',
        path: './Music/strange.mp3'
    }
];

btnPlay.addEventListener('click', () => togglePlayMusic());
btnPrev.addEventListener('click', () => changeMusic(false));
btnNext.addEventListener('click', () => changeMusic());
audioPlayer.addEventListener('timeupdate', () => timeUpdate());



// player


const togglePlayMusic = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlayIcon.classList.replace("fa-play","fa-pause");
    }else {
        audioPlayer.pause();
        btnPlayIcon.classList.replace("fa-pause","fa-play");
    }
};


const changeMusic = (next = true) => {
    if (next && currentMuic < musics.length - 1) {
        currentMuic++;
    }else if (!next && currentMuic > 0) {
        currentMuic--;
    }else {
        return;
    }

    updatePlayer();
    togglePlayMusic();
};

const updatePlayer = () => {
    const music = musics[currentMuic];

    musicName.innerHTML = music.name;
    musicAuthor.innerHTML = music.author;
    audioPlayer.src = music.path;
};

const timeUpdate = () => {
    const { currentTime, duration} = audioPlayer;

    if (isNaN(duration)) return; 

    playerDuration.innerHTML = formatSecondsToMinutes(duration);
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
    playerProgress.max = duration;
    playerProgress.value = currentTime;
};

const formatSecondsToMinutes = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14,19);
};

window.onload = () => {
    updatePlayer();
};



