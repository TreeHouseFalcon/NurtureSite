<template>
  <modal title="Delete organization" ref="modalRoot" :actions="modalActions" iconBgColor="bg-red-100" :open="modalOpen" :reset="reset" @close="emit('close')">
    <template #icon>
      <trash-icon class="h-6 w-6 text-red-600" aria-hidden="true" />
    </template>
    <template #content>
      <form @submit.prevent="modalRoot.submit">
        <p class="mb-5">
          Are you sure you want to delete the <b>{{ props.orgData?.OrgName }}</b> organization? This cannot be undone.
        </p>
        <p class="text-md">Enter the organization ID as it appears exactly:</p>
        <code class="bg-gray-100 text-black rounded-md px-1 mb-2 inline-block">{{ props.orgData.OrgId }}</code>
        <input
          v-model="orgIdEntered"
          name="org_name"
          type="text"
          placeholder="Organization ID"
          class="appearance-none block px-3 py-2 w-full lg:w-96 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
      </form>

      <p v-if="apiErr != ''" class="text-red-300">
        Error deleting organization:<br />
        {{ apiErr }}
      </p>
    </template>
  </modal>
</template>

<script setup>
import { ref, toRefs, computed, watch } from "vue";
import { useOrgStore } from "../../stores/orgStore";
import TrashIcon from "@heroicons/vue/outline/TrashIcon";
import Modal from "./Modal.vue";

const props = defineProps({
  open: Boolean,
  orgData: Object,
});
const emit = defineEmits(["close"]);
const modalRoot = ref(null);
const propRefs = toRefs(props);
const modalOpen = propRefs.open;

const orgIdEntered = ref("");
const apiErr = ref("");
const disabledRef = ref(true);
watch(orgIdEntered, (orgId) => {
  // I tried making this a computed but refs/computeds don't work well when passed between multiple component levels (in this case deletemodal -> modal -> roundbutton)
  disabledRef.value = orgId != props.orgData.OrgId;
});

const modalActions = [
  {
    label: "Yes, delete",
    type: "danger",
    disabledRef,
    action: async () => {
      const resp = await useOrgStore().deleteOrg({
        orgId: props.orgData.OrgId,
      });

      if (resp.ok) {
        emit("close");
      } else {
        apiErr.value = resp.err;
      }
    },
  },
];

const reset = () => {
  orgIdEntered.value = "";
  apiErr.value = "";
};
</script>
