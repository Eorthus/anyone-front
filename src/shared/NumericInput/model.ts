import { ref, watch, onMounted, watchEffect } from "vue";
import type { Props, Emit } from "./types";
import { toDigits, format, parseRaw, onKeydown, restoreCaret } from "./lib";

export const useHoursInput = (props: Props, emit: Emit) => {
  const inputRef = ref<HTMLInputElement | null>(null);
  const displayValue = ref(props.modelValue > 0 ? format(props.modelValue) : "");
  const inputWidthPx = ref(72);

  let canvas: HTMLCanvasElement | null = null;

  const updateWidth = () => {
    if (!inputRef.value) return;
    if (!canvas) canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const { fontWeight, fontSize, fontFamily } = window.getComputedStyle(inputRef.value);
    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    const text = displayValue.value || props.placeholder || "";
    inputWidthPx.value = Math.max(72, Math.ceil(ctx.measureText(text).width) + 24);
  };

  const commit = (digits: string) => {
    const num = Math.min(Math.max(parseRaw(digits), props.min ?? 0), props.max ?? 0);
    displayValue.value = !digits ? "" : format(num);
    emit("update:modelValue", num);
    return num;
  };

  const onInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const cursorDigits = toDigits(input.value.slice(0, input.selectionStart ?? 0)).length;
    commit(toDigits(input.value));
    restoreCaret(inputRef, displayValue, cursorDigits);
  };

  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const pasted = toDigits(e.clipboardData?.getData("text/plain") ?? "");
    if (!pasted) return;
    const current = toDigits(input.value);
    commit(
      current.slice(0, input.selectionStart ?? 0) + pasted + current.slice(input.selectionEnd ?? 0),
    );
  };

  watchEffect(updateWidth, { flush: "post" });
  watch(
    () => props.modelValue,
    (val) => {
      if (parseRaw(displayValue.value) !== val) displayValue.value = val > 0 ? format(val) : "";
    },
  );

  return { inputRef, displayValue, inputWidthPx, parseRaw, onInput, onKeydown, onPaste, commit };
};
