export type Props = {
  modelValue: number;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  id: string;
};

export type Emit = {
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
  (e: "focus"): void;
  (e: "blur", value: number): void;
};
