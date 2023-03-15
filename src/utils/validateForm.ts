import { z } from "zod";
import { reactive, ref } from "vue";

type ValidateForm = {
  isFormValid: boolean;
  validationError?: null | {
    fieldErrors: { [key: string]: string[] };
    paths: string[];
  };
};

type ZodSchema = z.ZodObject<{}>;

type VFType<T> = {
  formData: T;
  schema: ZodSchema;
  inputRefs?: T;
};

type VFReturnType<T> = {
  validateForm: () => ValidateForm;
  onFocus: (event: Event) => void;
  errors: T;
  inputRefs: T;
};

function VF<T extends object>({
  formData,
  schema,
}: VFType<T>): VFReturnType<T> {
  let obj: any = {};
  let inputRefs: any = {};

  Object.keys(formData).forEach((key) => {
    obj[key] = "";
    inputRefs[key] = ref();
  });

  const errors = reactive(obj);

  function hideErrorsInForm(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputName = input.name;

    // remove validation error message in form
    errors[inputName as keyof typeof errors] = "";

    // remove red border on input
    input.parentElement?.classList.remove("form-error");
  }

  return {
    validateForm: () => {
      const parsed = schema.safeParse(formData);

      if (parsed.success) {
        return {
          isFormValid: true,
          validationError: null,
        };
      }

      const requiredFields = Object.keys(schema.shape).filter((field) => {
        return !(
          schema.shape[field as keyof typeof schema.shape] as z.ZodType
        ).isOptional();
      });

      const flattenedErrors = parsed.error.flatten();
      const paths = Object.keys(flattenedErrors.fieldErrors);

      type FieldErrorType = keyof typeof flattenedErrors.fieldErrors;

      requiredFields.forEach((field: string) => {
        if (Object.hasOwn(flattenedErrors.fieldErrors, field)) {
          errors[field] = Array.isArray(
            flattenedErrors.fieldErrors[field as FieldErrorType]
          )
            ? flattenedErrors.fieldErrors[field as FieldErrorType][0]
            : flattenedErrors.fieldErrors[field as FieldErrorType];
        }
      });

      paths.forEach((path) => {
        inputRefs[path].value?.classList.add("form-error");
      });

      return {
        isFormValid: false,
        validationError: {
          fieldErrors: flattenedErrors.fieldErrors,
          paths,
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
