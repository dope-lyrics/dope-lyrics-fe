import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export { LoginSchema };
export type { LoginSchemaType };
