const audio = document.getElementById('audio');

document.querySelector('.btn-play').addEventListener('click', _ => audio.play());
document.querySelector('.btn-pause').addEventListener('click', _ => audio.pause());
document.querySelector('.btn-stop').addEventListener('click', _ => {
  audio.pause();
  audio.load();
});

const volumeRange = document.querySelector('.volume-range');
volumeRange.addEventListener('input', e => audio.volume = e.target.value);

const volumeIcon = document.querySelector('.volume-icon');
volumeIcon.addEventListener('click', _ => {
  audio.muted = !audio.muted;
  volumeIcon.classList.toggle('fa-volume-mute');
  volumeIcon.classList.toggle('fa-volume-up');
  volumeRange.style.opacity = (volumeRange.style.opacity === '1') ? 0 : 1;
});

const timeCurrent = document.querySelector('.time-current');
const timeDuration = document.querySelector('.time-duration');
const timeRange = document.querySelector('.time-range');

function sec2time(timeInSeconds) {
  var
    time = parseFloat(timeInSeconds).toFixed(3),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);
  return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
}

function updateTime(current, duration) {
  timeCurrent.textContent = sec2time(Math.round(current));
  timeDuration.textContent = sec2time(Math.round(duration));
}

audio.addEventListener('canplaythrough', e => {
  updateTime(audio.currentTime, audio.duration);
})

timeRange.addEventListener('input', _ => {
  audio.currentTime =  (audio.duration * (timeRange.value  / 100));
})

setInterval(() => {
  updateTime(audio.currentTime, audio.duration);
  timeRange.value = (audio.currentTime / audio.duration) * 100;
}, 1000);


const songList = document.querySelector('.songs-list');
const currentSongName = document.querySelector('.song-name');

songList.addEventListener('click', e => {
  const song = e.target;
  if (song.matches('.song')) {
    currentSongName.textContent = song.dataset.song;
    audio.src = song.dataset.src;
    document.querySelector('.btn-play').click();
  }
});