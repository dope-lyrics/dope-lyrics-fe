import { z } from "zod";
import { localizationMessages } from "@/i18n";

type Type = {
  username: string;
  password: string;
  rePassword: string;
  rememberMe: boolean | undefined;
};

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: localizationMessages.login.form.validation.username }),
    password: z
      .string()
      .min(3, { message: localizationMessages.login.form.validation.password }),
    rePassword: z
      .string()
      .min(3, { message: localizationMessages.login.form.validation.password }),
    rememberMe: z.boolean().optional(),
  })
  .refine(
    (data): data is Type => {
      return data.password === data.rePassword;
    },
    {
      message: localizationMessages.register.form.validation.dontMatch,
      path: ["rePassword"],
    }
  );

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export { RegisterSchema };
export type { RegisterSchemaType };
