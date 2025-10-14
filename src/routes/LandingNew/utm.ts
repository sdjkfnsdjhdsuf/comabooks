// src/utils/utmWhatsApp.ts
export type CpKey =
  | "cp1"  | "cp2"  | "cp3"  | "cp4"  | "cp5"
  | "cp6"  | "cp7"  | "cp8"  | "cp9"  | "cp10"
  | "cp11" | "cp12" | "cp13" | "cp14" | "cp15"
  | "cp16" | "cp17" | "cp18" | "cp19" | "cp20"
  | "cp21";

const DEFAULT_MESSAGE =
  "Здравствуйте! Хотелось бы сделать заказ";

const cpMessageMap: Record<CpKey, string> = {
  cp1:  "Здравствуйте! Подскажите, пожалуйста, как заказать книгу?",
  cp2:  "Добрый день! Хотел бы узнать подробнее про вашу книгу",
  cp3:  "Привет! Интересует книга, расскажите, как всё работает?",
  cp4:  "Здравствуйте! Хочу подарить вашу книгу, подскажите детали",
  cp5:  "Добрый день! Расскажите, пожалуйста, что входит в книгу?",
  cp6:  "Приветствую! Можно уточнить, как проходит создание книги?",
  cp7:  "Здравствуйте! Хочу сделать заказ",
  cp8:  "Добрый день! Подскажите, как оформить книгу в подарок?",
  cp9:  "Здравствуйте! Хочу уточнить по поводу книги — сколько она стоит?",
  cp10: "Привет! Хочу узнать подробнее про книгу",
  cp11: "Добрый день! Подскажите, как заказать книгу?",
  cp12: "Здравствуйте! Интересует книга",
  cp13: "Приветствую! Хочу заказать книгу, расскажите, с чего начать?",
  cp14: "Здравствуйте! Можно заказать книгу?",
  cp15: "Добрый день! Хочу оформить заказ, расскажите, как всё проходит",
  cp16: "Здравствуйте! Хочу узнать подробнее",
  cp17: "Здравствуйте! Увидела ваши книги — расскажите подробнее",
  cp18: "Здравствуйте! Можете проконсультировать по книге",
  cp19: "Здравствуйте! Хочу сделать заказ. Можете проконсультировать?",
  cp20: "Здравствуйте! Я по поводу книги, можете проконсультировать?",
  cp21: "Здравствуйте! Интересуюсь книгой, подскажите пожалуйста подробности",
};

function getQueryParam(name: string, url?: string): string | null {
  try {
    const u = new URL(url ?? window.location.href);
    const v = u.searchParams.get(name);
    if (v) return v;

    // На всякий случай — ищем и в hash (#/?utm_source=...)
    if (u.hash) {
      const h = new URL(u.origin + u.hash.replace(/^#/, ""));
      return h.searchParams.get(name);
    }
    return null;
  } catch {
    return null;
  }
}

export function resolveCpKey(): CpKey | null {
  const raw = (getQueryParam("utm_source") || "").trim().toLowerCase();
  if (!raw) return null;
  const m = raw.match(/^cp(\d{1,2})$/i);
  if (!m) return null;
  const n = Number(m[1]);
  if (n < 1 || n > 21) return null;
  return (`cp${n}` as CpKey);
}

export function getWhatsappPrefillMessage(): string {
  const key = resolveCpKey();
  if (!key) return DEFAULT_MESSAGE;
  return cpMessageMap[key] || DEFAULT_MESSAGE;
}

export function buildWhatsappUrl(phoneE164: string): string {
  const text = getWhatsappPrefillMessage();
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${phoneE164}?text=${encoded}`;
}
