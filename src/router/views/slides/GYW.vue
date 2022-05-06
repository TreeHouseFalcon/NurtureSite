<template>
  <div>
    <h1 class="text-center text-4xl">Get Your Wish</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=4SZEDBFPpgw" target="_blank" @click="aud.pause()">Full song</a></h2>
    <div class="mt-10">
      <div class="float-left mr-10 mb-5">
        <video class="border-2 border-white mb-2 rounded-xl" width="480" height="360" autoplay muted loop>
          <source src="../../../assets/vid/gyw.mp4" type="video/mp4" />
          Cannot play video :(
        </video>
        <audio class="mx-auto" ref="aud" controls>
          <source src="../../../assets/sound/gyw.mp3" type="audio/mpeg" />
          Cannot play audio :(
        </audio>
      </div>
      <div class="text-justify font-bold text-2xl">
        <p>
          Get Your Wish was the leading single released for Nurture and the first song from Porter in almost four years. The song dives into the struggle he faced coming off of the release of his
          previous works: Worlds and Shelter. This song was started in 2018, which was two years after he started producing Look At The Sky.
        </p>
        <p>Persona</p>
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
