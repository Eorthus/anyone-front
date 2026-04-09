import type { Ref } from "vue";

export const toDigits = (s: string) => s.replace(/[^\d]/g, "");
export const parseRaw = (s: string) => parseInt(toDigits(s), 10) || 0;
export const format = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
export const onKeydown = (e: KeyboardEvent) => {
  const allowed = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
    "Home",
    "End",
    "Enter",
  ];
  if (!/^\d$/.test(e.key) && !allowed.includes(e.key) && !e.ctrlKey && !e.metaKey)
    e.preventDefault();
};
export const restoreCaret = (
  inputRef: Ref<HTMLInputElement | null>,
  displayValue: Ref<string>,
  cursorDigits: number,
) => {
  requestAnimationFrame(() => {
    if (!inputRef.value) return;
    let counted = 0;
    let pos = displayValue.value.length;
    for (let i = 0; i < displayValue.value.length; i++) {
      if (/\d/.test(displayValue.value[i] ?? "") && ++counted >= cursorDigits) {
        pos = i + 1;
        break;
      }
    }
    inputRef.value.setSelectionRange(pos, pos);
  });
};
