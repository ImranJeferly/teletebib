"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Language } from "@/lib/localization"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange 
}: LanguageSelectorProps) {
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
        <Button variant="outline" size="icon" className="relative">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(languageNames) as Language[]).map((lang) => (
          <DropdownMenuItem 
            key={lang} 
            onClick={() => onLanguageChange(lang)}
            className={lang === currentLanguage ? "bg-muted" : ""}
          >
            <span className="mr-2">{languageFlags[lang]}</span>
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
