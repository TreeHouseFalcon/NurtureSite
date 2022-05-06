<template>
  <div>
    <h1 class="text-center text-4xl">Mirror</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=PkiIPzG37vQ" target="_blank" @click="aud.pause()">Full song</a></h2>
    <div class="mt-10">
      <div class="float-left mr-10 mb-5">
        <video class="border-2 border-black mb-2 rounded-xl" width="480" height="360" ref="vid" autoplay muted loop>
          <source src="../../../assets/vid/mirror.mp4" type="video/mp4" />
          Cannot play video :(
        </video>
        <audio class="mx-auto" ref="aud" controls>
          <source src="../../../assets/sound/mirror.mp3" type="audio/mpeg" />
          Cannot play audio :(
        </audio>
      </div>
      <div class="text-justify font-bold text-2xl">
        <p>
          Mirror is another one of the most crucial tracks on the album for understanding where Porter's mindset was. Most of the song is very literal and explains exactly what issues he was dealing
          with pertaining to his self-esteem.
        </p>
        <p>
          The most noticable attribute shown here is the struggle between Porter's inner-self, his persona, and his shadow. The song is a back-and-forth between him and his doubtful inner voice
          conflicting with himself. His shadow tells him that he's not good enough, that his music isn't good enough, and that he should feel sorry for it. Reconciling with his shadow, he's able to
          show his strength in the chorus, declaring that he's only saying these things to himself and that he's better than his shadow says he is. The song ends with a short monologue that says "keep
          going" many times. This repetitiveness describes the effort required by him to overcome the shadow in his consciousness.
        </p>
        <p>
          While it's easy to assume that having a higher self-esteem would be a critical primary factor in increasing productivity,
          <a class="link" href="https://journals.sagepub.com/doi/10.1111/1529-1006.01431" target="_blank">a study from Roy F. Baumeister published to Sage Journals</a> actually concludes that the only
          correlation between self-esteem and productivity is that increased results from productivity boosts self-esteem, and not the other way around. So what (or who) could've aided him in being
          more productive despite his inner-self?
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
const vidRestartAtAudSecs = 32.5;

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
    console.log("seek");
    updateVid();
  };

  aud.value.addEventListener("playing", () => {
    console.log("playing");
    updateVid();
  });

  document.addEventListener("visibilitychange", (e) => {
    if (document.visibilityState == "visible") {
      updateVid();
    }
  });
});
</script>
