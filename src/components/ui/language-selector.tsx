"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Language, getTranslations } from "@/lib/localization"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange 
}: LanguageSelectorProps) {
  const t = getTranslations(currentLanguage);
  
  // Language display names
  const languageNames: Record<Language, string> = {
    en: 'English',
    az: 'Azərbaycan',
    ru: 'Русский',
  }
  
  // Language flags (emoji)
  const languageFlags: Record<Language, string> = {
    en: '🇬🇧',
    az: '🇦🇿',
    ru: '🇷🇺',
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-white hover:bg-gray-50">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t.blog.selectLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-gray-200">        {(Object.keys(languageNames) as Language[]).map((lang) => (
          <DropdownMenuItem 
            key={lang} 
            onClick={() => onLanguageChange(lang)}
            className={`hover:bg-gray-100 cursor-pointer ${lang === currentLanguage ? "bg-gray-50" : ""}`}
          >
            <span className="mr-2">{languageFlags[lang]}</span>
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
