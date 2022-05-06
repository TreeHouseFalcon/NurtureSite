<template>
  <modal title="Add invite" ref="modalRoot" :actions="modalActions" iconBgColor="bg-sky-100" :open="modalOpen" :reset="reset" @close="emit('close')">
    <template #icon>
      <mail-open-icon class="h-6 w-6 text-sky-600" aria-hidden="true" />
    </template>
    <template #content>
      <form class="space-y-5" @submit.prevent="modalRoot.submit">
        <div class="w-full">
          <label for="inviteType">Invite type</label>
          <select
            name="inviteType"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            v-model="selectedInviteType"
            required
          >
            <option>Email domain</option>
            <option>User</option>
          </select>
        </div>
        <div>
          <label for="id">{{ selectedInviteType == "User" ? "Email address" : "Email domain" }}</label>
          <input
            v-model="idEntered"
            name="id"
            type="text"
            :placeholder="selectedInviteType == 'User' ? 'example@domain.com' : 'domain.com'"
            class="appearance-none block px-3 py-2 w-full lg:w-96 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
      </form>
    </template>
  </modal>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import MailOpenIcon from "@heroicons/vue/outline/MailOpenIcon";
import Modal from "./Modal.vue";

const props = defineProps({
  open: Boolean,
});
const emit = defineEmits(["close", "submitted"]);
const modalRoot = ref(null);
const propRefs = toRefs(props);
const modalOpen = propRefs.open;

const selectedInviteType = ref("Email domain");
const idEntered = ref("");

const disabledRef = ref(true);
const USER_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const DOMAIN_EMAIL_REGEX = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const recomputeIdValidity = () => {
  disabledRef.value = !(selectedInviteType.value == "User" ? USER_EMAIL_REGEX.test(idEntered.value) : DOMAIN_EMAIL_REGEX.test(idEntered.value));
};
watch(idEntered, () => recomputeIdValidity());
watch(selectedInviteType, () => recomputeIdValidity());

const modalActions = [
  {
    label: "Invite",
    type: "primary",
    disabledRef,
    action: async () => {
      emit("submitted", {
        id: idEntered.value,
        type: selectedInviteType.value,
      });
      emit("close");
    },
  },
];

const reset = () => {
  idEntered.value = "";
};
</script>
