export interface FormData {
  name: string;
  age: number;
  email: string;
}

export interface FormField {
  type: string;
  name: keyof FormData;
  placeholder: string;
}
