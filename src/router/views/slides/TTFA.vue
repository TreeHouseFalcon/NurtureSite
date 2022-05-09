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
          Trying To Feel Alive is the culmination of all of Porter's thoughts and reflections through his decade-long journey. It was the last song produced for the album and originally it wasn't
          going to exist. However, in the last few months of production he decided he wanted to end Nurture off differently than Unfold did.
          <a class="link" href="https://twitter.com/porterrobinson/status/1385668867108884487?s=20&t=npnb0lVZ8ZbYJemL8Wrb2w" target="_blank">In a retrospective look</a> at whether or not he actually
          felt better after all he'd been through, he decides that the best reflection is that he's not done improving. All he can do is continue living his life and improving himself knowing that his
          music has a positive impact on millions of people globally.
        </p>
        <br />
        <p>
          Nurture is an album about finding the good in things even when it's hard to do so. You might be lonely, fighting internal battles, or overworking yourself, but there's always light if you
          look hard enough. I've been following Porter Robinson for 4 years, and seeing where he came from to where he is now inspires me to double check my lifestyle from time to time. It's difficult
          to get a definitive psychological profile of someone from their music alone, but using real research to back ourselves up can get us pretty close.
        </p>
        <br />
        <p>
          The album cover for Nurture depicts Porter laying in a field of grass and flowers face down, bonding with the beauty of life and showing the connection between "nature" and "nurture".
          Ironically, <a class="link" href="https://ew.com/music/porter-robinson-nurture-album-cover-art/" target="_blank">he's allergic to grass</a>! To get the most out of life, you just have to
          enjoy the good and embrace the bad. I hope this was an entertaining presentation, more work was put into it than expected. I urge you to check out Nurture if you're interested! There's a
          link to the album on the first page.
        </p>
        <div class="mt-5 flex flex-row justify-center">
          <figure class="text-center text-sm w-1/4">
            <img class="border-2 border-white rounded-lg" src="../../../assets/nurture.png" />
          </figure>
        </div>
        <br />
        <p class="text-sm">
          p.s. to Dr. Sims - I saw you included a picture of you at the Red Rocks Ampitheater on your class intro presentation. I recently went to see Porter perform there and it was the perfect venue
          to choose for this album!
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
