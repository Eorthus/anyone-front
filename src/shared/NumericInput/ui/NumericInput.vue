<script setup lang="ts">
import { useHoursInput } from "../model";
import type { Emit, Props } from "../types";

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: Number.MAX_SAFE_INTEGER,
  disabled: false,
  placeholder: "0",
});

const emit = defineEmits<Emit>();

const { inputRef, displayValue, inputWidthPx, parseRaw, onInput, onKeydown, onPaste, commit } =
  useHoursInput(props, emit);
</script>

<template>
  <input
    :id="props.id"
    ref="inputRef"
    v-model="displayValue"
    type="text"
    inputmode="numeric"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    :disabled="disabled"
    :placeholder="placeholder"
    :aria-label="id ? undefined : 'Hours input'"
    :style="{ width: inputWidthPx + 'px' }"
    class="min-w-[72px] rounded-md ring-1 ring-light-grey bg-white px-2 py-1 text-lg font-medium text-dark outline-none transition-shadow duration-150 ease-out focus:ring-2 focus:ring-primary-light disabled:cursor-not-allowed disabled:opacity-50"
    @input="onInput"
    @keydown="onKeydown"
    @paste="onPaste"
    @focus="emit('focus')"
    @blur="emit('blur', commit(displayValue))"
    @change="emit('change', parseRaw(displayValue))"
  />
</template>
