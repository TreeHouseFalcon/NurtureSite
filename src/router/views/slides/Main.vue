<template>
  <div>
    <h1 class="text-center text-4xl">Nurture by Porter Robinson</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=ijmUdI_c-fk&list=PLAZNU5fM7FIC4ruXQhKjpuvP0AByhc0bl&index=1" target="_blank" @click="aud.pause()">Full album</a></h2>
    <div class="mt-10">
      <video class="mx-auto border-2 border-white m-4 rounded-xl" width="480" height="360" ref="vid" autoplay muted loop>
        <source src="../../../assets/vid/main.mp4" type="video/mp4" />
        Cannot play video :(
      </video>
      <p class="text-center">When you see one of these:</p>
      <audio class="mx-auto" ref="aud" controls>
        <source src="../../../assets/sound/main.mp3" type="audio/mpeg" />
        Cannot play audio :(
      </audio>
      <p class="text-center">click play to listen to the audio!</p>
      <div class="text-justify font-bold text-2xl">
        <div class="flex flex-row justify-center gap-3 my-3">
          <button class="btn" @click="useGlobalStore().autoplaySongs = !useGlobalStore().autoplaySongs">
            Click to {{ useGlobalStore().autoplaySongs ? "play songs manually" : "play songs automatically" }}
          </button>
          <button class="btn" @click="useGlobalStore().loopSongs = !useGlobalStore().loopSongs">Click to {{ useGlobalStore().loopSongs ? "disable song looping" : "enable song looping" }}</button>
        </div>
        <hr class="my-5" />
        <p>
          After a seven-year hiatus, Porter Robinson released his second studio album "Nurture" in April of 2021. His return was anticipated by millions of people, the most significant of which was
          himself. After releasing his first studio album "Worlds", he found himself in a creative drought and an overall dark place in his life. He'd been pushing the creative boundaries of the
          electronic music scene since 2010, when he was just 18 years old. The sounds he brought to the table influenced artists all around the world, including some of the most popular electronic
          artists. The weight he carried was enough to stump his future releases for many years.
        </p>
        <p>
          However, he triumphantly emerged in early 2020 with new singles describing the various aspects of his 3-year struggle. Almost every song on this album can be linked to one central idea: <u>Porter's conflict between his inner-self, his shadow, and his outward-facing persona.</u> From the inner voices dragging his self-esteem down to the difficulty 
          pushing himself at his career peak, Nurture is an hour-long psychological profile of Porter Robinson.
          <div class="flex flex-row justify-center items-center gap-5 w-full my-5">
            <figure class="text-center text-sm w-1/4">
              <img src="../../../assets/nurture.png" />
              <figcaption>The album cover for Nurture</figcaption>
            </figure>
            <figure class="text-center text-sm w-1/2">
              <img src="../../../assets/header.jpg" />
              <figcaption>This is the style that Nurture's design takes on</figcaption>
              </figure>
          </div>
        </p>
        <p>
          Some songs have been left out as they didn't serve much psychological purpose that hasn't been covered by other songs.
        </p>
        <hr class="my-5" />
        <p>
          Press the left or right arrow key to move between pages, or click the arrows on the edges of the page.
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
const vidRestartAtAudSecs = 10;


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
  }

  aud.value.onseeking = () => {
    console.log("seek");
    updateVid();
  }

  aud.value.addEventListener("playing", () => {
    console.log("playing");
    updateVid();
  });

  document.addEventListener("visibilitychange", (e) => {
    if (document.visibilityState == "visible") {
      updateVid();
    }
  })
})

</script>