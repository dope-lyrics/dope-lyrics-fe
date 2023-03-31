import { z } from "zod";
import { localizationMessages } from "@/i18n";

type Type = {
  username: string;
  password: string;
  email: string;
  passwordConfirm: string;
  rememberMe: boolean | undefined;
};

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: localizationMessages.login.form.validation.username }),
    email: z
      .string()
      .min(1, { message: localizationMessages.common.validation.cantBeEmpty })
      .email({ message: localizationMessages.common.validation.notValid }),
    password: z
      .string()
      .min(3, { message: localizationMessages.login.form.validation.password }),
    passwordConfirm: z
      .string()
      .min(3, { message: localizationMessages.login.form.validation.password }),
    rememberMe: z.boolean().optional(),
  })
  .refine(
    (data): data is Type => {
      return data.password === data.passwordConfirm;
    },
    {
      message: localizationMessages.register.form.validation.dontMatch,
      path: ["passwordConfirm"],
    }
  );

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export { RegisterSchema };
export type { RegisterSchemaType };
