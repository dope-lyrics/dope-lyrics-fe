import { vi, beforeAll } from "vitest";
import { en } from "@/locales/en";
import { tr } from "@/locales/tr";

function getValueByPath(obj: Record<string, any>, path: string) {
  const keys = path.split(".");
  return keys.reduce((acc, key) => acc[key], obj);
}

beforeAll(() => {
  vi.mock("vue-router", () => {
    return {
      createRouter: vi.fn(() => {
        return {
          beforeEach: vi.fn(),
        };
      }),
      createWebHistory: vi.fn(),
      useRouter: vi.fn(() => {
        return {
          push: () => {},
        };
      }),
      RouterLink: vi.fn(),
    };
  });

  vi.mock("vue-i18n", (importOriginal) => {
    return {
      useI18n: () => {
        return {
          t: vi.fn((key: string) => {
            return getValueByPath(en, key);
          }),
        };
      },
      createI18n: vi.fn(() => {
        return {
          global: {
            messages: { value: { en, tr } },
            locale: "en",
          },
        };
      }),
    };
  });

  vi.mock("@/i18n", () => {
    return {
      i18n: {},
      localizationMessages: en,
    };
  });
});
