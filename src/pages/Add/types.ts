import { z } from "zod";
import { localizationMessages, i18n } from "@/i18n";

const AddSchema = z.object({
  singer: z
    .string()
    .min(1, { message: localizationMessages.common.validation.cantBeEmpty }),
  song: z
    .string()
    .min(1, { message: localizationMessages.common.validation.cantBeEmpty }),
  lyric: z
    .string()
    .min(20, { message: localizationMessages.add.form.validation.lyricMin })
    .max(144, { message: localizationMessages.add.form.validation.lyricMax }),
  language: z
    .string()
    .min(1, { message: localizationMessages.common.validation.cantBeEmpty }),
  mood: z
    .string()
    .min(1, { message: localizationMessages.common.validation.cantBeEmpty }),
});

type AddSchemaFormType = z.infer<typeof AddSchema>;

type AddPayloadType = {
  language?: string | undefined;
  singer: string;
  song: string;
  lyric: string[];
  mood: string;
};

export { AddSchema };
export type { AddSchemaFormType, AddPayloadType };
