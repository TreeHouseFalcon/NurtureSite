<template>
  <div>
    <h1 class="text-center text-4xl">Wind Tempos</h1>
    <h2 class="text-center text-xl"><a class="underline" href="https://www.youtube.com/watch?v=k45XcsIc0Ow" target="_blank" @click="aud.pause()">Full song</a></h2>
    <div class="mt-10">
      <div class="float-left mr-10 mb-5">
        <img class="border-2 border-black mb-2 rounded-xl" src="../../../assets/vid/wind_tempos.png" alt="Wind tempos image" />
        <audio class="mx-auto" ref="aud" controls>
          <source src="../../../assets/sound/wind_tempos.mp3" type="audio/mpeg" />
          Cannot play audio :(
        </audio>
      </div>
      <div class="text-justify font-bold text-2xl">
        <p>
          I'm including the entire song on this page because any trimming I did washed out most of the song's meaning. This is the longest song on the album, and I think that was done with intention.
          Even in his live shows, he's always included a 10-minute long tribute to this song, no matter how much time he has to play. This leads me to believe that Wind Tempos is a vital piece of
          Nurture, and an instrumental recollection of Porter's success in 2014 followed by the mental blocks he faced in the years following.
        </p>
        <p>
          The song starts out with an ethereal melody of piano, wind instruments, and a vocal backing. Halfway through it takes on a darker, more empty tone. You can hear clicking sounds in the
          background and it sounds like someone is in a room working alone. Not only did Porter have a massive creative block for a few years, but
          <a class="link" href="https://www.thefader.com/2021/05/06/porter-robinson-the-fader-interview-podcast-nurture-interview" target="_blank" @click="aud.pause()">he also isolated himself</a>
          from friends and any other external inspiration.
          <a
            class="link"
            href="https://www.health.harvard.edu/mind-and-mood/how-isolation-affects-memory-and-thinking-skills#:~:text=Isolation%20is%20also%20associated%20with,who%20don't%20feel%20lonely."
            target="_blank"
            >A study from Harvard University</a
          >
          showed that self-isolation and loneliness can lead to "elevated risks for...depression, anxiety, perceived stress".
        </p>
        <p>
          This part includes a voice that resembles Porter's inner self and outward-facing persona combined. The voice comes in saying something that sounds like "it's so holy", "it's lonely", and
          "it's so easy" all at the same time. Most people I've talked to about this album hear "it's so holy", but on my first listen I heard "it's so easy". I bring this up because this part shows
          the different feelings Porter must've been struggling with during this period. The struggle and stutters it makes while saying "it's so easy" leads me to believe it's a metaphor showing how
          he tried to convince himself to keep going. Thinking that all he had to do was replicate what made him successful in the first place, he isolated himself, overworked himself, and fell into a
          depression.
        </p>
        <p>
          Near the end of the song you can hear the voice say "ow ow ow", probably a direct reflection of Porter's wellbeing at the time. Afterwards, the stuttering of the vocals, the clicking and
          thumping sounds, and the noise all build up to a breaking point. After this, the song plays the original melody from the start of the song. This returning melody shows that he just had to
          stay true to himself and do what he enjoyed originally instead of reaching for more success.
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
