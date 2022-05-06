<template>
  <div class="flex flex-row gap-3 overflow-hidden">
    <audio ref="introAud" autoplay loop>
      <source src="../../assets/sound/lifelike.mp3" type="audio/mpeg" />
    </audio>
    <button v-if="leftButtonVisible" class="px-9 text-7xl outline-none" @click="stepPage(-1)">&lt</button>
    <div v-if="!leftButtonVisible" class="px-14"></div>
    <div class="w-full flex flex-col justify-center">
      <div class="mx-auto max-w-screen-lg">
        <transition name="slide-up-fade" appear>
          <div v-if="loadAnimState == 1" class="flex flex-col justify-center h-full">
            <h1 class="text-3xl text-center">
              This presentation may contain visuals that photosensitive people might find problematic. I've tried to keep this in mind, however it's advisable to turn down your brightness if you have
              health concerns.
            </h1>
            <button
              class="btn mx-auto my-5"
              @click="
                () => {
                  loadAnimState++;
                  introAud.play();
                }
              "
            >
              I understand
            </button>
          </div>
          <div v-else-if="loadAnimState == 2" class="flex flex-col justify-center h-full">
            <h1 class="text-3xl text-center mb-3">
              Small clips of the songs included will automatically play once on each page. If you don't want to hear them automatically, click the button below to manually play them. You will be able
              to change this later.
            </h1>
            <div class="flex flex-row justify-center gap-3 my-3">
              <button class="btn" @click="useGlobalStore().autoplaySongs = !useGlobalStore().autoplaySongs">
                Click to {{ useGlobalStore().autoplaySongs ? "play songs manually" : "play songs automatically" }}
              </button>
              <button class="btn" @click="useGlobalStore().loopSongs = !useGlobalStore().loopSongs">Click to {{ useGlobalStore().loopSongs ? "disable song looping" : "enable song looping" }}</button>
            </div>
            <div class="flex flex-row justify-center gap-3">
              <button
                class="btn"
                @click="
                  () => {
                    loadAnimState++;
                    introAud.pause();
                  }
                "
              >
                Continue
              </button>
            </div>
          </div>
          <div v-else-if="loadAnimState >= 3" class="flex flex-col justify-center h-full">
            <transition :name="slideTransitionName" appear>
              <component :is="slides[currentSlide]" />
            </transition>
          </div>
        </transition>
      </div>
    </div>
    <button v-if="rightButtonVisible" class="px-9 text-7xl outline-none" @click="stepPage(1)">&gt</button>
    <div v-if="!rightButtonVisible" class="px-14"></div>
  </div>
</template>

<script async setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "../../stores/globalStore";
import MainButton from "../../components/MainButton.vue";

import Main_Slide from "./slides/Main.vue";
import LATS_Slide from "./slides/LATS.vue";
import GYW_Slide from "./slides/GYW.vue";
import WindTempos_Slide from "./slides/WindTempos.vue";
import Mirror_Slide from "./slides/Mirror.vue";
import SweetTime_Slide from "./slides/SweetTime.vue";
import Unfold_Slide from "./slides/Unfold.vue";
import TTFA_Slide from "./slides/TTFA.vue";

const slides = [Main_Slide, LATS_Slide, GYW_Slide, WindTempos_Slide, Mirror_Slide, SweetTime_Slide, Unfold_Slide, TTFA_Slide];

const introAud = ref(null);
const slideTransitionName = ref("");
const loadAnimState = ref(0);
const currentSlide = ref(0);

const leftButtonVisible = computed(() => {
  return currentSlide.value > 0 && loadAnimState.value >= 3;
});
const rightButtonVisible = computed(() => {
  return currentSlide.value < slides.length - 1 && loadAnimState.value >= 3;
});

const currRoute = ref(useRoute().name);
watch(useRoute(), (route) => {
  selectPage(route.name);
});

const stepPage = (direction) => {
  if (loadAnimState.value < 2) return;
  if (currentSlide.value + direction < 0 || currentSlide.value + direction >= slides.length) return;

  if (direction > 0) {
    slideTransitionName.value = "slide-left-fade";
  } else {
    slideTransitionName.value = "slide-right-fade";
  }

  currentSlide.value += direction;
  useGlobalStore().slide = currentSlide.value;
};

setTimeout(() => {
  loadAnimState.value++;
}, 500);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
      stepPage(1);
    } else if (e.key == "ArrowLeft") {
      stepPage(-1);
    }
  });
});
</script>
