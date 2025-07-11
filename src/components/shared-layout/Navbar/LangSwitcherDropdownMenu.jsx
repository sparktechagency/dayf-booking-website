"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";

// The following cookie name is important because it's Google-predefined for the translation engine purpose
const COOKIE_NAME = "googtrans";

export default function LangSwitcherDropdownMenu({
  values: supportedLanguages
}) {
  const [currentLanguage, setCurrentLanguage] = useState();
  const [languageConfig, setLanguageConfig] = useState();

  // When the component has initialized, we must activate the translation engine the following way.
  useEffect(() => {
    // 1. Read the cookie
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      // 2. If the cookie is defined, extract a language nickname from there.
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    // 3. If __GOOGLE_TRANSLATION_CONFIG__ is defined and we still not decided about languageValue, let's take a current language from the predefined defaultLanguage below.
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      // 4. Set the current language if we have a related decision.
      setCurrentLanguage(languageValue);
    }
    // 5. Set the language config.
    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  // Don't display anything if current language information is unavailable.
  if (!currentLanguage || !languageConfig) {
    return null;
  }

  const selectedLang = supportedLanguages?.find(
    (lang) => lang.name === currentLanguage
  );

  // The following function switches the current language
  const switchLanguage = (lang) => () => {
    console.log("hello");
    // We just need to set the related cookie and reload the page
    // "/auto/" prefix is Google's definition as far as a cookie name
    setCookie(null, COOKIE_NAME, "/auto/" + lang);
    window.location.reload();
  };

  console.log({ currentLanguage });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        size="lg"
        className={cn(
          "flex-center-between h-9 w-full gap-x-2 rounded-3xl border border-[#A5D3F1] px-2 lg:h-10 lg:rounded-full"
        )}
      >
        <Image
          src={selectedLang.icon}
          alt={selectedLang.label}
          height={250}
          width={250}
          className="aspect-square size-[20px] rounded-full object-cover lg:size-[25px]"
          priority={true}
        />

        <ChevronDown className="size-[16px] text-p1 lg:size-[22px]" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32 space-y-1 rounded-xl" align="start">
        {supportedLanguages?.map((lang) => (
          <DropdownMenuItem
            key={lang.name}
            onClick={() => {
              if (
                lang.name === selectedLang.name ||
                (currentLanguage === "auto" &&
                  languageConfig.defaultLanguage === lang.name)
              ) {
                return;
              }
              switchLanguage(lang.name)();
            }}
            className={cn(
              "cursor-pointer rounded-lg hover:!bg-light-sky-blue",
              lang.name === selectedLang.name ||
                (currentLanguage === "auto" &&
                  languageConfig.defaultLanguage === lang.name)
                ? "bg-light-sky-blue text-p1"
                : "bg-transparent"
            )}
          >
            <Image
              src={lang.icon}
              alt={lang.label}
              height={20}
              width={20}
              className="aspect-square rounded-full object-cover"
              priority={true}
            />

            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
