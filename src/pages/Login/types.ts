import { z } from "zod";
import { localizationMessages } from "@/i18n";

const LoginSchema = z.object({
  username: z
    .string()
    .min(6, { message: localizationMessages.login.form.validation.username }),
  password: z
    .string()
    .min(3, { message: localizationMessages.login.form.validation.password }),
  rememberMe: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export { LoginSchema };
export type { LoginSchemaType };
