<template>
  <div>
    <h1 class="text-center text-4xl">Look At The Sky</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=PuMz4v5PYKc" target="_blank" @click="aud.pause()">Full song</a></h2>
    <div class="mt-10">
      <div class="float-left mr-10 mb-5">
        <video class="border-2 border-black mb-2 rounded-xl" width="480" height="360" autoplay muted loop>
          <source src="../../../assets/vid/lats.mp4" type="video/mp4" />
          Cannot play video :(
        </video>
        <audio class="mx-auto" ref="aud" controls>
          <source src="../../../assets/sound/lats.mp3" type="audio/mpeg" />
          Cannot play audio :(
        </audio>
      </div>
      <div class="text-justify font-bold text-2xl">
        <p>
          Look at the Sky is the first song with vocals on the album. It's an anthemic introduction to the album. The self-assuring lyrics of Porter telling himself to not give up creates an
          overarching theme for the rest of the album. This is the second longest song on the album and took the
          <a class="link" href="https://twitter.com/porterrobinson/status/1394351146207092737" target="_blank">second longest time to produce</a>. The song was started in 2015, and acted as a mantra
          for Porter throughout the years of his struggle. Working to complete the song gave him motivation and inspiration to keep going, while also having a lyrical composition that reflected his
          true mental state. The song also serves as a tone indicator for the rest of the album. Instead of the heavy electronic composition his work is usually composed of, there's a lot of acoustic
          interludes and raw vocals from Porter himself.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../../../stores/globalStore";

const aud = ref(null);

onMounted(() => {
  aud.value.loop = useGlobalStore().loopSongs;
  if (useGlobalStore().autoplaySongs) {
    aud.value.play();
  }
});
</script>
