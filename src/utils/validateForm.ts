import { z } from "zod";
import { reactive, ref } from "vue";

type ValidateForm = {
  isFormValid: boolean;
  validationError?: null | {
    fieldErrors: { [key: string]: string[] };
  };
};

type ZodSchema = z.ZodObject<{}>;

type VFType<T> = {
  formData: T;
  schema: any;
  inputRefs?: T;
};

type ErrorsType<T> = {
  [Property in keyof T]: string[];
};

type VFReturnType<T> = {
  validateForm: () => ValidateForm;
  onFocus: (event: Event) => void;
  errors: ErrorsType<T>;
  inputRefs: T;
};

function VF<T extends object>({
  formData,
  schema,
}: VFType<T>): VFReturnType<T> {
  let obj: any = {};
  let inputRefs: any = {};

  Object.keys(formData).forEach((key) => {
    obj[key] = [];
    inputRefs[key] = ref();
  });

  const errors = reactive(obj);

  function hideErrorsInForm(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputName = input.name;

    // remove validation error message in form
    errors[inputName as keyof typeof errors] = [];

    // remove red border on input
    input.parentElement?.classList.remove("form-error");
  }

  return {
    validateForm: () => {
      const parsed = (schema as ZodSchema).safeParse(formData);

      if (parsed.success) {
        return {
          isFormValid: true,
          validationError: null,
        };
      }

      const flattenedErrors = parsed.error.flatten();
      const fieldErrors: { [key: string]: string[] } =
        flattenedErrors.fieldErrors;

      for (const [key, value] of Object.entries(fieldErrors)) {
        errors[key] = value;
        inputRefs[key].value?.classList.add("form-error");
      }

      return {
        isFormValid: false,
        validationError: {
          fieldErrors: flattenedErrors.fieldErrors,
        },
      };
    },
    onFocus: (event: Event) => {
      hideErrorsInForm(event);
    },
    errors,
    inputRefs,
  };
}

export { VF };
