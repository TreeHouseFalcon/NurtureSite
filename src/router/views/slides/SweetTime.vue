<template>
  <div>
    <h1 class="text-center text-4xl">Sweet Time</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=vlpvJLlAu3A" target="_blank" @click="aud.pause()">Full song</a></h2>
    <div class="mt-10">
      <div class="float-left mr-10 mb-5">
        <img class="border-2 border-black mb-2 rounded-xl" src="../../../assets/vid/sweet_time.png" alt="Sweet Time image" />
        <audio class="mx-auto" ref="aud" controls>
          <source src="../../../assets/sound/sweet_time.mp3" type="audio/mpeg" />
          Cannot play audio :(
        </audio>
      </div>
      <div class="text-justify font-bold text-2xl">
        <p>
          Sweet Time is a slow-paced ballad about Porter's girlfriend, Rika. Two songs on the album are dedicated to her and she was the biggest personal inspiration to Porter at the time he was
          writing the album.
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
