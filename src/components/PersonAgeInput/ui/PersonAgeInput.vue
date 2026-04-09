<script setup lang="ts">
import { ref } from "vue";
import { NumericInput } from "@/shared/NumericInput";

const props = defineProps<{
  personId: number;
  personName: string;
}>();

const hours = defineModel<number>({ required: true });

const focused = ref(false);
</script>

<template>
  <div class="flex items-center gap-4">
    <img
      :src="`https://i.pravatar.cc/150?img=${props.personId}`"
      :alt="personName"
      class="w-20 h-20 rounded-full object-cover ring-1 ring-offset-2 transition-colors duration-200"
      :class="focused ? 'ring-primary' : 'ring-transparent'"
    />
    <div>
      <label
        for="hours-input"
        class="block text-base font-koulen tracking-wide transition-colors duration-200 mb-3"
        :class="focused ? 'text-primary' : 'text-dark'"
      >
        {{ personName.toUpperCase() }} IS
      </label>
      <div class="inline-flex items-center gap-3">
        <NumericInput
          id="hours-input"
          v-model="hours"
          @focus="focused = true"
          @blur="focused = false"
        />
        <span class="text-lg font-inter">hours old</span>
      </div>
    </div>
  </div>
</template>
