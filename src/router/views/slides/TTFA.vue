<template>
  <div>
    <h1 class="text-center text-4xl">Trying To Feel Alive</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=qytgJ2mbzfM" target="_blank" @click="aud.pause()">Full song</a></h2>
    <div class="mt-10">
      <div class="float-left mr-10 mb-5">
        <video class="border-2 border-black mb-2 rounded-xl" width="480" height="360" autoplay muted loop>
          <source src="../../../assets/vid/ttfa.mp4" type="video/mp4" />
          Cannot play video :(
        </video>
        <audio class="mx-auto" ref="aud" controls>
          <source src="../../../assets/sound/ttfa.mp3" type="audio/mpeg" />
          Cannot play audio :(
        </audio>
      </div>
      <div class="text-justify font-bold text-2xl">
        <p>
          Testing text hereTesting text hereTesting text hereTesting text hereTesting text hereTesting text hereTesting text hereTesting text hereTesting text hereTesting text hereTesting text
          hereTesting text hereTesting text hereTesting text hereTesting text hereTesting text here
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
