<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="emit('close')">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
            <div class="sm:flex sm:items-start">
              <div :class="['mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10', props.iconBgColor != '' ? props.iconBgColor : 'bg-sky-100']">
                <slot name="icon" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle as="h3" class="mb-5 mt-2 text-lg font-medium leading-6 text-gray-900">{{ props.title }}</DialogTitle>
                <div class="mt-2">
                  <p class="mb-5 text-sm text-gray-500">
                    <slot name="content" />
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
              <round-button
                v-for="action in props.actions"
                :key="action.label"
                :type="action.type"
                :processing="actionsProcessing[action.label]"
                :disabled="actionsDisabled[action.label]"
                @click="() => triggerAction(action)"
                >{{ action.label }}</round-button
              >
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import RoundButton from "../RoundButton.vue";

const props = defineProps({
  open: Boolean,
  title: String,
  iconBgColor: String,
  actions: Array,
  reset: Function,
});
const propsRef = toRefs(props);
const emit = defineEmits(["action", "close"]);

watch(propsRef.open, (isOpen) => {
  if (isOpen && props.reset) props.reset();
});

props.actions.push({
  label: "Close",
  action: () => {
    emit("close");
  },
});

const actionsProcessing = {};
const actionsDisabled = {};
for (let action of propsRef.actions.value) {
  let disabledRef = ref(false);
  actionsProcessing[action.label] = ref(false);
  actionsDisabled[action.label] = disabledRef;

  // I have no clue why you have to create a proxy ref for actionRef.disabledRef to reflect in this component - juni //
  const actionRef = toRefs(action);
  if (actionRef.disabledRef != undefined) {
    watch(actionRef.disabledRef, (val) => {
      disabledRef.value = val;
    });

    disabledRef.value = actionRef.disabledRef.value;
  }
}

const setActionProcessing = (label, isProcessing) => {
  actionsProcessing[label].value = isProcessing;
};

const triggerAction = async (action) => {
  if (action && !actionsDisabled[action.label].value) {
    setActionProcessing(action.label, true);
    await action.action();
    setActionProcessing(action.label, false);
  }
};

const submit = () => {
  triggerAction(props.actions[0]);
};

defineExpose({
  submit,
});

if (props.reset) props.reset();
</script>
