import { z } from "zod";
import { Ref, reactive } from "vue";

type ValidateForm = {
  isFormValid: boolean;
  validationError?: null | {
    fieldErrors: { [key: string]: string[] };
    paths: string[];
  };
  onFocus?: (arg: Event) => void;
};

type ZodSchema = z.ZodObject<{}>;

type VF<T> = {
  formData: T;
  schema: ZodSchema;
  inputRefs: { [key: string]: Ref<HTMLDivElement | undefined> };
  reactiveErrors: any;
};

function VF<T>({ formData, schema, inputRefs, reactiveErrors }: VF<T>) {
  function hideErrorsInForm(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputName = input.name;

    // remove validation error message in form
    reactiveErrors[inputName as keyof typeof reactiveErrors] = "";

    // remove red border on input
    input.parentElement?.classList.remove("form-error");
  }

  return {
    validateForm: (): ValidateForm => {
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
          reactiveErrors[field] = Array.isArray(
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
  };
}

export { VF };
