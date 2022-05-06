<template>
  <div>
    <h1 class="text-center text-4xl">Unfold</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=qyr6D-r52DI" target="_blank" @click="aud.pause()">Full song</a></h2>
    <div class="mt-10">
      <div class="float-left mr-10 mb-5">
        <video class="border-2 border-white mb-2 rounded-xl" width="480" height="360" ref="vid" autoplay muted loop>
          <source src="../../../assets/vid/unfold.mp4" type="video/mp4" />
          Cannot play video :(
        </video>
        <audio class="mx-auto" ref="aud" controls>
          <source src="../../../assets/sound/unfold.mp3" type="audio/mpeg" />
          Cannot play audio :(
        </audio>
      </div>
      <div class="text-justify font-bold text-2xl">
        <p>
          This is my favorite song off of Nurture. Unfold was the sixth and final single released from the album, just a day before the release of Nurture itself. It was originally supposed to be the
          last song on the album, so I figured it would be important to include to understand what made Porter change his mind. The entire structure of the song is important to note because it pays
          tribute to his older work while also reflecting on his current state. It's a grandiose anthem with retrospective lyrics to help close out the album.
        </p>
        <p>
          The production of the song takes on a style similar to <a class="link" href="https://www.youtube.com/watch?v=lSooYPG-5Rg" target="_blank">Sea of Voices</a>, the leading single off of Worlds
          released almost a decade prior. Porter originally choosing to close out Nurture with a tribute to the music that he fell in love with in the first place is really what Nurture is all about.
          The chorus also contains a small allegorical metaphor nodding to the "weight of the World" that he assumed he had to carry from his previous work. That small detail is why I love this song
          so much.
        </p>
        <p>
          While it's a good song to end on, it does take on a bit of a darker tone at the end. With the song being more of a forward-looking one, it might end on a contradictory note with a large
          chunk of the rest of the album. Porter wanted to add one more song to tie everything together, and he ended on a high note.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../../../stores/globalStore";

const aud = ref(null);
const vid = ref(null);
const vidRestartAtAudSecs = 2.75;

onMounted(() => {
  aud.value.loop = useGlobalStore().loopSongs;
  if (useGlobalStore().autoplaySongs) {
    aud.value.play();
  }
});
onMounted(() => {
  const updateVid = () => {
    const audPos = aud.value.currentTime;
    const vidLen = vid.value.duration;

    let newPos = audPos - vidRestartAtAudSecs;
    if (newPos < 0) {
      newPos = vidLen - (vidRestartAtAudSecs - audPos);
    }

    console.log(newPos);
    vid.value.currentTime = newPos;
  };

  aud.value.onseeking = () => {
    updateVid();
  };

  aud.value.addEventListener("playing", () => {
    updateVid();
  });

  document.addEventListener("visibilitychange", (e) => {
    if (document.visibilityState == "visible") {
      updateVid();
    }
  });
});
</script>
