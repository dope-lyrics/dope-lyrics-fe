import { z } from "zod";

const AddSchema = z.object({
  singer: z.string().min(1, { message: "Can not be empty" }),
  song: z.string().min(1, { message: "Can not be empty" }),
  lyric: z.string().min(20, { message: "Lyric must be at least 20 character" }),
  language: z.string().optional(),
  mood: z.string().min(1, { message: "Can not be empty" }),
});

type AddSchemaType = z.infer<typeof AddSchema>;

export { AddSchema };
export type { AddSchemaType };
