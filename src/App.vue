<template>
  <div :class="['min-h-screen flex flex-col transition-all bg-black text-white bg-gradient-to-b select-none', `slide-${slide}`]">
    <transition name="fade" appear>
      <div class="flex flex-row items-center justify-between">
        <p class="px-5 py-2 mb-5 text-center mx-auto">A Psychoanalysis on Modern Electronic Music</p>
      </div>
    </transition>
    <router-view v-slot="{ Component }" class="flex-grow font-serif text-xl">
      <transition name="fade" appear>
        <component :is="Component" />
      </transition>
    </router-view>

    <transition name="fade" appear>
      <div class="flex flex-row px-5 py-2 mt-8">
        <div class="flex flex-row items-center flex-grow pl-2 justify-start">Made by Juniper Hovey for PSYC 1630 w/ Dr. Sims</div>
        <div class="flex flex-row items-center flex-grow pr-2 justify-end">
          <p>Sounds, videos, and graphics by <a class="underline" href="https://porterrobinson.com/" target="_blank">Porter Robinson</a></p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useGlobalStore } from "./stores/globalStore";
import { onMounted, watch, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const slide = computed(() => {
  return useGlobalStore().slide;
});

const route = useRoute();
const router = useRouter();
</script>
