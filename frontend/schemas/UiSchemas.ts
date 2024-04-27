export interface MyInputsProps<T> {
   fieldName: keyof T;
   label: string;
   type?: string;
   valueAsNumber?: boolean;
   valueAsDate?: boolean;
   showLabel?: boolean;
   placeholder?: string;
   mb?: number;
   flex?: number;
   searchFn?: ((state: any) => void) | boolean;
}