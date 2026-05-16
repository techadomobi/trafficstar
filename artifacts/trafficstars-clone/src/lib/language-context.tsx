import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type SiteLanguageCode = "EN" | "DE" | "ES" | "FR" | "RU" | "PT" | "ZH";

type LanguageContextValue = {
  activeLanguage: SiteLanguageCode;
  setLanguage: (code: SiteLanguageCode) => void;
};

const LANGUAGE_STORAGE_KEY = "trafficstars.activeLanguage";

const LANGUAGE_TO_GOOGLE: Record<SiteLanguageCode, string> = {
  EN: "en",
  DE: "de",
  ES: "es",
  FR: "fr",
  RU: "ru",
  PT: "pt",
  ZH: "zh-CN",
};

const INCLUDED_LANGUAGES = "en,de,es,fr,ru,pt,zh-CN";

const LanguageContext = createContext<LanguageContextValue | null>(null);

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string,
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function applyGoogleLanguage(languageCode: string) {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;

  if (!select) {
    return false;
  }

  if (select.value === languageCode) {
    select.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  select.value = languageCode;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function ensureGoogleTranslateLoaded(onReady: () => void) {
  if (window.google?.translate?.TranslateElement) {
    onReady();
    return;
  }

  window.googleTranslateElementInit = onReady;

  const existing = document.querySelector(
    'script[data-gt="translate-element"]',
  ) as HTMLScriptElement | null;

  if (existing) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.setAttribute("data-gt", "translate-element");
  document.body.appendChild(script);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [activeLanguage, setActiveLanguage] = useState<SiteLanguageCode>(() => {
    const fromStorage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SiteLanguageCode | null;
    if (fromStorage && fromStorage in LANGUAGE_TO_GOOGLE) {
      return fromStorage;
    }

    return "EN";
  });

  const applyLanguage = useCallback((code: SiteLanguageCode) => {
    const googleCode = LANGUAGE_TO_GOOGLE[code];

    document.documentElement.lang = googleCode;

    // Google widget can initialize slightly after app mount; retry a few times.
    let attempts = 0;
    const maxAttempts = 20;
    const timer = window.setInterval(() => {
      attempts += 1;
      const applied = applyGoogleLanguage(googleCode);

      if (applied || attempts >= maxAttempts) {
        window.clearInterval(timer);
      }
    }, 150);
  }, []);

  useEffect(() => {
    ensureGoogleTranslateLoaded(() => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      if (!document.getElementById("google_translate_element")?.childElementCount) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: INCLUDED_LANGUAGES,
          },
          "google_translate_element",
        );
      }

      applyLanguage(activeLanguage);
    });
  }, [activeLanguage, applyLanguage]);

  const setLanguage = useCallback(
    (code: SiteLanguageCode) => {
      setActiveLanguage(code);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
      applyLanguage(code);
    },
    [applyLanguage],
  );

  const value = useMemo(
    () => ({ activeLanguage, setLanguage }),
    [activeLanguage, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <div id="google_translate_element" style={{ display: "none" }} />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
