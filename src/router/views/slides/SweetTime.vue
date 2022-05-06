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
          writing Nurture. Sweet Time is one of them. I included Sweet Time over the other song because it reveals a bit more about Porter's psychological profile.
        </p>
        <p>
          What makes Sweet Time significant is that it seems to be the only song on the album where Porter says exactly and literally how bad his depressive period got: "since I met you, I don't wanna
          die no more." The song being slower than the others on the album also shows that Porter realizes the importance of taking a minute to enjoy his life in the moment. This is reinforced in the
          second verse when he admits that although life can be bad sometimes, it's not good to dwell on that.
          <a class="link" href="https://news.harvard.edu/gazette/story/2016/12/optistic-women-live-longer-are-healthier/" target="_blank">A study conducted by Harvard University</a> showed that
          focusing on the positive aspects of life can lengthen life expectancies and reduce risk of various diseases.
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
